"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon, ChatBubbleLeftRightIcon, ChartBarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ChatSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Sample conversation history
const sampleConversations = [
  { id: '1', title: 'BTC Market Analysis', date: '2 hours ago' },
  { id: '2', title: 'ETH Trading Strategy', date: 'Yesterday' },
  { id: '3', title: 'Risk Management Plan', date: '3 days ago' },
  { id: '4', title: 'Trading Journal Review', date: 'Last week' },
];

export default function ChatSidebar({ isOpen, setIsOpen }: ChatSidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'templates'>('chats');
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-80 h-full bg-gray-800 border-r border-gray-700 flex flex-col z-20"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-xl">PB Trading Bot</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
              <PlusIcon className="w-5 h-5 mr-2" />
              New Conversation
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex-1 py-3 text-center transition-colors ${activeTab === 'chats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Recent Chats
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-3 text-center transition-colors ${activeTab === 'templates' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Templates
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'chats' && (
              <div className="p-2">
                {sampleConversations.map((convo) => (
                  <div 
                    key={convo.id}
                    className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors mb-1"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{convo.title}</h3>
                      <span className="text-xs text-gray-400">{convo.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate mt-1">
                      Last message from this conversation...
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'templates' && (
              <div className="p-2 space-y-2">
                <div className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3 text-blue-400" />
                    <div>
                      <h3 className="font-medium">Market Analysis</h3>
                      <p className="text-xs text-gray-400">Get detailed analysis of any market</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <ChartBarIcon className="w-5 h-5 mr-3 text-green-400" />
                    <div>
                      <h3 className="font-medium">Trade Setup</h3>
                      <p className="text-xs text-gray-400">Find optimal entry, stop loss and take profit</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 mr-3 text-purple-400" />
                    <div>
                      <h3 className="font-medium">Risk Calculator</h3>
                      <p className="text-xs text-gray-400">Calculate position size and risk</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3 text-yellow-400" />
                    <div>
                      <h3 className="font-medium">Trading Journal</h3>
                      <p className="text-xs text-gray-400">Review and analyze your trading history</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                <span className="font-bold text-white">PB</span>
              </div>
              <div>
                <p className="font-medium">PB Trading Chat Bot</p>
                <p className="text-xs text-gray-400">v1.0.0 Beta</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
