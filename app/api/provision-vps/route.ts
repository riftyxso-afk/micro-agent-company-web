import { NextRequest, NextResponse } from "next/server";

interface ProvisionRequest {
  email: string;
  name: string;
  tier: "starter" | "pro" | "business";
}

// In production, use a proper queue system (e.g., Upstash QStash, RabbitMQ)
// For beta, we use a simple sync spawn approach with timeout

export async function POST(request: NextRequest) {
  try {
    const body: ProvisionRequest = await request.json();

    if (!body.email || !body.name || !body.tier) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, tier" },
        { status: 400 }
      );
    }

    if (!["starter", "pro", "business"].includes(body.tier)) {
      return NextResponse.json(
        { error: "Invalid tier. Must be: starter, pro, or business" },
        { status: 400 }
      );
    }

    const doToken = process.env.DIGITALOCEAN_TOKEN;
    if (!doToken) {
      return NextResponse.json(
        { error: "Server misconfigured: missing DIGITALOCEAN_TOKEN" },
        { status: 500 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY || "";
    const sshPubKey = process.env.MICROCLAW_SSH_PUB_KEY || "";

    // Spawn provisioning process
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);

    const scriptPath = process.cwd() + "/scripts/provision-vps.sh";

    // IMPORTANT: In production, use a proper job queue instead of execSync
    // This is a beta-only approach
    execAsync(
      `bash "${scriptPath}"`,
      {
        env: {
          ...process.env,
          DIGITALOCEAN_TOKEN: doToken,
          USER_EMAIL: body.email,
          TIER: body.tier,
          SSH_PUB_KEY: sshPubKey,
          MODEL_API_KEY: geminiKey,
        },
        timeout: 5 * 60 * 1000, // 5 minute timeout
      }
    )
      .then(({ stdout, stderr }) => {
        console.log(`[PROVISION] Success for ${body.email}:`, stdout);
        if (stderr) console.error(`[PROVISION] Stderr:`, stderr);
      })
      .catch((err) => {
        console.error(`[PROVISION] Failed for ${body.email}:`, err.message);
      });

    return NextResponse.json({
      message: "Provisioning started",
      email: body.email,
      tier: body.tier,
      status: "processing",
      note: "You will receive an email with credentials within 5-10 minutes.",
    });
  } catch (error) {
    console.error("[PROVISION] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
