import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { insertMessageSchema } from "@/shared/schema";
import { ZodError } from "zod";

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 5; // 5 requests
  const window = 60 * 60 * 1000; // per hour

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  try {
    const body = await req.json();
    const validatedData = insertMessageSchema.parse(body);

    // Send email
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("SMTP configuration incomplete. Skipping email.");
        return NextResponse.json(
          { message: "Your message was received, but email sending is not configured." },
          { status: 200 }
        );
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.verify();

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Portfolio Contact" <noreply@example.com>',
        to: "tanishpoddar.18@gmail.com",
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage: ${validatedData.message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(validatedData.subject)}</p>
            <h3>Message:</h3>
            <p>${escapeHtml(validatedData.message).replace(/\n/g, '<br>')}</p>
          </div>
        `,
      });

      return NextResponse.json(
        { message: "Your message has been sent successfully!" },
        { status: 200 }
      );
    } catch (emailError: unknown) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { message: "Your message was received, but could not be emailed." },
        { status: 200 }
      );
    }
  } catch (validationError) {
    if (validationError instanceof ZodError) {
      console.error("Form data validation failed:", validationError.errors);
      return NextResponse.json(
        { message: "Invalid form data", errors: validationError.errors },
        { status: 400 }
      );
    }

    console.error("Unexpected error processing contact form:", validationError);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
