'use client';

import { motion } from 'framer-motion';
import {
  UsersIcon,
  VideoCameraIcon,
  ClockIcon,
  ChartBarIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    id: 1,
    name: 'Total Users',
    value: '2,345',
    change: '+12%',
    icon: UsersIcon,
  },
  {
    id: 2,
    name: 'Total Videos',
    value: '48',
    change: '+4',
    icon: VideoCameraIcon,
  },
  {
    id: 3,
    name: 'Watch Time',
    value: '1,234h',
    change: '+25%',
    icon: ClockIcon,
  },
  {
    id: 4,
    name: 'Engagement Rate',
    value: '68%',
    change: '+5%',
    icon: ChartBarIcon,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Analytics Overview
        </h1>
        <div className="flex gap-2 text-sm text-gray-400">
          <button className="px-3 py-1.5 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
            Last 7 days
          </button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-gray-900/50 transition-colors">
            Last 30 days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 sm:p-3 bg-blue-600/10 rounded-lg">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl sm:text-2xl font-semibold text-white">{stat.value}</p>
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popular Videos Section */}
      <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">Popular Videos</h2>
          <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View all
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((video) => (
            <div
              key={video}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-4 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              <div className="w-full sm:w-32 h-40 sm:h-20 bg-gray-900/50 rounded-lg"></div>
              <div className="flex-1 space-y-2 sm:space-y-0">
                <h3 className="text-white font-medium">Video Title {video}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                  <span>1,234 views</span>
                  <span className="hidden sm:inline">•</span>
                  <span>4.8 rating</span>
                </div>
              </div>
              <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                <p className="text-lg font-semibold text-white">85%</p>
                <p className="text-sm text-gray-400">completion rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">User Activity</h2>
          <div className="flex gap-2">
            <button className="text-sm text-gray-400 px-2 py-1 rounded hover:bg-gray-900/50 transition-colors">
              Daily
            </button>
            <button className="text-sm text-white px-2 py-1 rounded bg-gray-900/50">
              Monthly
            </button>
          </div>
        </div>
        <div className="h-48 sm:h-64 flex items-end gap-1 sm:gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-blue-600/20 rounded-t-lg hover:bg-blue-600/30 transition-colors relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {Math.round(height)}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-6 sm:flex sm:justify-between mt-4 text-xs sm:text-sm text-gray-400 gap-2">
          <span className="col-span-1">Jan</span>
          <span className="col-span-1">Feb</span>
          <span className="col-span-1">Mar</span>
          <span className="col-span-1">Apr</span>
          <span className="col-span-1">May</span>
          <span className="col-span-1">Jun</span>
          <span className="hidden sm:block">Jul</span>
          <span className="hidden sm:block">Aug</span>
          <span className="hidden sm:block">Sep</span>
          <span className="hidden sm:block">Oct</span>
          <span className="hidden sm:block">Nov</span>
          <span className="hidden sm:block">Dec</span>
        </div>
      </div>
    </div>
  );
}
