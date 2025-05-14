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
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 250, 
              damping: 25,
              mass: 1,
              restDelta: 0.001,
              restSpeed: 0.001
            }}
            className="w-80 h-full bg-black/70 backdrop-blur-lg border-r border-gray-800/50 flex flex-col z-20 relative"
          >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative inline-block mr-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50"></div>
                <h2 className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">PB</h2>
              </div>
              <h2 className="font-bold text-lg">Trading Bot</h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all shadow-lg shadow-blue-500/20">
              <PlusIcon className="w-5 h-5 mr-2" />
              New Conversation
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-800/50">
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
                    className="p-3 hover:bg-gray-800/70 rounded-lg cursor-pointer transition-colors mb-1 border border-transparent hover:border-blue-500/30"
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
                <div className="p-3 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg cursor-pointer transition-colors border border-blue-500/20 hover:border-blue-500/40">
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
          <div className="p-4 border-t border-gray-800/50 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="font-bold text-white">PB</span>
                </div>
              </div>
              <div>
                <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">PB Trading Chat Bot</p>
                <p className="text-xs text-gray-400">v1.0.0 Beta</p>
              </div>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
