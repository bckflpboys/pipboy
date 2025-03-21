"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

function NetworkSection() {
  return (
    <div className="py-20 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1511795409834-432f7b1dd2d9?q=80&w=2070&auto=format&fit=crop"
          alt="Networking Event Background"
          fill
          className="object-cover opacity-30"
          priority
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
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">NETW∅RK</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            We host private networking nights throughout major cities. After all, no productive 
            opportunity for members to connect with like-minded entrepreneurs from all over the 
            world should be missed.
          </p>
          
          <div className="relative">
            <div className="aspect-video max-w-4xl mx-auto overflow-hidden rounded-lg relative">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                alt="Networking Event"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
                >
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="secondary">WATCH OUR LATEST EVENT</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NetworkSection;
