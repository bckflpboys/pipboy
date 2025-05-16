"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 mb-8">
                Cookie Policy
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">Last Updated: May 15, 2025</p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. What Are Cookies</h2>
                <p className="text-gray-300">
                  Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your 
                  web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
                </p>
                <p className="text-gray-300 mt-4">
                  Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your personal computer or mobile device 
                  when you go offline, while session cookies are deleted as soon as you close your web browser.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-300">
                  When you use and access our website, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li><strong className="text-white">Essential cookies:</strong> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
                  <li><strong className="text-white">Analytical/performance cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</li>
                  <li><strong className="text-white">Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.</li>
                  <li><strong className="text-white">Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Third-Party Cookies</h2>
                <p className="text-gray-300">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, 
                  deliver advertisements on and through the website, and so on.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. What Are Your Choices Regarding Cookies</h2>
                <p className="text-gray-300">
                  If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
                </p>
                <p className="text-gray-300 mt-4">
                  Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, 
                  you may not be able to store your preferences, and some of our pages might not display properly.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Where Can You Find More Information About Cookies</h2>
                <p className="text-gray-300">
                  You can learn more about cookies on the following third-party websites:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://www.allaboutcookies.org/</a></li>
                  <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://www.networkadvertising.org/</a></li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Changes to Our Cookie Policy</h2>
                <p className="text-gray-300">
                  We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                </p>
                <p className="text-gray-300 mt-4">
                  You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about our Cookie Policy, please contact us at:
                </p>
                <p className="text-gray-300 mt-2">
                  Email: support@pipboy.com
                </p>

                <div className="mt-12 pt-8 border-t border-gray-800">
                  <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
