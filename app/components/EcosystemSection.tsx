"use client";

import { motion } from 'framer-motion';
// import Button from './Button';
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
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Animated Background Effect */}
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
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <span className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></span>
              <h2 className="text-4xl md:text-5xl font-bold relative">
                INSIDE THE ACADEMY
              </h2>
            </div>
          </div>
          <div className="relative inline-block mb-12">
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Over 100+ hours of premium trading content, market analysis, and proprietary tools
            </p>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
                onClick={() => {
                  if (course.title === "PIPBOY TRADING CHAT BOT") {
                    window.location.href = "/trading-chatbot";
                  }
                }}
                style={course.title === "PIPBOY TRADING CHAT BOT" ? { cursor: 'pointer' } : {}}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    {course.title === "PIPBOY CONCEPTS SIMPLIFIED" && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500/20 backdrop-blur-sm text-green-400 text-xs px-3 py-1.5 rounded-full border border-green-500/50 font-semibold">
                          FREE
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs px-3 py-1.5 rounded-full border border-blue-500/50">
                        {course.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {course.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs text-gray-500">{course.duration}</span>
                      {course.title === "PIPBOY TRADING CHAT BOT" ? (
                        <a href="/trading-chatbot" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
                          Learn More 
                          <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      ) : (
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
                          Learn More 
                          <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              EXPLORE ALL COURSES
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default EcosystemSection;
