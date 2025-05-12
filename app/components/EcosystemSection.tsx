"use client";

import { motion } from 'framer-motion';
import Button from './Button';
import Image from 'next/image';

const courses = [
  {
    title: "PIPBOY TRADING SYSTEM PHASE 1",
    description: "Master the fundamentals of the Pipboy trading methodology",
    type: "COURSE",
    duration: "20+ Hours",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "PIPBOY TRADING SYSTEM PHASE 2",
    description: "Advanced strategies and risk management techniques",
    type: "COURSE",
    duration: "25+ Hours",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "PIPBOY CONCEPTS SIMPLIFIED",
    description: "Essential trading concepts explained in detail",
    type: "PDF GUIDE",
    duration: "50 Pages",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "PIPBOY TRADING CHAT BOT",
    description: "AI-powered trading assistant and market analyzer",
    type: "TOOL",
    duration: "24/7 Access",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=2070&auto=format&fit=crop"
  }
];

function EcosystemSection() {
  return (
    <div className="py-20 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
          alt="Academy Background"
          fill
          className="object-cover opacity-30"
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">OUR ECOSYSTEM</h2>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-4">AC∆DEMY</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Unlock elite trading strategies and insights from top-performing traders, featuring proven methods in forex, crypto, and stock markets.
            </p>
            <Button variant="secondary">LEARN MORE</Button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h4 className="text-xl mb-4">INSIDE THE ACADEMY</h4>
          <p className="text-gray-400">Over 100+ hours of premium trading content, market analysis, and proprietary tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-800 hover:border-blue-500/50"
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/50">
                    {course.type}
                  </span>
                </div>
                {course.title === "PIPBOY CONCEPTS SIMPLIFIED" && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500/20 backdrop-blur-sm text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/50 font-semibold">
                      FREE
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 relative">
                <h4 className="text-sm font-semibold tracking-wider mb-2">{course.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{course.duration}</span>
                  <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors">Learn More →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EcosystemSection;
