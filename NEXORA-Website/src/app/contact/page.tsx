import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Start a project", description: "Tell NEXORA what you're working towards and let's plan a useful next step." };

export default function ContactPage() {
  return <>
    <section className="page-hero page-hero--cream page-hero--contact"><div className="shell page-hero-inner"><p className="eyebrow eyebrow--green">START A CONVERSATION</p><h1>Every good thing<br />starts with <em>a question.</em></h1><p>Tell us where you want to go. We'll help you work out what needs to happen next.</p><div className="page-hero-meta"><span>04 / CONTACT</span><span>NO PRESSURE. JUST A GOOD CONVERSATION.</span></div></div></section>
    <section className="contact-section section-pad"><div className="shell contact-grid"><div className="contact-aside"><p className="eyebrow eyebrow--green">LET'S GET TO KNOW THE IDEA</p><h2>A little context<br />goes a <em>long way.</em></h2><p>Share what you're trying to improve, build or make easier. You don't need a polished brief — we'll ask the right questions as we go.</p><div className="contact-points"><div><span>01</span><p><b>Tell us the goal.</b><small>What do you want to make possible?</small></p></div><div><span>02</span><p><b>We'll find the shape.</b><small>We'll review the context and clarify the need.</small></p></div><div><span>03</span><p><b>Agree the next step.</b><small>Scope, timing and expectations — clearly.</small></p></div></div><p className="contact-note">We only use your details to respond to this enquiry.</p></div><ContactForm /></div></section>
  </>;
}
