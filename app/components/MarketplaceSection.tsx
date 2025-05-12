"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { 
    name: 'Exness',
    logo: 'https://tradefx.co.za/wp-content/uploads/2021/05/Exness-Logo.png',
    description: 'Premium forex and CFD trading broker',
    discount: 'Exclusive rebates and spreads'
  },
  { 
    name: 'Trive',
    logo: 'https://framerusercontent.com/images/BsT9O9IRvBbQcq3lXWXZSeItS8.webp?scale-down-to=512',
    description: 'Advanced multi-asset trading platform',
    discount: 'Special account conditions'
  },
  { 
    name: 'FTMO',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f6/6f/17/f66f171e-b163-4654-cb37-65f2c0abd6f6/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/217x0w.webp',
    description: 'Leading proprietary trading firm',
    discount: 'Discounted challenges'
  },
  { 
    name: 'Telegram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    description: 'Premium trading signals and community',
    discount: 'VIP channel access'
  }
];

function MarketplaceSection() {
  return (
    <div className="py-20 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Marketplace Background"
          fill
          className="object-cover opacity-30"
          unoptimized
        />
        {/* Gradient Overlay */}
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
          <h2 className="text-3xl font-bold mb-6">MARKETPLACE</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find privately negotiated rates on popular products and services. Our 
            members regularly save hundreds of $USD annually with our high-value partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/40 transition-all duration-300 border border-gray-800/50 hover:border-blue-500/30"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-start h-16 mb-6">
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
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{partner.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{partner.description}</p>
                  <div className="pt-4">
                    <div className="bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-lg inline-block text-sm font-medium">
                      {partner.discount}
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
                      Learn More 
                      <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceSection;
