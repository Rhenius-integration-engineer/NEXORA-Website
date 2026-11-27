import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="NEXORA home"><BrandMark light /></Link>
            <p className="footer-promise">Clear thinking. Useful technology.<br />Growth built to last.</p>
          </div>
          <div className="footer-links">
            <div><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/work">Selected work</Link><Link href="/about">About NEXORA</Link><Link href="/privacy">Privacy notice</Link></div>
            <div><span className="footer-label">Get in touch</span><Link href="/contact">Start a project</Link><a href="#top">Back to top ↑</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© {year} NEXORA. All rights reserved.</span><span>Build. Automate. Grow.</span><Link href="/admin" className="footer-admin">Team access</Link></div>
      </div>
    </footer>
  );
}
