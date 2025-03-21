"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';

function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-[url('/bg-texture.jpg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-8">Be the first to know about our events and updates</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-gray-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
              required
            />
            <Button type="submit" variant="secondary">
              SUBSCRIBE
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default NewsletterSection;
