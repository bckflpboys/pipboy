"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">Last Updated: May 15, 2025</p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
                <p className="text-gray-300">
                  Welcome to PipBoy Hub. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. The Data We Collect</h2>
                <p className="text-gray-300">
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li><strong className="text-white">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong className="text-white">Contact Data</strong> includes email address.</li>
                  <li><strong className="text-white">Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong className="text-white">Usage Data</strong> includes information about how you use our website and services.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. How We Use Your Data</h2>
                <p className="text-gray-300">
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li>To register you as a new customer.</li>
                  <li>To provide and improve our services to you.</li>
                  <li>To manage our relationship with you.</li>
                  <li>To administer and protect our business and this website.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Data Security</h2>
                <p className="text-gray-300">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, 
                  or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those 
                  employees, agents, contractors, and other third parties who have a business need to know.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Data Retention</h2>
                <p className="text-gray-300">
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
                  including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Your Legal Rights</h2>
                <p className="text-gray-300">
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
