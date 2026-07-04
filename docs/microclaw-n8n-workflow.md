# MicroClaw — n8n Backend Automation Plan

> Dokumentasi workflow n8n untuk backend MicroClaw: Payment, Provisioning, Monitoring & Notifikasi.
> Target: Ganti script bash dengan n8n visual workflow.

---

## Daftar Isi

1. [Architecture Overview](#1-architecture-overview)
2. [Workflow 1: Payment & Provisioning](#2-workflow-1-payment--provisioning)
3. [Workflow 2: VPS Health Monitoring](#3-workflow-2-vps-health-monitoring)
4. [Workflow 3: Payment Notifikasi Admin](#4-workflow-3-payment-notifikasi-admin)
5. [Node Configuration Reference](#5-node-configuration-reference)
6. [Deployment Guide](#6-deployment-guide)
7. [Environment Variables](#7-environment-variables)

---

## 1. Architecture Overview

### Current Architecture (bash)

```
Pakasir Webhook
    ↓
Next.js API Route (payment-webhook)
    ↓
exec() → provision-vps.sh (bash)
    ↓
DigitalOcean API → Create Droplet → Install OpenClaw
    ↓
send-welcome-email.sh (SendGrid)
```

**Masalah:**
- Error handling manual
- Tidak ada visual monitoring
- Susah di-debug
- State management di file system (`/tmp/.payment-store`)
- Scaling terbatas (Vercel serverless timeout 10 detik)

### Proposed Architecture (n8n)

```
Pakasir Webhook
    ↓
┌─────────────────────────────────────┐
│          n8n Workflow Engine         │
│                                     │
│  Workflow 1: Payment → Provisioning │
│  - Validasi payment                 │
│  - Create DO Droplet                │
│  - Wait until active                │
│  - Install OpenClaw via SSH         │
│  - Generate token                   │
│  - Send welcome email               │
│  - Update Supabase                  │
│                                     │
│  Workflow 2: VPS Health Check       │
│  - Cron every 5 menit               │
│  - Health check via HTTP            │
│  - Auto-restart jika down           │
│  - Notifikasi admin via Telegram    │
│                                     │
│  Workflow 3: Admin Notifikasi       │
│  - Trigger dari Workflow 1 & 2      │
│  - Kirim notifikasi Telegram        │
└─────────────────────────────────────┘
    ↓
Action (DO, SendGrid, Telegram, Supabase)
```

### Data Flow Diagram

```
┌──────────┐     Webhook POST      ┌─────────────────┐
│  Pakasir │ ────────────────────→ │  n8n Webhook     │
│  Payment │                       │  /webhook/payment│
└──────────┘                       └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  Validate Status │
                                   │  = "completed"?  │
                                   └────────┬────────┘
                                            │ YES
                                   ┌────────v────────┐
                                   │  Store to        │
                                   │  Supabase        │
                                   └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  Create DO       │
                                   │  Droplet         │
                                   └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  Wait Active     │
                                   │  (poll 10s)      │
                                   └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  SSH Install     │
                                   │  OpenClaw        │
                                   └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  Send Email      │
                                   │  (SendGrid)      │
                                   └────────┬────────┘
                                            │
                                   ┌────────v────────┐
                                   │  Notify Admin    │
                                   │  (Telegram)      │
                                   └────────┬────────┘
                                            │
                                       [ DONE ]
```

---

## 2. Workflow 1: Payment & Provisioning

### Trigger: Pakasir Webhook

n8n node: **Webhook**

```
Method: POST
Path: /webhook/microclaw-payment
Respond: Webhook Response (200 OK immediately)
Options:
  - Respond: "When Last Node Finishes"
  - Response Data Success: JSON { "received": true }
```

### Step 1: Validate Payment

n8n node: **IF**

```
Conditions:
  - {{ $json.body.status }} Equal to "completed"
  - {{ $json.body.project }} Equal to "microagent"

If FALSE → End workflow (respond 200 but ignore)
If TRUE → Continue
```

### Step 2: Store to Supabase

n8n node: **Supabase → Insert**

```
Table: payments
Data:
  order_id:   {{ $json.body.order_id }}
  amount:     {{ $json.body.amount }}
  status:     "completed"
  created_at: {{ Date.now() }}

Connection:
  Host: {{ $env.SUPABASE_URL }}
  Service Key: {{ $env.SUPABASE_SERVICE_KEY }}
```

### Step 3: Create DO Droplet

n8n node: **HTTP Request**

```
Method: POST
URL: https://api.digitalocean.com/v2/droplets
Authentication: Bearer Token
Token: {{ $env.DIGITALOCEAN_TOKEN }}

Body (JSON):
{
  "name": "microclaw-{{ $json.body.order_id | lower }}",
  "region": "sgp1",
  "size": "s-1vcpu-2gb",
  "image": "ubuntu-24-04-x64",
  "tags": ["microclaw", "provisioning"],
  "monitoring": true,
  "ipv6": true
}

Output:
  - droplet_id: {{ $json.droplet.id }}
  - (store for later nodes)
```

### Step 4: Wait for Droplet Active

n8n node: **Loop + Wait**

```
Loop Source: "While"
Loop Condition: {{ $execution.$node["Create DO Droplet"].json.droplet.status !== "active" }}
Max Iterations: 30

Inner nodes:
  1. Wait: 10 seconds
  2. HTTP Request: GET droplet status
     URL: https://api.digitalocean.com/v2/droplets/{{ droplet_id }}
     Auth: Bearer Token
```

### Step 5: Get Droplet IP

n8n node: **Set / HTTP Request**

```
HTTP Request: GET droplet details
URL: https://api.digitalocean.com/v2/droplets/{{ droplet_id }}

Extract IP:
  Expression: {{ $json.droplet.networks.v4.filter(n => n.type === "public")[0].ip_address }}

Output variables:
  - vps_ip: extracted IP
```

### Step 6: SSH Install OpenClaw

n8n node: **SSH Execute**

```
Host: {{ vps_ip }}
Username: root
Private Key: {{ $env.VPS_SSH_PRIVATE_KEY }}

Commands (multi-line):

set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ufw

# Firewall
ufw allow OpenSSH
ufw --force enable

# Install OpenClaw
curl -fsSL https://openclaw.sh | sh

mkdir -p ~/.openclaw

# Verify
export PATH="$HOME/.local/bin:$PATH"
command -v openclaw || npm install -g openclaw@latest

echo "INSTALL_OK"


### Step 7: Generate Token 2 Config

n8n node: **SSH Execute (config)**

```
Host: {{ vps_ip }}
Username: root
Private Key: {{ $env.VPS_SSH_PRIVATE_KEY }}

Commands:

export PATH="$HOME/.local/bin:$PATH"

GATEWAY_TOKEN=$(openssl rand -hex 32)

# Config OpenClaw
cat > ~/.openclaw/openclaw.json << 'EOF'
{
  "agent": {
    "model": "google/gemini-2.0-flash",
    "temperature": 0.7
  },
  "gateway": {
    "port": 3000,
    "bind": "127.0.0.1",
    "auth": { "token": "$GATEWAY_TOKEN" }
  },
  "workspace": { "path": "~/.openclaw/workspace" }
}
EOF

# AGENTS.md persona
mkdir -p ~/.openclaw/workspace
cat > ~/.openclaw/workspace/AGENTS.md << 'AGENT'
# MicroClaw Agent Persona
Kamu adalah asisten AI personal untuk pebisnis Indonesia.
Bantu: email, calendar, research, content, invoice.
Gunakan Bahasa Indonesia.
AGENT

# Systemd service
sudo tee /etc/systemd/system/microclaw-gateway.service > /dev/null << 'UNIT'
[Unit]
Description=MicroClaw OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=root
ExecStart=$(which openclaw) gateway --port 3000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable microclaw-gateway
sudo systemctl start microclaw-gateway

echo "GATEWAY_TOKEN=$GATEWAY_TOKEN"
echo "CONFIG_OK"


### Step 8: Extract Token Output

n8n node: **Code**

```javascript
// Extract gateway token from SSH output
const output = $input.first().json;
const lines = output.stdout.split('\n');
const tokenLine = lines.find(l => l.startsWith('GATEWAY_TOKEN='));
const gatewayToken = tokenLine ? tokenLine.split('=')[1] : '';

return {
  gateway_token: gatewayToken,
  vps_ip: $input.first().json.vps_ip
};
```

### Step 9: Send Welcome Email

n8n node: **Email (SendGrid) / HTTP Request**

```
Method: POST
URL: https://api.sendgrid.com/v3/mail/send

Headers:
  Authorization: Bearer {{ $env.SENDGRID_API_KEY }}
  Content-Type: application/json

Body (JSON):
{
  "personalizations": [{
    "to": [{ "email": "{{ $json.body.customer_email }}" }]
  }],
  "from": { "email": "noreply@microclaw.com", "name": "MicroClaw" },
  "subject": "Selamat datang di MicroClaw — AI Assistant 24/7 kamu siap! 🎉",
  "content": [{
    "type": "text/html",
    "value": "... (HTML template dengan placeholders)"
  }]
}
```

### Step 10: Notifikasi Admin

n8n node: **Telegram**

```
Chat ID: {{ $env.TELEGRAM_ADMIN_CHAT_ID }}
Text:

🎉 Pembayaran & Provisioning Berhasil!
─────────────────────────
User: {{ customer_name }}
Email: {{ customer_email }}
Paket: {{ plan }}
VPS IP: {{ vps_ip }}
Gateway Token: {{ gateway_token }}
```

---

## 3. Workflow 2: VPS Health Monitoring

### Trigger: Cron

n8n node: **Schedule Trigger**

```
Trigger Time: Every 5 minutes
```

### Step 1: Get All Active Droplets

n8n node: **HTTP Request**

```
Method: GET
URL: https://api.digitalocean.com/v2/droplets?tag_name=microclaw
Auth: Bearer Token ({{ $env.DIGITALOCEAN_TOKEN }})
```

### Step 2: Check Health per Droplet

n8n node: **SplitInBatches** (iterate)

### Step 3: Health Check HTTP

n8n node: **HTTP Request**

```
Method: GET
URL: http://{{ droplet.ip_address }}:3000/api/health
Timeout: 5000ms
Retry: 2 times
```

### Step 4: IF — Status != 200

n8n node: **IF**

```
Condition:
  {{ $json.statusCode }} !== 200
```

### Step 5: Auto-restart Service

n8n node: **SSH Execute**

```
Host: {{ droplet.ip_address }}
Command: sudo systemctl restart microclaw-gateway
```

### Step 6: Notify Admin

n8n node: **Telegram**

```
Chat ID: {{ $env.TELEGRAM_ADMIN_CHAT_ID }}
Text:

🚨 VPS ALERT: {{ droplet.name }}
─────────────────────────
IP: {{ droplet.ip_address }}
Status: {{ health_check_response }}
Action: Service auto-restarted
Time: {{ Date.now() | date('DD/MM HH:mm') }}
```

### Complete Monitoring Flow (Diagram):

```
[Cron: Every 5 min]
    ↓
[GET] All droplets → filter tag "microclaw"
    ↓
[Loop] For each droplet ──────────────────────────────┐
    ↓                                                   │
[GET] /api/health (timeout 5s)                         │
    ↓                                                   │
[IF] status == 200? ──YES──→ [CONTINUE] ───────────────→┤
    ↓ NO                                                │
[SSH] sudo systemctl restart microclaw-gateway          │
    ↓                                                   │
[Telegram] Alert admin                                  │
    ↓                                                   │
[CONTINUE] ─────────────────────────────────────────────┘
```

---

## 4. Workflow 3: Payment Notifikasi Admin

### Trigger: Berdiri sendiri atau dipanggil dari workflow lain

n8n node: **Webhook (manual trigger)**

Atau dijadwalkan: **Schedule Trigger** setiap jam.

### Step 1: Query Payment dari Supabase

n8n node: **Supabase → Select**

```
Table: payments
Filters:
  - status: "completed"
  - created_at: ">= today midnight"
```

### Step 2: Aggregate

n8n node: **Code**

```javascript
const payments = $input.all();
return {
  total_today: payments.length,
  total_revenue: payments.reduce((sum, p) => sum + p.amount, 0),
  payments: payments.map(p => ({
    email: p.email,
    plan: p.plan,
    amount: p.amount,
    time: new Date(p.created_at).toLocaleTimeString('id-ID')
  }))
};
```

### Step 3: Kirim Laporan ke Telegram

n8n node: **Telegram**

```
Chat ID: {{ $env.TELEGRAM_ADMIN_CHAT_ID }}
Text:

📊 Laporan Harian MicroClaw
─────────────────────────
Total Payment: {{ total_today }}
Revenue: Rp {{ total_revenue | numberFormat }}
─────────────────────────
{{#each payments}}
• {{ email }} — {{ plan }} — Rp {{ amount }}
{{/each}}
```

---

## 5. Node Configuration Reference

### n8n Nodes Digunakan

| Node | Fungsi | Konfigurasi Kunci |
|------|--------|--------------------|
| **Webhook** | Trigger dari Pakasir | POST, auto-respond 200, raw body |
| **IF** | Conditional branching | Multiple conditions, AND/OR logic |
| **HTTP Request** | DO API, SendGrid, health check | Bearer token auth, JSON body |
| **Wait** | Tunggu antar langkah | Fixed duration or until time |
| **Loop/Iterate** | Loop droplets | SplitInBatches, max iterations |
| **SSH Execute** | Install OpenClaw, restart | Private key auth, multi-line commands |
| **Set** | Extract/manage variables | JSON path expressions |
| **Code** | JavaScript transform | Complex data manipulation |
| **Supabase** | DB operations | Service role key, upsert |
| **Telegram** | Admin notifikasi | Bot token, chat ID |
| **Email** | Welcome email | SendGrid / SMTP |

### Error Handling Per Node

| Node | Error Strategy | Retry |
|------|---------------|-------|
| DO Create Droplet | Stop workflow | 0 (duplicate detection via name) |
| DO Wait Active | Continue (log) | 30 iterations per 10s |
| SSH Install | Stop workflow | 2 retries per 30s |
| Send Email | Continue (log) | 3 retries per 10s |
| Supabase Insert | Continue (log) | 2 retries per 5s |

---

## 6. Deployment Guide

### Opsi 1: n8n Cloud (termudah)

```
1. Daftar di https://app.n8n.cloud
2. Buat workflow baru
3. Import JSON workflow (disediakan terpisah)
4. Set environment variables di dashboard n8n
5. Aktifkan workflow
6. Copy webhook URL → set di Pakasir dashboard
```

### Opsi 2: Self-host Railway (recommended)

```
1. Deploy n8n ke Railway:
   - Template: n8n (search di Railway templates)
   - Atau: docker pull n8nio/n8n

2. Set env vars di Railway:
   - N8N_PORT=5678
   - N8N_PROTOCOL=https
   - N8N_HOST=n8n.yourdomain.com
   - DB_TYPE=postgresdb
   - DB_POSTGRESDB_URL=... (Railway PostgreSQL)

3. Set webhook → domain Railway
```

### Opsi 3: DigitalOcean Droplet

```
# Deploy n8n di VPS yang sama atau terpisah
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -e N8N_PROTOCOL=https \
  -e N8N_HOST=n8n.microclaw.com \
  n8nio/n8n
```

### Set Webhook di Pakasir

```
Di dashboard Pakasir → Edit Project → Webhook URL:
https://n8n-yourdomain.com/webhook/microclaw-payment

Ganti "n8n-yourdomain.com" dengan URL n8n kamu.
```

---

## 7. Environment Variables

### Diperlukan oleh n8n workflows:

| Variable | Required | Source | Digunakan di |
|----------|----------|--------|--------------|
| `DIGITALOCEAN_TOKEN` | ✅ | DigitalOcean | Workflow 1, 2 |
| `PAKASIR_PROJECT` | ✅ | Pakasir | Workflow 1 |
| `SENDGRID_API_KEY` | ✅ | SendGrid | Workflow 1 |
| `SUPABASE_URL` | ✅ | Supabase | Workflow 1, 3 |
| `SUPABASE_SERVICE_KEY` | ✅ | Supabase | Workflow 1, 3 |
| `VPS_SSH_PRIVATE_KEY` | ✅ | Generated | Workflow 1, 2 |
| `TELEGRAM_BOT_TOKEN` | ⬜ | @BotFather | Workflow 1, 2, 3 |
| `TELEGRAM_ADMIN_CHAT_ID` | ⬜ | Telegram | Workflow 1, 2, 3 |

### n8n system variables (self-host):

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_PORT` | 5678 | Port n8n web interface |
| `N8N_PROTOCOL` | http | https jika pakai domain |
| `N8N_HOST` | localhost | Domain n8n |
| `N8N_ENCRYPTION_KEY` | (auto) | Encryption key untuk credentials |
| `DB_TYPE` | sqlite | sqlite untuk dev, postgresdb untuk prod |
| `DB_POSTGRESDB_URL` | - | PostgreSQL connection string |

---

## Migration Plan: Current → n8n

### Phase 1: Parallel Run (hari 1-3)

```
Current (bash) → masih jalan
n8n → deploy + test dengan mock data

Tidak ada perubahan di Pakasir webhook.
Point webhook ke n8n untuk test.
```

### Phase 2: Switch Over (hari 4)

```
1. Matikan current payment-webhook route (comment out)
2. Point Pakasir webhook ke n8n production
3. Monitor 24 jam pertama
4. Jika gagal → rollback ke current (ganti webhook URL)
```

### Phase 3: Clean Up (hari 7)

```
1. Hapus file bash provision-vps.sh (tidak dipakai lagi)
2. Hapus send-welcome-email.sh
3. Hapus payment-store.ts (tidak perlu file system)
4. Hapus API route payment-webhook (code cleanup)
```

---

## Quick Start — Workflow JSON

Workflow JSON untuk import langsung ke n8n tersedia di file terpisah:

📄 `docs/n8n-workflow-payment.json`
📄 `docs/n8n-workflow-monitoring.json`
📄 `docs/n8n-workflow-report.json`

---

*Dibuat: Juli 2026 — The Micro Agent Company*

---

> **Cara export ke PDF:**
> 1. Buka file ini di browser (VS Code → Preview → Open in Browser)
> 2. Ctrl+P / Cmd+P → Save as PDF
> 3. Atau: `npx md-to-pdf docs/microclaw-n8n-workflow.md` (butuh npm global)
