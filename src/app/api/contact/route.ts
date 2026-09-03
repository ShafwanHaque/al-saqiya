import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import nodemailer from "nodemailer";

const redis = Redis.fromEnv();

// Sliding Window: Allow 2 free submissions every 15 minutes before triggering Turnstile fallback
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "15 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/contact",
});

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
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";

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
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  // 1. Silent Honeypot Check (Silently drop bots)
  if (body.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { name, email, phone, subject, message, turnstileToken } = body;
  if (!name || !email || !phone || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // 2. Check Rate Limit
  const { success } = await ratelimit.limit(ip);

  // If rate limit failed, require a Turnstile Token as a fallback challenge
  if (!success) {
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
      replyTo: `"${name}" <${email}>`,
      to: "shafwanulhaquechowdhury@gmail.com",
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}