'use client';

import { motion } from 'framer-motion';

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
              <i className="fa fa-copy text-4xl text-blue-500"></i>
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
              <i className="fa fa-shield-check text-4xl text-green-500"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                CloudConvert is ISO 27001 certified and has been trusted by our users and customers since its founding in 2012. No one except you
                will ever have access to your files. We earn money by selling access to our API, not by selling your
                data. Read more about that in our <a href="https://cloudconvert.com/security" className="text-blue-500 hover:underline">Security Overview</a>.
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
              <i className="fa fa-cogs text-4xl text-purple-500"></i>
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
              <i className="fa fa-cubes text-4xl text-orange-500"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Powerful API</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our API allows custom integrations with your app. You pay only for what you actually use, and there are
                huge discounts for high-volume customers. We provide a lot of handy features such as full Amazon S3
                integration. Check out the <a href="https://cloudconvert.com/apis/file-conversion" className="text-blue-500 hover:underline">CloudConvert API</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
