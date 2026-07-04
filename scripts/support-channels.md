# MicroClaw — Support Channels Setup Guide

## 1. Telegram Support Group

### Group Info
- **Name:** MicroClaw Community
- **Username:** @MicroClawID
- **Type:** Public Group (join via invite link)
- **Language:** Bahasa Indonesia

### Setup Instructions

1. Open Telegram → New Group
2. Add bot @GroupGuardianBot for spam protection
3. Set group photo (use MicroClaw logo)
4. Pin pesan: "Selamat datang di MicroClaw Community! 🎉 Tanya jawab, feedback, dan diskusi seputar MicroClaw."
5. Kirim invite link ke user baru via email

### Moderation Rules
- No spam / self-promo
- Support via tag @admin
- Bug reports via dedicated format:
  ```
  [BUG] judul singkat
  Deskripsi...
  Email terdaftar: user@email.com
  ```

## 2. WhatsApp Support (Business Tier)

- **Number:** +62 812-3456-7890
- **Response Time:** Business tier: 12 jam

## 3. Email Support (All Tiers)

- **Email:** support@microclaw.com
- **Auto-reply template** — uncomment and add to email service:

```
Subject: Terima kasih sudah menghubungi MicroClaw Support!

Hai [Nama],

Terima kasih sudah menghubungi MicroClaw Support.

Kami akan merespon pertanyaan kamu dalam:

- Starter: 48 jam
- Pro: 24 jam
- Business: 12 jam

Sementara menunggu, cek dokumentasi kami:
📖 https://microclaw.com/docs/microclaw

Atau gabung komunitas Telegram:
💬 https://t.me/MicroClawID

Salam,
Tim MicroClaw
```

## 4. Auto-Reply Triggers (for support email)

Add these to your email service (e.g., SendGrid Inbound Parse, Mailgun Routes):

### Trigger: "lupa password" / "reset"
```
Hai [Nama],

Untuk reset password, buka:
https://microclaw.com/dashboard/microclaw?reset=1

Link berlaku 1 jam. Kalau ada masalah, balas email ini.
```

### Trigger: "cancel" / "berhenti" / "refund"
```
Hai [Nama],

Kami sedih melihat kamu pergi 😢

Untuk cancel subscription dan request refund:
1. Login ke dashboard: https://microclaw.com/dashboard/microclaw
2. Buka tab Subscription → Cancel Plan
3. Isi alasan (opsional)

Refund diproses dalam 3-5 hari kerja ke payment method asal.

Ada yang bisa kami bantu sebelum kamu cancel?
```

## 5. SLA Table

| Tier | Email | Telegram | WhatsApp |
|---|---|---|---|
| Starter | 48 jam | Community only | - |
| Pro | 24 jam | Priority @admin | - |
| Business | 12 jam | Priority @admin | 12 jam (coming soon) |

## 6. Escalation

- **Level 1:** Dedicated support person (email/Telegram)
- **Level 2:** Founder / Technical lead (for VPS issues, billing disputes)
- **Emergency (VPS down >1 jam):** WhatsApp + Telegram DM ke founder
