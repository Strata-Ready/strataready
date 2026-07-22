import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StrataReady — BC Strata Management Licensing Exam Prep",
    template: "%s | StrataReady",
  },
  description: "Practice for the BC Strata Management licensing exam with 420 scenario-based questions, instant results, and authoritative source citations. Know before you go.",
  keywords: [
    "BC strata management exam",
    "strata management licensing exam",
    "BC strata licensing",
    "strata management exam prep",
    "BCFSA strata exam",
    "strata property act exam",
    "UBC strata management course",
    "strata manager licensing BC",
    "strata management practice exam",
    "BC real estate licensing exam",
  ],
  authors: [{ name: "StrataReady" }],
  creator: "StrataReady",
  publisher: "StrataReady",
  metadataBase: new URL("https://strataready.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://strataready.ca",
    siteName: "StrataReady",
    title: "StrataReady — BC Strata Management Licensing Exam Prep",
    description: "Practice for the BC Strata Management licensing exam with 420 scenario-based questions, instant results, and authoritative source citations. Know before you go.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StrataReady — BC Strata Management Exam Prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StrataReady — BC Strata Management Licensing Exam Prep",
    description: "Practice for the BC Strata Management licensing exam with 420 scenario-based questions, instant results, and authoritative source citations.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "StrataReady",
  "url": "https://strataready.ca",
  "description": "BC Strata Management licensing exam preparation platform with scenario-based practice questions, instant results, and authoritative source citations.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": [
    {
      "@type": "Offer",
      "name": "Per Exam",
      "price": "9.99",
      "priceCurrency": "CAD",
      "description": "Single exam attempt with instant results and study references",
    },
    {
      "@type": "Offer",
      "name": "Full Prep Access",
      "price": "49.99",
      "priceCurrency": "CAD",
      "description": "Unlimited exam attempts with progress tracking",
    },
  ],
  "educationalUse": "Practice",
  "audience": {
    "@type": "Audience",
    "audienceType": "BC Strata Management licensing candidates",
  },
  "provider": {
    "@type": "Organization",
    "name": "StrataReady",
    "url": "https://strataready.ca",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
