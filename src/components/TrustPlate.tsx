'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TrustPlate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex-shrink-0 text-center">
              <img src="/file.svg" alt="File Icon" className="w-12 h-12 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">+200 Formats Supported</h3>
              <p className="text-gray-600 dark:text-gray-300">
                CloudConvert is your universal app for file conversions. We support nearly all audio, video,
                document, ebook, archive, image, spreadsheet, and presentation formats. Plus, you can use our online
                tool without downloading any software.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex-shrink-0 text-center">
              <img src="/globe.svg" alt="Globe Icon" className="w-12 h-12 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                CloudConvert is ISO 27001 certified and has been trusted by our users and customers since its founding in 2012. No one except you
                will ever have access to your files. We earn money by selling access to our API, not by selling your
                data. Read more about that in our
              </p>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex-shrink-0 text-center">
              <img src="/next.svg" alt="Next Icon" className="w-12 h-12 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">High-Quality Conversions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Besides using open source software under the hood, we’ve partnered with various software vendors to
                provide the best possible results. Most conversion types can be adjusted to your needs such as setting
                the quality and many other options.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex-shrink-0 text-center">
              <img src="/window.svg" alt="Window Icon" className="w-12 h-12 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Powerful API</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our API allows custom integrations with your app. You pay only for what you actually use, and there are
                huge discounts for high-volume customers. We provide a lot of handy features such as full Amazon S3
                integration. Check out the.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer-like Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Online Tools Hub. All rights reserved.
            </p>
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
      </div>
    </motion.div>
  );
}
