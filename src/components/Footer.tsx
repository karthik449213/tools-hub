import Link from "next/link";
import { tools } from '@/app/tools';
import TopBannerAd from "./TopBannerAd";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 mt-10">
  <div className="max-w-6xl mx-auto px-4 py-8">

    {/* About */}
    <div id="about" className="mb-6 text-center">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        About Tools Herd
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3">
        Tools Herd is your trusted destination for free online conversion and compression tools. We provide fast, secure, client-side tools for processing images, PDFs, and videos.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        All processing happens in your browser — nothing is uploaded to our servers. Your privacy and security are our top priorities.
      </p>
    </div>

    {/* Tools */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-center text-gray-900 dark:text-gray-100">
        Our Tools
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.path} className="text-sm hover:text-blue-500 transition-colors text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">{tool.name}</strong>
          </Link>
        ))}
      </div>
    </div>

    {/* Benefits */}
    <div className="mb-6 text-center">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Why Choose Tools Herd?
      </h3>
      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 max-w-2xl mx-auto">
        <li>100% client-side processing</li>
        <li>Fast and efficient</li>
        <li>Free to use</li>
        <li>Secure and private</li>
      </ul>
    </div>

    {/* Footer Ad */}
    <div className="mb-6 text-center">
      <TopBannerAd />
    </div>

    {/* Bottom Row */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
        © {new Date().getFullYear()} <strong>Tools Herd</strong>. All rights reserved. | Free Online Conversion Tools
      </p>

      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
        <Link href="/terms" className="hover:text-blue-500 transition-colors">Terms</Link>
        <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
      </div>

      <div className="flex gap-4">
       
        
      </div>
    </div>

  </div>
</footer>


  );
}

