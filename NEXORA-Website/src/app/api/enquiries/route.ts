import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // A quiet honeypot catches basic automated submissions without inconveniencing people.
    if (text(body?.website, 120)) return NextResponse.json({ ok: true });

    const name = text(body?.name, 120);
    const email = text(body?.email, 254).toLowerCase();
    const phone = text(body?.phone, 40);
    const company = text(body?.company, 160);
    const service = text(body?.service_interest, 120);
    const budget = text(body?.budget_range, 80);
    const timeline = text(body?.timeline, 80);
    const message = text(body?.message, 5000);
    const consent = body?.consent_to_contact === true;

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !service || !message || !consent) {
      return NextResponse.json({ error: "Please complete the required fields and consent to being contacted." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("project_enquiries")
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        service_interest: service,
        budget_range: budget || null,
        timeline: timeline || null,
        message,
        consent_to_contact: consent,
      });

    if (error) {
      console.error("Supabase enquiry insert failed:", error.message);
      return NextResponse.json({ error: "We couldn't save your enquiry just now. Please try again shortly." }, { status: 503 });
    }

    // Optional notification. The enquiry remains safely stored even if email delivery is unavailable.
    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.NOTIFICATION_EMAIL;
    if (resendKey && from && to) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: [to],
            subject: `New NEXORA enquiry — ${name}`,
            text: [
              `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not supplied"}`,
              `Company: ${company || "Not supplied"}`, `Service: ${service}`,
              `Budget: ${budget || "Not supplied"}`, `Timeline: ${timeline || "Not supplied"}`,
              "", "Project brief:", message,
            ].join("\n"),
          }),
        });
      } catch (mailError) {
        console.error("NEXORA enquiry notification could not be sent:", mailError);
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("NEXORA enquiry route error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
