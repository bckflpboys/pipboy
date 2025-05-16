"use client";

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};


interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date | string;
  attachment?: {
    name: string;
    type: string;
    url: string;
    size: number;
  };
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
            
            {/* File attachment display */}
            {message.attachment && (
              <div className="mt-3 border border-gray-700/50 rounded-md overflow-hidden">
                <div className="flex items-center p-1.5 sm:p-2 bg-gray-800/50">
                  <div className="mr-1.5 sm:mr-2 p-1.5 sm:p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    {message.attachment.type.startsWith('image/') ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : message.attachment.type.startsWith('application/pdf') ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 max-w-[calc(100%-80px)] sm:max-w-[calc(100%-100px)]">
                    <p className="text-xs sm:text-sm font-medium truncate">
                      {message.attachment.name.length > 25 
                        ? message.attachment.name.substring(0, 20) + '...' + message.attachment.name.substring(message.attachment.name.lastIndexOf('.'))
                        : message.attachment.name
                      }
                    </p>
                    <p className="text-xs text-gray-400 hidden xs:block">{formatFileSize(message.attachment.size)}</p>
                  </div>
                  <a 
                    href={message.attachment.url} 
                    download={message.attachment.name}
                    className="ml-1 sm:ml-2 p-1.5 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download file"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
                
                {/* Preview for images */}
                {message.attachment.type.startsWith('image/') && (
                  <div className="relative w-full h-40 sm:h-60 overflow-hidden bg-gray-900 flex items-center justify-center">
                    <Image 
                      src={message.attachment.url} 
                      alt={message.attachment.name}
                      width={400}
                      height={240}
                      className="max-w-full max-h-40 sm:max-h-60 object-contain"
                      style={{ objectFit: 'contain' }}
                      unoptimized={message.attachment.url.startsWith('blob:') || message.attachment.url.startsWith('data:')}
                    />
                  </div>
                )}
              </div>
            )}
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
