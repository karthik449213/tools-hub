import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrustPlate from "@/components/TrustPlate";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Converter Tools Hub | Image, PDF & File Tools",
  description:
    "Free online converter tools to convert, compress, resize and optimize images, PDFs and files instantly. Fast, secure, and no signup required.",
  keywords: [
    "online converter",
    "image converter",
    "file converter",
    "image compressor",
    "pdf converter",
    "online tools",
  ],
  openGraph: {
    title: "Online Converter Tools Hub",
    description:
      "Convert, compress & optimize images, PDFs and files instantly with our free online tools hub.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Converter Tools Hub",
    description:
      "Fast, free & secure online converter tools for images, PDFs and files.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
