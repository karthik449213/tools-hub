import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrustPlate from "@/components/TrustPlate";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "Tools Herd - Free Online Converter Tools | Image, PDF & Video Conversion",
  description:
    "Tools Herd provides free online converter tools for images, PDFs, and videos. Compress, convert, merge, and organize files instantly in your browser. No signup, no limits, 100% secure.",
  keywords: [
    "tools herd",
    "free online tools",
    "image converter",
    "PDF converter",
    "video converter",
    "image compressor",
    "PDF compressor",
    "file converter",
    "online converter",
    "convert images",
    "compress PDF",
    "merge PDF",
    "convert video",
    "free conversion tools",
    "no signup tools",
    "client-side tools",
  ],
  authors: [{ name: "Tools Herd" }],
  creator: "Tools Herd",
  openGraph: {
    title: "Tools Herd - Free Online Converter & Compression Tools",
    description:
      "Convert, compress, merge, and organize images, PDFs, and videos instantly. 100% secure, browser-based, no signup required.",
    type: "website",
    locale: "en_US",
    url: "https://toolsherd.in",
    siteName: "Tools Herd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools Herd - Free Online Converter Tools",
    description:
      "Fast, free, and secure online tools for converting, compressing, and organizing images, PDFs, and videos.",
    creator: "@toolsherd",
  },
  alternates: {
    canonical: "https://toolsherd.in",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": "-1",
    "max-video-preview": "-1",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Tools Herd",
              "url": "https://toolsherd.in",
              "description": "Free online converter tools for images, PDFs, and videos",
              "logo": "https://toolsherd.in/logo.png",
              "sameAs": [
                "https://twitter.com/toolsherd",
                "https://linkedin.com/company/toolsherd",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <TrustPlate/>
        <Footer />
      </body>
    </html>
  );
}
