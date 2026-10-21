import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/config/contact";

const MAX_REQUEST_BYTES = 12_000;

async function readLimitedBody(request: Request): Promise<string | null> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return null;
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

function getRateLimiter() {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(2, "15 m"),
    analytics: true,
    prefix: "@upstash/ratelimit/contact",
  });
}

// Helper function to verify Turnstile Token against Cloudflare's siteverify API
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      }
    );
    const outcome = await res.json();
    return outcome.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "127.0.0.1";

  // Parse payload
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    turnstileToken?: string;
    website?: string; // Honeypot field
  };

  try {
    const rawBody = await readLimitedBody(req);
    if (rawBody === null) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
    body = parsed as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  // 1. Silent Honeypot Check (Silently drop bots)
  if (body.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { name, email, phone, subject, message, turnstileToken } = body;
  if ([name, email, phone, subject, message].some((value) => typeof value !== "string" || !value.trim())) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const cleanName = name!.trim().replace(/[\r\n\u0000-\u001f\u007f]/g, " ");
  const cleanEmail = email!.trim();
  const cleanPhone = phone!.trim();
  const cleanSubject = subject!.trim();
  const cleanMessage = message!.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      !["Umrah Package", "Hajj Package", "General Enquiry"].includes(cleanSubject) ||
      cleanName.length > 120 || cleanPhone.length > 40 || cleanMessage.length > 5000) {
    return NextResponse.json({ error: "Please check the submitted information" }, { status: 400 });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json({ error: "Contact form is temporarily unavailable" }, { status: 503 });
  }

  // 2. Check Rate Limit
  let rateLimitPassed: boolean;
  try {
    const { success } = await getRateLimiter().limit(ip);
    rateLimitPassed = success;
  } catch (error) {
    console.error("Contact rate limit error:", error);
    return NextResponse.json({ error: "Contact form is temporarily unavailable" }, { status: 503 });
  }

  // If rate limit failed, require a Turnstile Token as a fallback challenge
  if (!rateLimitPassed) {
    if (!process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      return NextResponse.json({ error: "Contact form verification is not configured" }, { status: 503 });
    }
    if (!turnstileToken) {
      return NextResponse.json(
        {
          error: "High activity detected. Please complete captcha verification.",
          requireCaptcha: true,
        },
        { status: 429 }
      );
    }

    // Verify token submitted by user
    const isValidToken = await verifyTurnstileToken(turnstileToken, ip);
    if (!isValidToken) {
      return NextResponse.json(
        {
          error: "Captcha validation failed. Please try again.",
          requireCaptcha: true,
        },
        { status: 400 }
      );
    }
  }

  // 3. Send Email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL || CONTACT_EMAIL,
      subject: `[Contact Form] ${cleanSubject}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
