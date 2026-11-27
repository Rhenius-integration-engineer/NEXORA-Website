import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export const metadata: Metadata = { title: "About", description: "Meet NEXORA: a business solutions and growth partner built around clarity, useful technology and thoughtful execution." };

const values = [
  { n: "01", title: "Understand first", text: "We start with the business, the people and the problem — not a predetermined tool or trend." },
  { n: "02", title: "Keep it useful", text: "The best solution is the one your team can actually use, maintain and build on." },
  { n: "03", title: "Stay accountable", text: "Clear scope, honest communication and progress you can understand at every step." },
];

export default function AboutPage() {
  return <>
    <section className="page-hero page-hero--cream"><div className="shell page-hero-inner"><p className="eyebrow eyebrow--green">A LITTLE ABOUT US</p><h1>Built for people<br />building <em>what's next.</em></h1><p>NEXORA brings business thinking, digital craft and practical automation into one connected partnership.</p><div className="page-hero-meta"><span>02 / ABOUT</span><span>INDEPENDENT · INTENTIONAL · PRACTICAL</span></div></div></section>
    <section className="about-story section-pad"><div className="shell about-story-grid"><div className="about-symbol"><BrandMark compact /><span>BUILD. AUTOMATE. GROW.</span><i>✳</i></div><div><p className="eyebrow eyebrow--green">WHY NEXORA EXISTS</p><h2>Businesses don't need<br />more complexity.<br /><em>They need connection.</em></h2><p>Websites, marketing, customer conversations and internal processes are often treated as separate jobs. But customers experience one business — and teams have to make all those pieces work together.</p><p>NEXORA exists to close that gap. We help businesses make clearer decisions, choose the right digital tools and turn good ideas into useful systems.</p><p>Our approach is deliberately human: listen closely, explain clearly and make progress visible.</p></div></div></section>
    <section className="values-section section-pad"><div className="shell"><div className="section-heading section-heading--light"><div><p className="eyebrow eyebrow--gold">WHAT GUIDES THE WORK</p><h2>Principles over<br /><em>promises.</em></h2></div><p className="section-aside">We don't believe in inflated claims or one-size-fits-all solutions. We believe in doing thoughtful work, with care.</p></div><div className="values-grid">{values.map((value) => <article className="value-card" key={value.n}><span>{value.n}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>
    <section className="about-founder section-pad"><div className="shell founder-grid"><div><p className="eyebrow eyebrow--green">FOUNDER-LED PARTNERSHIP</p><h2>One clear point<br />of <em>accountability.</em></h2></div><div><p>NEXORA is founder-led, which means conversations stay close to the work and decisions stay connected to the outcome. You work with a partner who wants to understand the context, not just deliver a checklist.</p><p>As the work grows, the right specialists and collaborators can join around the need — without losing the clarity of the relationship.</p><Link href="/contact" className="text-link">Start a conversation ↗</Link></div></div></section>
  </>;
}
