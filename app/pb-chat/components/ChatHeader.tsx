"use client";

import { Bars3Icon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface ChatHeaderProps {
  toggleSidebar: () => void;
}

export default function ChatHeader({ toggleSidebar }: ChatHeaderProps) {
  return (
    <motion.header 
      className="bg-black/50 backdrop-blur-lg border-b border-gray-800/50 p-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors mr-3"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <div className="flex items-center">
          <div className="relative inline-block mr-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50"></div>
            <div className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              PB
            </div>
          </div>
          
          {/* <div>
            <h1 className="font-bold text-lg">TRADING <motion.span 
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
            >CHAT BOT</motion.span></h1>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div> */}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="bg-blue-600/30 hover:bg-blue-600/50 rounded-full p-2 transition-colors border border-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        
        <button className="bg-purple-600/30 hover:bg-purple-600/50 rounded-full p-2 transition-colors border border-purple-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
