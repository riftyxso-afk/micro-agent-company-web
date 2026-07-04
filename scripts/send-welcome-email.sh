#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════
# MicroClaw — Send Welcome Email
# Sends the welcome email after VPS provisioning is complete.
#
# Usage:
#   MICROCLAW_FROM="noreply@microclaw.com" \
#   MICROCLAW_SMTP_SERVER="smtp.sendgrid.net" \
#   MICROCLAW_SMTP_PORT="587" \
#   MICROCLAW_SMTP_USER="apikey" \
#   MICROCLAW_SMTP_PASS="SG.xxxx" \
#   USER_EMAIL="user@example.com" \
#   USER_NAME="John Doe" \
#   TIER_NAME="Pro" \
#   TIER_PRICE="Rp 300.000" \
#   VPS_IP="203.0.113.10" \
#   GATEWAY_TOKEN="abc123..." \
#   DASHBOARD_URL="https://microclaw.com/dashboard/microclaw" \
#   DOCS_URL="https://microclaw.com/docs/microclaw" \
#   bash scripts/send-welcome-email.sh
# ═══════════════════════════════════════════════════════════════════

: "${MICROCLAW_FROM:=noreply@microclaw.com}"
: "${USER_EMAIL:?REQUIRED}"
: "${USER_NAME:?REQUIRED}"
: "${TIER_NAME:?REQUIRED}"
: "${TIER_PRICE:?REQUIRED}"
: "${VPS_IP:?REQUIRED}"
: "${GATEWAY_TOKEN:?REQUIRED}"
: "${DASHBOARD_URL:?REQUIRED}"
: "${DOCS_URL:?REQUIRED}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EMAIL_HTML=$(cat "$SCRIPT_DIR/emails/welcome.html")

# Replace placeholders
EMAIL_HTML="${EMAIL_HTML//\[\[VPS_IP\]\]/$VPS_IP}"
EMAIL_HTML="${EMAIL_HTML//\[\[GATEWAY_TOKEN\]\]/$GATEWAY_TOKEN}"
EMAIL_HTML="${EMAIL_HTML//\[\[TIER_NAME\]\]/$TIER_NAME}"
EMAIL_HTML="${EMAIL_HTML//\[\[TIER_PRICE\]\]/$TIER_PRICE}"
EMAIL_HTML="${EMAIL_HTML//\[\[DASHBOARD_URL\]\]/$DASHBOARD_URL}"
EMAIL_HTML="${EMAIL_HTML//\[\[DOCS_URL\]\]/$DOCS_URL}"
EMAIL_HTML="${EMAIL_HTML//\[\[PRIVACY_URL\]\]/https://microclaw.com/privacy}"
EMAIL_HTML="${EMAIL_HTML//\[\[TERMS_URL\]\]/https://microclaw.com/terms}"

EMAIL_SUBJECT="Selamat datang di MicroClaw — AI Assistant 24/7 kamu siap! 🎉"

# Use curl to send via SendGrid / Mailgun / SMTP API
# Replace with your email service provider
if [ -n "${MICROCLAW_SMTP_PASS:-}" ]; then
  # SendGrid example
  curl -s --request POST \
    --url "https://api.sendgrid.com/v3/mail/send" \
    --header "Authorization: Bearer $MICROCLAW_SMTP_PASS" \
    --header "Content-Type: application/json" \
    --data "$(jq -n \
      --arg from "$MICROCLAW_FROM" \
      --arg to "$USER_EMAIL" \
      --arg name "$USER_NAME" \
      --arg subject "$EMAIL_SUBJECT" \
      --arg html "$EMAIL_HTML" \
      '{
        personalizations: [{to: [{email: $to, name: $name}]}],
        from: {email: $from, name: "MicroClaw"},
        subject: $subject,
        content: [{type: "text/html", value: $html}]
      }')"
  echo ""
  echo "==> Welcome email sent to $USER_EMAIL"
else
  echo "==> [DRY RUN] Would send email to $USER_EMAIL"
  echo "    Subject: $EMAIL_SUBJECT"
  echo "    Set MICROCLAW_SMTP_PASS to send for real."
fi
