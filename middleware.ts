import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    const newEntry = { count: 1, resetAt: now + WINDOW_MS };
    rateLimit.set(ip, newEntry);
    return { remaining: MAX_REQUESTS - 1, resetAt: newEntry.resetAt };
  }
  entry.count++;
  return { remaining: Math.max(0, MAX_REQUESTS - entry.count), resetAt: entry.resetAt };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");

  if (isApiRoute) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const info = getRateLimitInfo(ip);

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", String(info.remaining));
    response.headers.set("X-RateLimit-Reset", String(info.resetAt));

    if (info.remaining <= 0) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((info.resetAt - Date.now()) / 1000)),
        },
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
