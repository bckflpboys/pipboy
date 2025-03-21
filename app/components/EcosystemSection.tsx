"use client";

import { motion } from 'framer-motion';
import Button from './Button';
import Image from 'next/image';

const courses = [
  {
    title: "ULTIMATE GUIDE TO COLD HARD CASH",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "PRE-SCALE",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    title: "FBA PLAYBOOK",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "E-COMMERCE BRANDING",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop"
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
              Provide value millions by sharing the secrets of the industry top earners in different
              entrepreneurship fields.
            </p>
            <Button variant="secondary">LEARN MORE</Button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h4 className="text-xl mb-4">INSIDE THE ACADEMY</h4>
          <p className="text-gray-400">Over 20,000+ to watch of experience and software secrets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <h4 className="text-sm font-semibold tracking-wider">{course.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EcosystemSection;
