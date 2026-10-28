import { NextRequest, NextResponse } from "next/server";

// Rate limiting in-memory store: IP -> { count: number, resetAt: number }
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanupRateLimits();
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

function sanitizeText(str: string, maxLength: number): string {
  if (!str || typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions from your connection. Please wait a few moments before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": "600" },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request format." },
        { status: 400 }
      );
    }

    const { name, email, phone, website, message, honeypot, bi_hp_field, bi_hp_lead } = body;

    // Honeypot spam detection
    if (honeypot || bi_hp_field || bi_hp_lead) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your request has been received.",
      });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a contact phone number." },
        { status: 400 }
      );
    }

    const cleanName = sanitizeText(name, 100);
    const cleanEmail = sanitizeText(email, 120);
    const cleanPhone = sanitizeText(phone, 30);
    const cleanWebsite = sanitizeText(website || "", 200);
    const cleanMessage = sanitizeText(message || "", 2000);

    const wpBase = (
      process.env.WORDPRESS_URL ||
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "http://localhost/betterinsights"
    ).replace(/\/$/, "");

    // Forward to WordPress backend AJAX lead handler
    const formParams = new URLSearchParams();
    formParams.append("action", "bi_submit_footer_lead");
    formParams.append("bi_lead_name", cleanName);
    formParams.append("bi_lead_email", cleanEmail);
    formParams.append("bi_lead_phone", cleanPhone);
    if (cleanWebsite) formParams.append("bi_lead_website", cleanWebsite);
    if (cleanMessage) formParams.append("bi_lead_message", cleanMessage);

    try {
      await fetch(`${wpBase}/wp-admin/admin-ajax.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formParams.toString(),
      });
    } catch {
      // Intentionally swallowed so internal network topology isn't leaked
    }

    return NextResponse.json({
      success: true,
      message: "Marketing plan request received! Our strategy leads will review your brand and be in touch shortly.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
