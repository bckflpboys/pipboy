"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
                Terms of Service
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">Last Updated: May 15, 2025</p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
                <p className="text-gray-300">
                  Welcome to PipBoy Hub. These terms and conditions outline the rules and regulations for the use of our website.
                  By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 
                  PipBoy Hub if you do not accept all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. License to Use</h2>
                <p className="text-gray-300">
                  Unless otherwise stated, PipBoy Hub and/or its licensors own the intellectual property rights for all material on this website. 
                  All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use 
                  subject to restrictions set in these terms and conditions.
                </p>
                <p className="text-gray-300 mt-4">
                  You must not:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                  <li>Republish material from this website</li>
                  <li>Sell, rent, or sub-license material from this website</li>
                  <li>Reproduce, duplicate, or copy material from this website</li>
                  <li>Redistribute content from PipBoy Hub (unless content is specifically made for redistribution)</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. User Accounts</h2>
                <p className="text-gray-300">
                  If you create an account on our website, you are responsible for maintaining the security of your account, 
                  and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
                </p>
                <p className="text-gray-300 mt-4">
                  We may, at our sole discretion, suspend, disable, or delete your account if we believe that you have violated or acted 
                  inconsistently with the letter or spirit of these Terms of Service.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. User Content</h2>
                <p className="text-gray-300">
                  Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
                  videos, or other material. You are responsible for the content that you post to the service, including its legality, 
                  reliability, and appropriateness.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-300">
                  In no event shall PipBoy Hub, nor any of its officers, directors, and employees, be liable to you for anything 
                  arising out of or in any way connected with your use of this website, whether such liability is under contract, 
                  tort or otherwise.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Governing Law</h2>
                <p className="text-gray-300">
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
                  submit to the exclusive jurisdiction of the courts in that location.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
                  we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will 
                  be determined at our sole discretion.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about these Terms, please contact us at:
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
