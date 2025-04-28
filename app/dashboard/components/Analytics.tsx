'use client';

import { motion } from 'framer-motion';
import {
  UsersIcon,
  VideoCameraIcon,
  ClockIcon,
  ChartBarIcon,
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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
        Analytics Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popular Videos Section */}
      <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Popular Videos</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((video) => (
            <div
              key={video}
              className="flex items-center gap-4 p-4 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              <div className="w-32 h-20 bg-gray-900/50 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Video Title {video}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>1,234 views</span>
                  <span>•</span>
                  <span>4.8 rating</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white">85%</p>
                <p className="text-sm text-gray-400">completion rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">User Activity</h2>
        <div className="h-64 flex items-end gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-blue-600/20 rounded-t-lg hover:bg-blue-600/30 transition-colors relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.round(height)}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}
