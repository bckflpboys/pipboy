"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { 
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    description: 'E-commerce platform with exclusive partner rates',
    discount: 'Up to 30% off annual plans'
  },
  { 
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    description: 'Payment processing with reduced fees',
    discount: 'Special processing rates'
  },
  { 
    name: 'Fiverr',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.svg',
    description: 'Freelance services marketplace',
    discount: '20% cashback on services'
  },
  { 
    name: 'PayPal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    description: 'Global payment solutions',
    discount: 'Reduced transaction fees'
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
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="relative h-12 mb-6 w-[200px]">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    width={200}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                  <p className="text-gray-400 mb-4">{partner.description}</p>
                  <div className="bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-md inline-block text-sm">
                    {partner.discount}
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
