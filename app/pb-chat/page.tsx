"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ChatMessage from './components/ChatMessage';
import ChatHeader from './components/ChatHeader';
import ChatSidebar from './components/ChatSidebar';

// Message type definition
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
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
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Messages */}
        <motion.div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
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
        <div className="border-t border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about market analysis, trading advice, or risk management..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`bg-blue-600 hover:bg-blue-700 rounded-lg p-2 transition-colors ${!inputValue.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
