import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: { default: "NEXORA — Business Solutions & Growth", template: "%s | NEXORA" },
  description: "NEXORA helps ambitious businesses build better digital experiences, grow with clarity and automate the work that slows them down.",
  applicationName: "NEXORA",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "NEXORA — Business Solutions & Growth", description: "Build. Automate. Grow.", type: "website" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0B5D46", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
