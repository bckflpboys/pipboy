"use client";

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';


interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date | string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  const [formattedTime, setFormattedTime] = useState<string>('');
  
  // Get a stable raw time string for server rendering
  const getRawTimeString = useCallback(() => {
    if (typeof message.timestamp === 'string') {
      if (message.timestamp.includes('T')) {
        return message.timestamp;
      }
      return message.timestamp;
    }
    return message.timestamp.toISOString();
  }, [message.timestamp]);
  
  // Format the time on the client side only after hydration
  useEffect(() => {
    try {
      const date = typeof message.timestamp === 'string' 
        ? new Date(message.timestamp) 
        : message.timestamp;
      setFormattedTime(format(date, 'h:mm a'));
    } catch {  // No need to name the error if we're not using it
      // Fallback if date parsing fails
      setFormattedTime(getRawTimeString());
    }
  }, [message.timestamp, getRawTimeString]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex items-start max-w-3xl ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`relative w-10 h-10 flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className={`absolute inset-0 rounded-full ${isBot ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} blur-sm opacity-70`}></div>
          <div className={`absolute inset-0 rounded-full ${isBot ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} flex items-center justify-center`}>
            <span className="text-xl">{isBot ? '🤖' : '👤'}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className={`rounded-lg p-4 ${isBot ? 'bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-blue-500/20'}`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          <span className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {/* Use a simple server-compatible format initially, then client-side formatting takes over */}
            {formattedTime || ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
