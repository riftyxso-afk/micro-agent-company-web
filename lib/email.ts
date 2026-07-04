import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export interface WelcomeEmailData {
  email: string;
  name: string;
  tierName: string;
  tierPrice: string;
  vpsIp: string;
  gatewayToken: string;
  dashboardUrl: string;
  docsUrl: string;
}

const smtpConfig = {
  host: process.env.MICROCLAW_SMTP_SERVER || "smtp.sendgrid.net",
  port: parseInt(process.env.MICROCLAW_SMTP_PORT || "587", 10),
  user: process.env.MICROCLAW_SMTP_USER || "apikey",
  pass: process.env.MICROCLAW_SMTP_PASS || "",
  from: process.env.MICROCLAW_FROM || "noreply@microclaw.com",
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.port === 465,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });
  }
  return transporter;
}

function loadWelcomeTemplate(data: WelcomeEmailData): string {
  const templatePath = path.join(process.cwd(), "scripts", "emails", "welcome.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const replacements: Record<string, string> = {
    "[[VPS_IP]]": data.vpsIp,
    "[[GATEWAY_TOKEN]]": data.gatewayToken,
    "[[TIER_NAME]]": data.tierName,
    "[[TIER_PRICE]]": data.tierPrice,
    "[[DASHBOARD_URL]]": data.dashboardUrl,
    "[[DOCS_URL]]": data.docsUrl,
    "[[PRIVACY_URL]]": "https://microclaw.com/privacy",
    "[[TERMS_URL]]": "https://microclaw.com/terms",
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.replaceAll(key, value);
  }

  return html;
}

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
  const smtpPass = smtpConfig.pass;
  if (!smtpPass) {
    console.log("[EMAIL] DRY RUN — would send welcome email to:", data.email);
    console.log("[EMAIL]   name:", data.name);
    console.log("[EMAIL]   tier:", data.tierName, data.tierPrice);
    console.log("[EMAIL]   vps:", data.vpsIp);
    console.log("[EMAIL]   Set MICROCLAW_SMTP_PASS to send for real.");
    return;
  }

  const html = loadWelcomeTemplate(data);
  const transporter = getTransporter();

  const subject = `Selamat datang di MicroClaw — AI Assistant 24/7 kamu siap! 🎉`;

  await transporter.sendMail({
    from: `"MicroClaw" <${smtpConfig.from}>`,
    to: `"${data.name}" <${data.email}>`,
    subject,
    html,
  });

  console.log("[EMAIL] Welcome email sent to", data.email);
}
