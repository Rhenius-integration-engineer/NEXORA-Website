import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Selected work", description: "Explore the kinds of digital, marketing and automation challenges NEXORA is built to solve." };

const areas = [
  { n: "01", category: "DIGITAL EXPERIENCE", title: "A clearer first impression", desc: "Structure, design and build a website that helps people understand the offer and take the next step.", tags: ["Web design", "Development", "Conversion"] },
  { n: "02", category: "GROWTH SYSTEMS", title: "A more consistent presence", desc: "Connect positioning, content and campaigns into a manageable rhythm that supports the business.", tags: ["Positioning", "Content", "Campaigns"] },
  { n: "03", category: "INTELLIGENT OPERATIONS", title: "A smoother way to work", desc: "Map repetitive tasks and connect tools so information moves with less manual effort.", tags: ["AI workflows", "Automation", "Integration"] },
];

export default function WorkPage() {
  return <>
    <section className="page-hero page-hero--green"><div className="shell page-hero-inner"><p className="eyebrow eyebrow--gold">THE WORK IN PRACTICE</p><h1>Make the everyday<br /><em>work better.</em></h1><p>We focus on useful outcomes across digital experiences, growth systems and business operations.</p><div className="page-hero-meta"><span>03 / CAPABILITIES</span><span>THOUGHTFUL WORK. MEANINGFUL PROGRESS.</span></div></div></section>
    <section className="work-list section-pad"><div className="shell"><div className="work-intro"><p className="eyebrow eyebrow--green">HOW WE CREATE VALUE</p><h2>Start with a challenge.<br /><em>Finish with a better system.</em></h2><p>The areas below illustrate the work NEXORA is designed to deliver. They are capability descriptions, not claimed client projects or published case studies.</p></div><div className="work-area-grid">{areas.map((area) => <article className="work-area" key={area.n}><div className="work-area-visual"><span>{area.n} / NEXORA</span><div className={`visual-shape visual-shape--${area.n}`}>{area.n === "01" ? <div className="visual-window"><i/><i/><i/><b/><b/><em/></div> : area.n === "02" ? <div className="visual-ring"><b>GROW</b><i>✳</i></div> : <div className="visual-stack"><i>INPUT</i><b>↘</b><i>PROCESS</i><b>↘</b><i>OUTCOME</i></div>}</div></div><div className="work-area-copy"><p className="eyebrow eyebrow--green">{area.category}</p><h3>{area.title}</h3><p>{area.desc}</p><div className="tag-row">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div><div className="work-note">CLIENT CASE STUDIES WILL BE ADDED AFTER COMPLETED PROJECTS HAVE BEEN APPROVED FOR PUBLICATION.</div></div></section>
    <section className="simple-cta"><div className="shell simple-cta-inner"><div><p className="eyebrow eyebrow--gold">YOUR CHALLENGE COULD BE NEXT</p><h2>Let's make progress<br /><em>measurable.</em></h2></div><Link href="/contact" className="button button--gold">Tell us what you need ↗</Link></div></section>
  </>;
}
