"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ChatMessage from './components/ChatMessage';
import ChatHeader from './components/ChatHeader';
import ChatSidebar from './components/ChatSidebar';
import '../globals.css';

// CSS classes are now handled by Tailwind directly
// No need for inline styles that can cause hydration issues

// Message type definition
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

// Sample welcome messages
const welcomeMessages: Message[] = [
  {
    id: '1',
    content: "👋 Welcome to PB Trading Chat Bot! I'm your AI-powered trading assistant.",
    sender: 'bot',
    timestamp: new Date()
  },
  {
    id: '2',
    content: "I can help you analyze markets, provide trading advice, and manage risk. What would you like to discuss today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

// Sample responses for demo purposes
const sampleResponses = [
  "Based on the current market conditions, I'm seeing a potential breakout pattern on BTC/USD. The price is testing a key resistance level at $63,500 with increasing volume, which could indicate a move higher if it breaks through.",
  
  "Looking at your trading history, I notice you tend to exit profitable trades too early. Consider using trailing stop losses to let your winners run longer while protecting your gains.",
  
  "For your risk management question, I'd recommend setting your stop loss at $58,200, which is just below the recent support level. This gives you a risk of 2.1% on your account if you size your position correctly.",
  
  "The RSI indicator is showing oversold conditions on the 4-hour chart, but there's still a bearish divergence on the daily timeframe. This mixed signal suggests caution - perhaps consider a smaller position size than usual.",
  
  "I've analyzed your recent trades and noticed your win rate is 62%, but your risk-reward ratio is only 0.8:1. To improve profitability, try focusing on trades with at least a 1.5:1 reward-to-risk ratio, even if it means taking fewer trades."
];

export default function PBChatPage() {
  // No need to add inline styles anymore - using Tailwind classes directly
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Create object URL for file preview
  const createFileAttachment = (file: File) => {
    const url = URL.createObjectURL(file);
    return {
      name: file.name,
      type: file.type,
      url: url,
      size: file.size
    };
  };

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() && !selectedFile) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    // Add file attachment if present
    if (selectedFile) {
      userMessage.attachment = createFileAttachment(selectedFile);
    }
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    clearSelectedFile();
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Moving rings - matching trading-chatbot page */}
        <motion.div 
          className="absolute w-[300px] h-[300px] border-4 border-blue-500/60 rounded-full"
          initial={{ left: '-150px', top: '30%' }}
          animate={{ left: '100%', top: '70%' }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.5)'
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute w-[200px] h-[200px] border-4 border-purple-500/70 rounded-full"
          initial={{ top: '-100px', left: '60%' }}
          animate={{ top: '100%', left: '20%' }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            boxShadow: '0 0 15px 2px rgba(147, 51, 234, 0.5)'
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute w-[400px] h-[400px] border-4 border-indigo-500/65 rounded-full"
          initial={{ right: '-200px', top: '75%' }}
          animate={{ right: '100%', top: '25%' }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            boxShadow: '0 0 15px 2px rgba(99, 102, 241, 0.5)'
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black opacity-80"></div>
      </div>
      
      {/* Sidebar */}
      <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <ChatHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Messages */}
        <motion.div 
          className="flex-1 overflow-y-auto p-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 max-w-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>
        
        {/* Input area */}
        <div className="border-t border-gray-800/30 p-4 backdrop-blur-sm bg-black/30">
          {/* File preview */}
          {selectedFile && (
            <div className="mb-3 p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 flex items-center">
              <div className="flex-1 flex items-center overflow-hidden">
                <div className="mr-2 p-1.5 sm:p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                  {selectedFile.type.startsWith('image/') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : selectedFile.type.startsWith('application/pdf') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1 max-w-[calc(100%-70px)] sm:max-w-[calc(100%-90px)]">
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {selectedFile.name.length > 25 
                      ? selectedFile.name.substring(0, 20) + '...' + selectedFile.name.substring(selectedFile.name.lastIndexOf('.'))
                      : selectedFile.name
                    }
                  </p>
                  <p className="text-xs text-gray-400 hidden xs:block">{selectedFile.size < 1024 ? `${selectedFile.size} bytes` : selectedFile.size < 1024 * 1024 ? `${(selectedFile.size / 1024).toFixed(1)} KB` : `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={clearSelectedFile}
                className="ml-1 sm:ml-2 p-1 sm:p-1.5 text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-700/50 transition-colors flex-shrink-0"
              >
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex space-x-1 sm:space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about trading or market analysis..."
              className="flex-1 bg-gray-900/80 border border-gray-700/50 rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 placeholder-gray-500 min-w-0"
            />
            
            {/* File upload button */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isTyping}
              className={`bg-gray-800 hover:bg-gray-700 rounded-lg p-2 sm:p-3 transition-all border border-gray-700/50 flex-shrink-0 ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Attach file"
            >
              <PaperClipIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
            </button>
            
            <button
              type="submit"
              disabled={((!inputValue.trim() && !selectedFile) || isTyping)}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg p-2 sm:p-3 transition-all flex-shrink-0 ${(!inputValue.trim() && !selectedFile) || isTyping ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-blue-500/20'}`}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
