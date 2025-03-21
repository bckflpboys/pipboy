"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  { text: 'CAREERS', href: '/careers' },
  { text: 'SUPPORT', href: '/support' },
  { text: 'PRIVACY POLICY', href: '/privacy' },
  { text: 'TERMS OF SERVICE', href: '/terms' },
];

function Footer() {
  return (
    <footer className="py-8 bg-black relative">
      <div className="absolute inset-0 bg-[url('/bg-texture.jpg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link href="/" className="text-white text-xl font-bold">
              Cap Hub
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mb-8"
          >
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-500"
          >
            {new Date().getFullYear()} Capital Club. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
