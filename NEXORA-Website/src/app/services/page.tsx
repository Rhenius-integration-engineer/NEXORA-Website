import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services", description: "Technology, digital growth and intelligent automation services from NEXORA." };

const services = [
  { id: "technology", n: "01", name: "Technology & website development", intro: "Build a digital home that earns attention, communicates clearly and makes the next step obvious.", items: ["Business and service websites", "Landing pages and campaign experiences", "Website refreshes and optimisation", "Conversion-focused forms and journeys", "Integrations and lightweight web applications"], outcome: "A digital presence that looks considered, feels effortless and supports the way your business works." },
  { id: "growth", n: "02", name: "Digital marketing & growth", intro: "Bring the right people closer to your business with a strategy that connects message, channel and action.", items: ["Digital growth strategy and positioning", "Content planning and creative direction", "Social media management", "Search visibility and on-page SEO", "Campaign planning and performance reviews"], outcome: "A more consistent brand presence, clearer communication and a better path from discovery to enquiry." },
  { id: "automation", n: "03", name: "AI & business automation", intro: "Give repetitive work a better system, and give your people more time for the work that needs them.", items: ["Workflow discovery and automation", "AI-assisted business processes", "Lead capture and follow-up workflows", "App and data integrations", "Internal tools and process improvement"], outcome: "Less manual effort, fewer disconnected steps and more reliable day-to-day operations." },
];

export default function ServicesPage() {
  return <>
    <section className="page-hero page-hero--green"><div className="shell page-hero-inner"><p className="eyebrow eyebrow--gold">WHAT WE DO</p><h1>Good work starts<br />with the <em>right work.</em></h1><p>Choose a starting point. We'll help connect the pieces into a solution that fits your business, your stage and your goals.</p><div className="page-hero-meta"><span>01 / SERVICES</span><span>STRATEGY × EXECUTION × OUTCOMES</span></div></div></section>
    <section className="service-list-section section-pad"><div className="shell">{services.map((service) => <article className="service-detail" id={service.id} key={service.id}><div className="service-detail-head"><span className="service-number">{service.n}</span><div><p className="eyebrow eyebrow--green">SERVICE PILLAR {service.n}</p><h2>{service.name}</h2><p className="service-intro">{service.intro}</p></div></div><div className="service-detail-body"><div><span className="small-label">HOW WE CAN HELP</span><ul className="check-list">{service.items.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul></div><div className="service-outcome"><span className="small-label">THE INTENDED OUTCOME</span><p>{service.outcome}</p><Link href="/contact" className="text-link">Discuss this service ↗</Link></div></div></article>)}</div></section>
    <section className="simple-cta"><div className="shell simple-cta-inner"><div><p className="eyebrow eyebrow--gold">NOT SURE WHERE TO START?</p><h2>Let's make the<br /><em>first step clear.</em></h2></div><Link href="/contact" className="button button--gold">Talk through your idea ↗</Link></div></section>
  </>;
}
