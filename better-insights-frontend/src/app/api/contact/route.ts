import { NextRequest, NextResponse } from "next/server";

// Rate limiting in-memory store: IP -> { count: number, resetAt: number }
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
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

export function resetRateLimits() {
  rateLimitMap.clear();
}

function sanitizeText(str: string, maxLength: number): string {
  if (!str || typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  // 1. Rate Limiting Check
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a minute before submitting again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  // 2. Safe JSON Parsing
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, message: "Invalid request payload format." },
      { status: 400 }
    );
  }

  const { name, email, phone, company, services, budget, message, tab, honeypot, bi_hp_contact } = body;

  // 3. Honeypot Anti-Spam Detection
  // If either honeypot field contains any value, silently accept to avoid informing bots
  if (honeypot || bi_hp_contact) {
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We have received your inquiry.",
    });
  }

  // 4. Required Fields Validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { success: false, message: "Please provide your full name." },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return NextResponse.json(
      { success: false, message: "Please provide your business email address." },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json(
      { success: false, message: "Please describe your project or enquiry." },
      { status: 400 }
    );
  }

  // Length constraints
  if (name.trim().length < 2) {
    return NextResponse.json(
      { success: false, message: "Name must be at least 2 characters long." },
      { status: 400 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { success: false, message: "Message must be at least 10 characters long." },
      { status: 400 }
    );
  }

  // 5. Email Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid business email address." },
      { status: 400 }
    );
  }

  // 6. Data Sanitization
  const cleanName = sanitizeText(name, 100);
  const cleanEmail = sanitizeText(email, 120);
  const cleanPhone = sanitizeText(phone, 30);
  const cleanCompany = sanitizeText(company, 100);
  const cleanServices = sanitizeText(services, 100);
  const cleanBudget = sanitizeText(budget, 100);
  const cleanMessage = sanitizeText(message, 5000);
  const cleanTab = sanitizeText(tab || "project", 50);

  // 7. Backend forwarding (WordPress AJAX lead/enquiry handler)
  // Skip external network forward if in test or mock environment
  const isMock =
    process.env.NODE_ENV === "test" ||
    process.env.MOCK_WP === "true" ||
    req.headers.get("x-mock-test") === "true";
  if (!isMock) {
    const wpBase = (
      process.env.WORDPRESS_URL ||
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "http://localhost/betterinsights"
    ).replace(/\/$/, "");

    const formParams = new URLSearchParams();
    formParams.append("action", "bi_submit_enquiry");
    formParams.append("bi_contact_name", cleanName);
    formParams.append("bi_contact_email", cleanEmail);
    if (cleanPhone) formParams.append("bi_contact_phone", cleanPhone);
    if (cleanCompany) formParams.append("bi_contact_company", cleanCompany);
    if (cleanServices) formParams.append("bi_contact_services", cleanServices);
    if (cleanBudget) formParams.append("bi_contact_budget", cleanBudget);
    if (cleanMessage) formParams.append("bi_contact_message", cleanMessage);
    if (cleanTab) formParams.append("bi_contact_tab", cleanTab);

    try {
      await fetch(`${wpBase}/wp-admin/admin-ajax.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formParams.toString(),
      });
    } catch (wpErr) {
      console.warn("[Contact API] WP forward warning:", wpErr);
    }
  }

  return NextResponse.json({
    success: true,
    message: "Thank you for reaching out! We have received your inquiry and will be in touch shortly.",
  });
}
