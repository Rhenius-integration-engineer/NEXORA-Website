"use client";

import { type FormEvent, useState } from "react";

const services = ["Website & digital experience", "Digital marketing & growth", "AI & business automation", "A combination of services", "Not sure yet"];
const budgets = ["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "₹60,000 – ₹1,00,000", "₹1,00,000+", "Need guidance"];
const timelines = ["As soon as possible", "Within 2–4 weeks", "Within 1–3 months", "Still exploring"];

type FormState = { name: string; email: string; phone: string; company: string; service: string; budget: string; timeline: string; message: string; consent: boolean; website: string };
const initialState: FormState = { name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "", consent: false, website: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function canContinue() {
    if (step === 0) return Boolean(form.service);
    if (step === 1) return Boolean(form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email));
    return Boolean(form.message.trim());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, company: form.company,
          service_interest: form.service, budget_range: form.budget, timeline: form.timeline,
          message: form.message, consent_to_contact: form.consent, website: form.website,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "We couldn't send your enquiry. Please try again.");
      setResult({ kind: "success", message: "Your enquiry is with us. We'll review the details and get back to you soon." });
      setForm(initialState);
      setStep(0);
    } catch (error) {
      setResult({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-card">
      {result?.kind === "success" ? (
        <div className="form-success" role="status"><span className="success-icon">✓</span><p className="eyebrow">ENQUIRY RECEIVED</p><h3>Thank you for starting a conversation.</h3><p>{result.message}</p><button className="text-link" onClick={() => setResult(null)} type="button">Send another enquiry ↗</button></div>
      ) : (
        <form onSubmit={submit}>
          <div className="form-progress"><div className="form-progress-line"><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div><span>STEP {step + 1} OF 3</span></div>
          {step === 0 && <div className="form-step"><p className="eyebrow">THE PROJECT</p><h3>What would you like to build?</h3><p className="form-hint">Choose the area that best describes what you need. We can shape the details together.</p><div className="choice-grid">{services.map((service) => <button key={service} className={`choice ${form.service === service ? "choice--selected" : ""}`} type="button" onClick={() => update("service", service)}>{service}<span>{form.service === service ? "✓" : "+"}</span></button>)}</div><div className="field-row"><label className="field"><span>Indicative budget</span><select value={form.budget} onChange={(e) => update("budget", e.target.value)}><option value="">Select a range</option>{budgets.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field"><span>Ideal timeline</span><select value={form.timeline} onChange={(e) => update("timeline", e.target.value)}><option value="">Select a timeline</option>{timelines.map((item) => <option key={item}>{item}</option>)}</select></label></div></div>}
          {step === 1 && <div className="form-step"><p className="eyebrow">THE PEOPLE</p><h3>Who should we speak with?</h3><p className="form-hint">A few details so we can respond with the right context.</p><div className="field-grid"><label className="field"><span>Your name *</span><input required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" /></label><label className="field"><span>Email address *</span><input required type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" /></label><label className="field"><span>Phone / WhatsApp</span><input autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" /></label><label className="field"><span>Business / company</span><input autoComplete="organization" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Optional" /></label></div></div>}
          {step === 2 && <div className="form-step"><p className="eyebrow">THE OPPORTUNITY</p><h3>Tell us a little more.</h3><p className="form-hint">What are you trying to improve, solve or make possible?</p><label className="field"><span>Project brief *</span><textarea required rows={6} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="A few sentences are plenty to get the conversation started…" /></label><label className="consent"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I agree that NEXORA may contact me about this enquiry.</span></label><label className="honeypot" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>}
          {result?.kind === "error" && <p className="form-error" role="alert">{result.message}</p>}
          <div className="form-actions">{step > 0 ? <button type="button" className="button button--quiet" onClick={() => setStep(step - 1)}>← Back</button> : <span className="form-privacy">Your details stay private.</span>}{step < 2 ? <button type="button" className="button button--dark" disabled={!canContinue()} onClick={() => setStep(step + 1)}>Continue <span>→</span></button> : <button className="button button--dark" type="submit" disabled={busy || !form.consent || !form.message.trim()}>{busy ? "Sending…" : "Send enquiry ↗"}</button>}</div>
        </form>
      )}
    </div>
  );
}
