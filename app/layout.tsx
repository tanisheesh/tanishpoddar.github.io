import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = "https://tanishpoddar.com";
const siteName = "Tanish Poddar";
const siteDescription = "Full Stack Software Engineer specializing in production-grade backend systems, real-time applications, and AI-powered platforms. Experienced in Node.js, React, Next.js, Python, and cloud infrastructure.";
const siteKeywords = [
  "Tanish Poddar",
  "Full Stack Developer",
  "Software Engineer",
  "Backend Developer",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "Node.js Developer",
  "Python Developer",
  "AI Developer",
  "Machine Learning",
  "Web Development",
  "Software Development",
  "Portfolio",
  "SRMIST",
  "India",
  "Freelance Developer",
  "Internship",
  "AWS",
  "Cloud Computing",
  "REST API",
  "Real-time Systems",
  "Database Design",
  "System Architecture"
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Full Stack Software Engineer`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [
    { 
      name: siteName,
      url: siteUrl
    }
  ],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Full Stack Software Engineer`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Full Stack Software Engineer`,
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Full Stack Software Engineer`,
    description: siteDescription,
    images: [`${siteUrl}/images/og-image.png`],
    creator: "@tanisheesh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/images/favicon.ico",
      },
    ],
  },
  manifest: "/images/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tanish Poddar",
    "url": "https://tanishpoddar.com",
    "image": "https://tanishpoddar.com/images/profile.jpg",
    "sameAs": [
      "https://github.com/tanisheesh",
      "https://www.linkedin.com/in/tanisheesh/",
      "https://twitter.com/tanisheesh"
    ],
    "jobTitle": "Full Stack Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "SRM Institute of Science and Technology"
    },
    "knowsAbout": [
      "Full Stack Development",
      "Backend Development",
      "Frontend Development",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "AI/ML",
      "Cloud Computing",
      "System Design"
    ],
    "email": "tanishpoddar.18@gmail.com",
    "description": "Full Stack Software Engineer specializing in production-grade backend systems, real-time applications, and AI-powered platforms."
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-mono">
        <Providers>
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
