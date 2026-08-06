import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { chrome } from "@/data/navigation";
import { profile } from "@/data/profile";
import { seo, siteUrl } from "@/data/seo";

import "./globals.css";

/** Only the weights the design actually uses (SPEC §9). */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

/**
 * Every value here comes from `data/seo.ts` (SPEC §9). The OpenGraph and
 * Twitter images are contributed automatically by `opengraph-image.tsx`, so
 * they are not listed twice.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  applicationName: seo.siteName,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: seo.siteName,
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    site: seo.twitterHandle,
    creator: seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:inline-flex focus:h-11 focus:items-center focus:rounded-xl focus:border focus:border-strong focus:bg-overlay focus:px-4 focus:text-sm focus:text-primary"
        >
          {chrome.skipToContent}
        </a>

        <AmbientBackground />

        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          {/* Inside `MotionProvider` — it animates with `m.*`, which requires
              the LazyMotion context. */}
          <BackToTop />
        </MotionProvider>

        {/* Last in the body and outside `MotionProvider`: it animates in CSS,
            so it neither waits for the motion bundle nor paints under it. */}
        <Preloader />
      </body>
    </html>
  );
}
