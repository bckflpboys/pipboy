"use client";

import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex items-start max-w-3xl ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isBot ? 'bg-blue-600 mr-3' : 'bg-purple-600 ml-3'}`}>
          <span className="text-xl">{isBot ? '🤖' : '👤'}</span>
        </div>
        
        <div className="flex flex-col">
          <div className={`rounded-lg p-4 ${isBot ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          <span className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {format(new Date(message.timestamp), 'h:mm a')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
