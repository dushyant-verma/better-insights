import { NextRequest, NextResponse } from "next/server";

// Rate limiting in-memory store
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS) return false;
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, message: "Too many applications submitted. Please try again later." },
        { status: 429 }
      );
    }
    const formData = await req.formData();
    const honeypot = formData.get("bi_hp_career") as string;
    if (honeypot) {
      // Bot detected via honeypot
      return NextResponse.json({ success: true, message: "Application received." });
    }

    const name = (formData.get("applicant_name") as string || "").trim();
    const email = (formData.get("applicant_email") as string || "").trim();
    const phone = (formData.get("applicant_phone") as string || "").trim();
    const position = (formData.get("applicant_position") as string || "").trim();
    const department = (formData.get("applicant_department") as string || "").trim();
    const resume = formData.get("applicant_resume") as File | null;
    const linkedin = (formData.get("applicant_linkedin") as string || "").trim();
    const portfolio = (formData.get("applicant_portfolio") as string || "").trim();
    const coverLetter = (formData.get("applicant_cover_letter") as string || "").trim();
    const consent = formData.get("privacy_consent");

    if (!name || !email || !phone || !position || !consent) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields and accept the privacy consent." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { success: false, message: "Please upload your resume (PDF or Word document)." },
        { status: 400 }
      );
    }

    // Validate resume file size (max 10MB)
    if (resume.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Resume file exceeds maximum allowed size of 10MB." },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileName = resume.name.toLowerCase();
    const validExtensions = [".pdf", ".doc", ".docx"];
    const hasValidExt = validExtensions.some((ext) => fileName.endsWith(ext));
    if (!hasValidExt) {
      return NextResponse.json(
        { success: false, message: "Unsupported file type. Please upload a PDF, DOC, or DOCX document." },
        { status: 400 }
      );
    }

    const wpBase = (
      process.env.WORDPRESS_URL ||
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "http://localhost/betterinsights"
    ).replace(/\/$/, "");

    // Prepare multipart payload for WordPress AJAX careers handler
    const wpFormData = new FormData();
    wpFormData.append("action", "bi_submit_career_application");
    wpFormData.append("applicant_name", name);
    wpFormData.append("applicant_email", email);
    wpFormData.append("applicant_phone", phone);
    wpFormData.append("applicant_position", position);
    wpFormData.append("applicant_resume", resume);
    if (department) wpFormData.append("applicant_department", department);
    if (linkedin) wpFormData.append("applicant_linkedin", linkedin);
    if (portfolio) wpFormData.append("applicant_portfolio", portfolio);
    if (coverLetter) wpFormData.append("applicant_cover_letter", coverLetter);
    wpFormData.append("privacy_consent", "1");

    try {
      const wpRes = await fetch(`${wpBase}/wp-admin/admin-ajax.php`, {
        method: "POST",
        body: wpFormData,
      });
      const wpText = await wpRes.text();
      console.log("[Careers API] WP forward response:", wpText);
    } catch (wpErr) {
      console.warn("[Careers API] WP forward error:", wpErr);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our talent acquisition team will review your profile.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while processing your application. Please try again." },
      { status: 500 }
    );
  }
}
