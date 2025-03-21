"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: "What is Pipboy?",
    answer: "Pipboy is an exclusive community of entrepreneurs focused on scaling businesses and creating wealth through proven strategies and networking."
  },
  {
    question: "How do I get a Pipboy membership?",
    answer: "Memberships are by application only. Join our waitlist to be notified when applications open."
  },
  {
    question: "What's the benefit of a membership?",
    answer: "Members get access to our exclusive courses, private networking events, marketplace deals, and a community of successful entrepreneurs."
  },
  {
    question: "How does the 14 day refund guarantee work?",
    answer: "If you're not satisfied with your membership within the first 14 days, we'll provide a full refund - no questions asked."
  },
  {
    question: "Is the membership available internationally?",
    answer: "Yes, Pipboy welcomes members from all around the world. Our community is global and diverse."
  },
  {
    question: "Do you have any more questions?",
    answer: "Contact our support team at support@pipboy.com for any additional inquiries."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-[url('/bg-texture.jpg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">FREQUENTLY ASKED QUESTIONS</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-4 px-6 bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{faq.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1, 
                      marginTop: "0.5rem"
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0, 
                      marginTop: 0 
                    }}
                    transition={{
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2, ease: "easeInOut" }
                    }}
                    className="overflow-hidden bg-gray-900/30 rounded-lg"
                  >
                    <div className="p-6 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
