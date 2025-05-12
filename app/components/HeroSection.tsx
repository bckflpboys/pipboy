"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

function HeroSection() {
  return (
    <div className="min-h-screen bg-black relative flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 inline-block"
              >
                <span className="text-blue-400 text-sm font-medium">Welcome to PIPBOY</span>
              </motion.div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Master the Art of
              <span className="relative inline-block px-2">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></span>
                <span className="relative bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"> Trading</span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Join our elite community of traders and access premium strategies, real-time market analysis, and proprietary trading tools.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary">START YOUR JOURNEY</Button>
              <Button variant="secondary">WATCH INTRO</Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">5000+</span>
                <span className="text-gray-400 text-sm">Active Members</span>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">95%</span>
                <span className="text-gray-400 text-sm">Success Rate</span>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">24/7</span>
                <span className="text-gray-400 text-sm">Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800/50">
                <Image
                  src="/PIPBOY-HERO-SECTION.jpg"
                  alt="PIPBOY Trading Platform"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
