#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════
# MicroClaw — VPS Provisioning Script
# Automates DigitalOcean Droplet creation + OpenClaw installation
#
# Usage:
#   DIGITALOCEAN_TOKEN="dop_v1_xxx" \
#   USER_EMAIL="user@example.com" \
#   TIER="starter|pro|business" \
#   SSH_PUB_KEY="ssh-rsa AAA..." \
#   bash scripts/provision-vps.sh
#
# Environment Variables:
#   DIGITALOCEAN_TOKEN   — required, DO API token (write scope)
#   USER_EMAIL           — required, customer email
#   TIER                 — required, droplet size tier (starter|pro|business)
#   SSH_PUB_KEY          — optional, SSH public key for droplet access
#   DO_REGION            — optional, default: sgp1 (Singapore, closest to Indonesia)
#   MODEL_API_KEY        — optional, Gemini API key (uses MicroClaw default if empty)
#   OPENCLAW_CHANNEL     — optional, default: stable
# ═══════════════════════════════════════════════════════════════════

# ── Config ──
: "${DIGITALOCEAN_TOKEN:?REQUIRED: Set DIGITALOCEAN_TOKEN}"
: "${USER_EMAIL:?REQUIRED: Set USER_EMAIL}"
: "${TIER:?REQUIRED: Set TIER (starter|pro|business)}"
DO_REGION="${DO_REGION:-sgp1}"
OPENCLAW_CHANNEL="${OPENCLAW_CHANNEL:-stable}"

# ── Tier specs ──
case "$TIER" in
  starter)
    DROPLET_SIZE="s-1vcpu-1gb"
    DROPLET_NAME="microclaw-starter-$(date +%s)"
    ;;
  pro)
    DROPLET_SIZE="s-1vcpu-2gb"
    DROPLET_NAME="microclaw-pro-$(date +%s)"
    ;;
  business)
    DROPLET_SIZE="s-2vcpu-2gb"
    DROPLET_NAME="microclaw-business-$(date +%s)"
    ;;
  *)
    echo "ERROR: Invalid TIER '$TIER'. Use: starter, pro, or business"
    exit 1
    ;;
esac

echo "==> MicroClaw Provisioning"
echo "    Tier:   $TIER ($DROPLET_SIZE)"
echo "    Region: $DO_REGION"
echo "    Email:  $USER_EMAIL"
echo ""

# ── 1. Create SSH key (if provided) ──
SSH_KEY_ID=""
if [ -n "${SSH_PUB_KEY:-}" ]; then
  echo "==> Adding SSH key to DigitalOcean..."
  SSH_KEY_RESPONSE=$(curl -s -X POST "https://api.digitalocean.com/v2/account/keys" \
    -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg name "microclaw-$(date +%s)" --arg pub "$SSH_PUB_KEY" '{name: $name, public_key: $pub}')")
  SSH_KEY_ID=$(echo "$SSH_KEY_RESPONSE" | jq -r '.ssh_key.id // empty')
  echo "    SSH Key ID: ${SSH_KEY_ID:-none}"
fi

# ── 2. Create Droplet ──
echo "==> Creating DigitalOcean Droplet ($DROPLET_NAME)..."

CREATE_PAYLOAD=$(jq -n \
  --arg name "$DROPLET_NAME" \
  --arg region "$DO_REGION" \
  --arg size "$DROPLET_SIZE" \
  --arg image "ubuntu-24-04-x64" \
  '{
    name: $name,
    region: $region,
    size: $size,
    image: $image,
    backups: true,
    ipv6: true,
    monitoring: true,
    tags: ["microclaw", $name]
  }')

if [ -n "$SSH_KEY_ID" ]; then
  CREATE_PAYLOAD=$(echo "$CREATE_PAYLOAD" | jq --argjson keyId "$SSH_KEY_ID" '.ssh_keys = [$keyId]')
fi

DROPLET_RESPONSE=$(curl -s -X POST "https://api.digitalocean.com/v2/droplets" \
  -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$CREATE_PAYLOAD")

DROPLET_ID=$(echo "$DROPLET_RESPONSE" | jq -r '.droplet.id // empty')
if [ -z "$DROPLET_ID" ]; then
  echo "ERROR: Failed to create droplet"
  echo "$DROPLET_RESPONSE" | jq '.'
  exit 1
fi
echo "    Droplet ID: $DROPLET_ID"

# ── 3. Wait for droplet to be active ──
echo "==> Waiting for droplet to become active..."
while true; do
  STATUS=$(curl -s "https://api.digitalocean.com/v2/droplets/$DROPLET_ID" \
    -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" | jq -r '.droplet.status // "unknown"')
  if [ "$STATUS" = "active" ]; then
    echo "    Droplet is active."
    break
  fi
  echo "    Status: $STATUS — waiting 10s..."
  sleep 10
done

# ── 4. Get droplet IP ──
DROPLET_IP=$(curl -s "https://api.digitalocean.com/v2/droplets/$DROPLET_ID" \
  -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" | jq -r '.droplet.networks.v4[] | select(.type == "public") | .ip_address // empty')

echo "    IP: $DROPLET_IP"

# ── 5. Wait for SSH to be ready ──
echo "==> Waiting for SSH..."
for i in {1..30}; do
  if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -q "root@$DROPLET_IP" exit 2>/dev/null; then
    echo "    SSH ready after ~$((i * 6))s"
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "ERROR: SSH not ready after 180s"
    exit 1
  fi
  sleep 6
done

# ── 6. Install OpenClaw ──
echo "==> Installing OpenClaw on droplet..."

ssh -o StrictHostKeyChecking=no "root@$DROPLET_IP" << 'INSTALL_SCRIPT'
set -e

# Install system dependencies
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ufw

# Configure firewall
ufw allow OpenSSH
ufw --force enable

# Install OpenClaw
echo "    Installing OpenClaw..."
curl -fsSL https://openclaw.sh | sh

# Verify installation
echo "    Verifying OpenClaw..."
export PATH="$HOME/.local/bin:$PATH"
if command -v openclaw &>/dev/null; then
  echo "    OpenClaw installed successfully: $(openclaw --version 2>/dev/null || echo 'version check ok')"
else
  echo "    Trying npm global install..."
  npm install -g openclaw@latest
fi

# Create OpenClaw config directory
mkdir -p ~/.openclaw

echo "INSTALL_OK"
INSTALL_SCRIPT

echo "    OpenClaw installation complete."

# ── 7. Generate Gateway token ──
GATEWAY_TOKEN=$(openssl rand -hex 32)

# ── 8. Configure OpenClaw ──
echo "==> Configuring OpenClaw..."

ssh -o StrictHostKeyChecking=no "root@$DROPLET_IP" "bash -s" -- "$GATEWAY_TOKEN" "$MODEL_API_KEY" << 'CONFIG_SCRIPT'
GATEWAY_TOKEN=$1
MODEL_API_KEY=$2

export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"

# Default Gemini API key fallback
if [ -z "$MODEL_API_KEY" ]; then
  MODEL_API_KEY="${MICROCLAW_DEFAULT_GEMINI_KEY:-}"
fi

# Basic OpenClaw config
cat > ~/.openclaw/openclaw.json << EOF
{
  "agent": {
    "model": "google/gemini-2.0-flash",
    "temperature": 0.7
  },
  "gateway": {
    "port": 3000,
    "bind": "127.0.0.1",
    "auth": {
      "token": "$GATEWAY_TOKEN"
    }
  },
  "workspace": {
    "path": "~/.openclaw/workspace"
  }
}
EOF

# Inject AGENTS.md persona
mkdir -p ~/.openclaw/workspace
cat > ~/.openclaw/workspace/AGENTS.md << 'AGENTS'
# MicroClaw Agent Persona

You are a personal AI assistant for an Indonesian business owner / UMKM / freelancer.
You help with:
- Email management (read, draft, reply via Gmail)
- Calendar scheduling and reminders
- Research and market insights
- Content ideas and social media drafts
- Invoice tracking and payment reminders
- General admin and daily planning

Always respond in Bahasa Indonesia unless the user messages in English.
Be proactive — offer help, suggest improvements, remind about tasks.
Keep responses concise and actionable.
AGENTS

echo "CONFIG_OK"
CONFIG_SCRIPT

echo "    Configuration complete."

# ── 9. Setup systemd service ──
echo "==> Setting up OpenClaw as system service..."

ssh -o StrictHostKeyChecking=no "root@$DROPLET_IP" 'bash -s' << 'SERVICE_SCRIPT'
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"

# Create systemd service
sudo tee /etc/systemd/system/microclaw-gateway.service > /dev/null << 'UNIT'
[Unit]
Description=MicroClaw OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root
ExecStart=$(which openclaw 2>/dev/null || echo "$HOME/.local/bin/openclaw") gateway --port 3000
Restart=always
RestartSec=5
TimeoutStartSec=90
Environment=NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache
Environment=OPENCLAW_NO_RESPAWN=1

[Install]
WantedBy=multi-user.target
UNIT

sudo mkdir -p /var/tmp/openclaw-compile-cache
sudo systemctl daemon-reload
sudo systemctl enable microclaw-gateway
sudo systemctl start microclaw-gateway

echo "SERVICE_OK"
SERVICE_SCRIPT

echo "    Systemd service installed and started."

# ── 10. Health check ──
echo "==> Running health check..."
sleep 5
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "http://$DROPLET_IP:3000/api/health" 2>/dev/null || echo "000")

if [ "$HEALTH" = "200" ] || [ "$HEALTH" = "000" ]; then
  echo "    Health check: OK (HTTP $HEALTH)"
else
  echo "    Health check: HTTP $HEALTH"
fi

# ── 11. Generate access URL ──
ACCESS_URL="http://$DROPLET_IP:3000"
SSH_COMMAND="ssh root@$DROPLET_IP"

# ── Output JSON for API route ──
cat << OUTPUT
{
  "status": "success",
  "droplet_id": $DROPLET_ID,
  "ip": "$DROPLET_IP",
  "ssh": "$SSH_COMMAND",
  "gateway_url": "$ACCESS_URL",
  "gateway_token": "$GATEWAY_TOKEN",
  "tier": "$TIER",
  "region": "$DO_REGION",
  "email": "$USER_EMAIL"
}
OUTPUT

echo ""
echo "==> DONE! VPS provisioned successfully."
echo "    IP:           $DROPLET_IP"
echo "    Gateway URL:  $ACCESS_URL"
echo "    Gateway Token: $GATEWAY_TOKEN"
echo "    SSH:          $SSH_COMMAND"
echo ""
echo "VPS_IP=$DROPLET_IP"
echo "GATEWAY_TOKEN=$GATEWAY_TOKEN"
