"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';

const footerLinks = [
  { heading: 'Company', links: [
    { text: 'About Us', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ]},
  { heading: 'Resources', links: [
    { text: 'Blog', href: '/blog' },
    { text: 'Trading Chatbot', href: '/trading-chatbot' },
  ]},
  { heading: 'Legal', links: [
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Cookie Policy', href: '/cookies' },
  ]},
];

const socialLinks = [
  { icon: FaDiscord, href: 'https://discord.gg/pipboy', label: 'Discord' },
  { icon: FaTelegram, href: 'https://t.me/pipboy', label: 'Telegram' },
  { icon: FaTwitter, href: 'https://twitter.com/pipboy', label: 'Twitter' },
  { icon: FaYoutube, href: 'https://youtube.com/pipboy', label: 'YouTube' },
];

function Footer() {
  return (
    <footer className="py-16 bg-black relative border-t border-blue-900/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black opacity-80"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/PIPBOY-LOGO-WHITE.png" 
                alt="PipBoy Logo" 
                width={150} 
                height={40} 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm">
              PipBoy Hub is your all-in-one platform for trading education, tools, and community resources.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              className="col-span-1"
            >
              <h3 className="text-white font-medium mb-6">{section.heading}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar with copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PipBoy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://devaurva.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors text-xs"
            >
              Website by DevAura
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
