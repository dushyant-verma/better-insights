import { NextRequest, NextResponse } from "next/server";

// Rate limiting in-memory store: IP -> { count: number, resetAt: number }
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 20;

function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanupRateLimits();
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

function sanitizeText(str: string, maxLength: number): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLength);
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponseData {
  reply: string;
  suggestions?: string[];
  action?: {
    type: "modal" | "link";
    label: string;
    target: string;
  };
}

// Knowledge base intents for Better Insights
function getLocalKnowledgeReply(message: string): ChatResponseData {
  const lower = message.toLowerCase();

  // Marketing Plan / Consultation
  if (lower.includes("plan") || lower.includes("marketing plan") || lower.includes("audit") || lower.includes("proposal")) {
    return {
      reply: "We create customized, data-driven marketing roadmaps tailored to your industry, budget, and growth targets. Our digital strategists deliver an actionable blueprint within 24 hours.",
      suggestions: ["Open Marketing Plan Form", "Website Development", "SEO & Paid Ads"],
      action: {
        type: "modal",
        label: "Get Marketing Plan",
        target: "bi:open-lead-modal",
      },
    };
  }

  // Website Development
  if (lower.includes("web") || lower.includes("website") || lower.includes("wordpress") || lower.includes("nextjs") || lower.includes("frontend")) {
    return {
      reply: "We engineer high-performance digital platforms using Next.js, Headless WordPress, and TypeScript with 90+ Core Web Vitals, enterprise security, and conversion-optimized UX.",
      suggestions: ["Explore Website Development", "Get Marketing Plan", "View Case Studies"],
      action: {
        type: "link",
        label: "View Website Development",
        target: "/services/website-development",
      },
    };
  }

  // SEO & Organic Search
  if (lower.includes("seo") || lower.includes("search") || lower.includes("google") || lower.includes("ranking") || lower.includes("organic")) {
    return {
      reply: "Our digital growth team specializes in technical SEO, Answer Engine Optimization (AEO/GEO for AI search like ChatGPT & Perplexity), high-intent keyword strategies, and authoritative content architecture.",
      suggestions: ["Explore Digital Growth", "View Case Studies", "Get Marketing Plan"],
      action: {
        type: "link",
        label: "Explore Digital Growth",
        target: "/services/digital-growth",
      },
    };
  }

  // Paid Ads / PPC / Performance Marketing
  if (lower.includes("paid") || lower.includes("ad") || lower.includes("ppc") || lower.includes("meta") || lower.includes("roas") || lower.includes("cpr")) {
    return {
      reply: "We build full-funnel performance marketing campaigns across Meta, Google Ads, and LinkedIn focused on ROAS and lowering Customer Acquisition Cost (CAC). You can also test our free CPR Calculator.",
      suggestions: ["Try CPR Tool", "Explore Digital Growth", "Request Consultation"],
      action: {
        type: "link",
        label: "Open CPR Calculator",
        target: "/cpr-tool",
      },
    };
  }

  // CRM & Integrations / Automation / AI
  if (lower.includes("crm") || lower.includes("automation") || lower.includes("ai") || lower.includes("hubspot") || lower.includes("zoho") || lower.includes("salesforce")) {
    return {
      reply: "We design and deploy automated CRM pipelines, AI customer workflows, and multi-platform integrations (HubSpot, Zoho, Salesforce, Pabbly) that align sales and marketing data.",
      suggestions: ["CRM & Integrations", "AI & Automation", "Get Marketing Plan"],
      action: {
        type: "link",
        label: "Explore CRM Integrations",
        target: "/services/crm-integrations",
      },
    };
  }

  // Portfolio / Work
  if (lower.includes("work") || lower.includes("portfolio") || lower.includes("case") || lower.includes("client") || lower.includes("examples")) {
    return {
      reply: "We partner with visionary enterprises across healthcare, technology, education, e-commerce, and professional services. Explore our case studies to see real metrics.",
      suggestions: ["View Our Work", "Our Clientele", "Get Marketing Plan"],
      action: {
        type: "link",
        label: "Explore Our Work",
        target: "/work",
      },
    };
  }

  // Contact / Phone / Office / Location
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("call") || lower.includes("office") || lower.includes("location") || lower.includes("pune")) {
    return {
      reply: "You can reach Better Insights at our Pune headquarters (Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa), call us at +91 950 999 6730, or email contact@betterinsights.in.",
      suggestions: ["Contact Us Page", "Chat on WhatsApp", "Get Marketing Plan"],
      action: {
        type: "link",
        label: "Go to Contact Page",
        target: "/contact",
      },
    };
  }

  // General default fallback
  return {
    reply: "Welcome to Better Insights! We are a digital marketing and consulting agency driving measurable ROI through website development, SEO, performance advertising, CRM integrations, and AI automation. What would you like to explore?",
    suggestions: [
      "Get Marketing Plan",
      "Website Development",
      "SEO & Paid Media",
      "CRM & AI Automation",
      "Explore Our Work",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawMessage = body.message;

    if (!rawMessage || typeof rawMessage !== "string" || !rawMessage.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const cleanMessage = sanitizeText(rawMessage, 1000);

    // If an external OpenAI or LLM key is configured in environment, it can be called securely here on the server.
    // Otherwise, we provide the intelligent Better Insights knowledge base response.
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const externalRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are the virtual assistant for Better Insights, a premier digital marketing, website development, SEO, and AI automation agency based in Pune, India. Phone: +91 950 999 6730. Email: contact@betterinsights.in. Provide helpful, concise, and professional responses about digital growth, marketing plans, web development, and CRM automation.",
              },
              { role: "user", content: cleanMessage },
            ],
            max_tokens: 350,
            temperature: 0.7,
          }),
        });

        if (externalRes.ok) {
          const extData = await externalRes.json();
          const replyText = extData.choices?.[0]?.message?.content?.trim();
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              suggestions: ["Get Marketing Plan", "Explore Services", "Contact Team"],
            });
          }
        }
      } catch {
        // Fall back to rule-based engine on network or external API error
      }
    }

    // Default intelligent local knowledge response
    const knowledgeResponse = getLocalKnowledgeReply(cleanMessage);
    return NextResponse.json(knowledgeResponse, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "Our team is standing by to help. You can request a custom marketing plan or reach us directly at contact@betterinsights.in or +91 950 999 6730.",
        suggestions: ["Get Marketing Plan", "Contact Us", "Explore Services"],
      },
      { status: 200 }
    );
  }
}
