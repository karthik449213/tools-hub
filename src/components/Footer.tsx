import Link from "next/link";
import { tools } from '@/app/tools';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* About Section */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            About Online Tools Hub
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Online Tools Hub is a collection of powerful, client-side tools for image processing and PDF manipulation.
            All processing happens directly in your browser, ensuring your files remain private and secure.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3 text-center text-gray-900 dark:text-gray-100">
            Available Tools
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <Link href="/tools/image-compressor" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <strong className="text-gray-900 dark:text-gray-100">Image Compressor</strong><br />
              
            </Link>
            <Link href="/tools/image-converter" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <strong className="text-gray-900 dark:text-gray-100">Image Converter</strong><br />
            
            </Link>
            <Link href="/tools/pdf-merger" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          <strong className="text-gray-900 dark:text-gray-100">PDF Merger</strong><br />
            
            </Link>
            <Link href="/tools/video-converter" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <strong className="text-gray-900 dark:text-gray-100">Media Converter</strong><br />
           
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3 text-center text-gray-900 dark:text-gray-100">
            Why Choose Online Tools Hub?
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 text-center space-y-2 max-w-2xl mx-auto">
            <li>100% client-side processing - your files never leave your device</li>
            <li>Fast and efficient - process files instantly in your browser</li>
            <li>Free to use - no hidden costs or subscriptions required</li>
            <li>Secure and private - no data collection or tracking</li>
          </ul>
        </div>

        {/* Footer Ad Space */}
        <div className="mb-6 text-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-gray-500">Ad Space - Footer (responsive banner)</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Left Section */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Online Tools Hub. All rights reserved.
          </p>

          {/* Middle Section (Optional links) */}
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-500 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Section (Socials or GitHub) */}
          <div className="flex gap-4">
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.388 7.86 10.905.574.106.785-.25.785-.554 0-.273-.01-1.003-.016-1.97-3.197.694-3.872-1.542-3.872-1.542-.522-1.327-1.276-1.68-1.276-1.68-1.043-.714.08-.7.08-.7 1.153.08 1.76 1.18 1.76 1.18 1.026 1.758 2.69 1.25 3.347.957.104-.74.403-1.25.732-1.54-2.552-.29-5.236-1.276-5.236-5.68 0-1.256.452-2.283 1.193-3.09-.12-.29-.517-1.457.112-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.984.005 1.978.133 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.583.232 2.75.114 3.04.743.807 1.193 1.834 1.193 3.09 0 4.414-2.69 5.386-5.254 5.67.416.36.788 1.07.788 2.16 0 1.56-.014 2.82-.014 3.206 0 .308.208.667.792.553A10.997 10.997 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

  );
}

