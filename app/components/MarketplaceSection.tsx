"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { 
    name: 'Exness',
    logo: 'https://tradefx.co.za/wp-content/uploads/2021/05/Exness-Logo.png',
    description: 'Premium forex and CFD trading broker',
    discount: 'Exclusive rebates and spreads',
    link: 'https://exness.com'
  },
  { 
    name: 'Trive',
    logo: 'https://framerusercontent.com/images/BsT9O9IRvBbQcq3lXWXZSeItS8.webp?scale-down-to=512',
    description: 'Advanced multi-asset trading platform',
    discount: 'Special account conditions',
    link: 'https://trive.com'
  },
  { 
    name: 'FTMO',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f6/6f/17/f66f171e-b163-4654-cb37-65f2c0abd6f6/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/217x0w.webp',
    description: 'Leading proprietary trading firm',
    discount: 'Discounted challenges',
    link: 'https://ftmo.com'
  },
  { 
    name: 'Telegram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    description: 'Premium trading signals and community',
    discount: 'VIP channel access',
    link: 'https://t.me/pipboy'
  }
];

function MarketplaceSection() {
  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 rotate-90"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <span className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></span>
              <h2 className="text-4xl md:text-5xl font-bold relative">
                MARKETPLACE
              </h2>
            </div>
          </div>
          <div className="relative inline-block mb-12">
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Find privately negotiated rates on popular products and services. Our 
              members regularly save hundreds of $USD annually with our high-value partnerships.
            </p>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-auto h-12">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        width={120}
                        height={48}
                        className="object-contain h-full w-auto brightness-90 group-hover:brightness-100 transition-all duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium">
                      {partner.discount}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceSection;
