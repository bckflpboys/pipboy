"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import WaitlistForm from '../components/WaitlistForm';

export default function TradingBotPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden pt-16 md:pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* No central pulsing glow - removed as requested */}
          
          {/* Moving rings - brighter version */}
          <motion.div 
            className="absolute w-[300px] h-[300px] border-4 border-blue-500/60 rounded-full"
            initial={{ left: '-150px', top: '30%' }}
            animate={{ left: '100%', top: '70%' }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.5)'
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute w-[200px] h-[200px] border-4 border-purple-500/70 rounded-full"
            initial={{ top: '-100px', left: '60%' }}
            animate={{ top: '100%', left: '20%' }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              boxShadow: '0 0 15px 2px rgba(147, 51, 234, 0.5)'
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute w-[400px] h-[400px] border-4 border-indigo-500/65 rounded-full"
            initial={{ right: '-200px', top: '75%' }}
            animate={{ right: '100%', top: '25%' }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              boxShadow: '0 0 15px 2px rgba(99, 102, 241, 0.5)'
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl flex flex-col items-center"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50"></div>
              <h1 className="relative text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                PB
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative block w-full">
              PIPBOY TRADING <span className="relative inline-block">
                <motion.span 
                  className="relative inline-block"
                  animate={{
                    color: [
                      'rgb(255, 255, 255)',
                      'rgb(96, 165, 250)',
                      'rgb(168, 85, 247)',
                      'rgb(255, 255, 255)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  CHAT BOT
                </motion.span>
                <div className="relative w-full h-2 mt-1">
                  <motion.div 
                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    style={{
                      boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
                    }}
                  />
                </div>
              </span>
            </h2>
            
            <div className="flex items-center justify-center mb-8">
              <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-sm px-4 py-2 rounded-full border border-blue-500/50 font-semibold">
                COMING SOON
              </span>
            </div>
            
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Your AI-powered trading assistant and market analyzer. Get real-time insights, personalized trading advice, and market analysis at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                JOIN WAITLIST
              </button>
              <Link href="/" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                BACK TO HOME
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">BOT FEATURES</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              PB is designed to enhance your trading experience with cutting-edge AI capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Chat-Based Market Analysis",
                description: "Ask questions and get instant analysis of market conditions through natural conversation.",
                icon: "📊"
              },
              {
                title: "Conversational Trading Advice",
                description: "Chat with PB to receive personalized recommendations based on your trading style.",
                icon: "🎯"
              },
              {
                title: "Interactive Risk Management",
                description: "Discuss your positions and get chat-based suggestions for stop-loss and take-profit levels.",
                icon: "🛡️"
              },
              {
                title: "AI Pattern Recognition",
                description: "Message PB to identify chart patterns and get explanations in simple conversational language.",
                icon: "📈"
              },
              {
                title: "Conversational Trading Journal",
                description: "Chat about your past trades and receive AI-powered insights to improve your strategy.",
                icon: "📝"
              },
              {
                title: "24/7 Chat Availability",
                description: "Message your AI trading assistant anytime, anywhere - it's always ready to respond.",
                icon: "⏰"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sneak Peek Section */}
      <div className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">SNEAK PEEK</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Get a glimpse of the PB Trading Chat Bot interface and features
            </p>
          </motion.div>

          {/* Desktop Screenshot - Large Landscape Image */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden border-2 border-gray-800 shadow-lg shadow-blue-500/10 mx-auto max-w-4xl"
            >
              <img 
                src="/pb-s-4-large.png" 
                alt="PB Chat Bot Desktop Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>

          {/* Mobile Screenshots - Portrait Images */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">Mobile Views</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={`mobile-${num}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: num * 0.1 }}
                  className="relative rounded-xl overflow-hidden border-2 border-gray-800 shadow-lg shadow-blue-500/10 mx-auto"
                >
                  <img 
                    src={num === 1 ? '/pb-s-1.png' : num === 2 ? '/pb-s-2.png' : '/pb-s-3.png'} 
                    alt={`PB Chat Bot Mobile Preview ${num}`} 
                    className="w-full h-auto max-w-[280px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Try Demo button removed as requested */}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Everything you need to know about the PB trading bot.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "When will the PB trading bot be available?",
                answer: "The PB trading bot is currently in development. Join our waitlist to be notified when it launches."
              },
              {
                question: "Will the bot work with my preferred exchange?",
                answer: "PB is being designed to integrate with major cryptocurrency exchanges. We'll announce supported platforms closer to launch."
              },
              {
                question: "Is the bot suitable for beginners?",
                answer: "Yes! PB is designed to be user-friendly for traders of all experience levels, with features that adapt to your trading knowledge."
              },
              {
                question: "How much will the bot cost?",
                answer: "Pricing details will be announced closer to launch. We're committed to providing competitive pricing with various subscription tiers."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-6 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">BE THE FIRST TO KNOW</h2>
            <p className="text-gray-400 text-lg mb-8">
              Join our waitlist to get early access to the PB trading bot and exclusive launch offers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-white px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              />
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                JOIN WAITLIST
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Waitlist Form Modal */}
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
