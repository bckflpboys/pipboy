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
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50"></div>
              <h1 className="relative text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                PB
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">PIPBOY TRADING CHAT BOT</h2>
            
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
                title: "Real-time Market Analysis",
                description: "Get instant analysis of market conditions and potential trade opportunities.",
                icon: "📊"
              },
              {
                title: "Personalized Trading Advice",
                description: "Receive custom recommendations based on your trading style and risk tolerance.",
                icon: "🎯"
              },
              {
                title: "Risk Management",
                description: "Automated suggestions for stop-loss and take-profit levels to protect your capital.",
                icon: "🛡️"
              },
              {
                title: "Pattern Recognition",
                description: "Identify chart patterns and technical setups across multiple timeframes.",
                icon: "📈"
              },
              {
                title: "Trading Journal",
                description: "Keep track of your trades and receive performance insights to improve your strategy.",
                icon: "📝"
              },
              {
                title: "24/7 Availability",
                description: "Access trading assistance whenever you need it, day or night.",
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
