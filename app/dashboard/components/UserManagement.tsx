'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  joinedAt: string;
  lastActive: string;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinedAt: '2024-04-01',
      lastActive: '2024-04-28',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-03-15',
      lastActive: '2024-04-28',
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch users');
        }

        setUsers(data.users);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500 text-center">
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          User Management
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
            title="Refresh"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Role</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Joined</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Last Active</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-800 last:border-b-0"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900/50 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-400">
                          {user.name[0]}
                        </span>
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{formatDate(user.joinedAt)}</td>
                  <td className="p-4 text-gray-400">{formatDate(user.lastActive)}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900/50 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-400">
                    {user.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleMenu(user.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>

                {activeMenu === user.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                    <div className="py-1">
                      <button
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => {
                          // Handle edit
                          toggleMenu(user.id);
                        }}
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit user
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
                        onClick={() => {
                          // Handle delete
                          toggleMenu(user.id);
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                        Delete user
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-purple-500/10 text-purple-500'
                      : 'bg-blue-500/10 text-blue-500'
                  }`}
                >
                  {user.role}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="text-gray-400 text-sm">
                Joined: {formatDate(user.joinedAt)}
                <br />
                Last active: {formatDate(user.lastActive)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
