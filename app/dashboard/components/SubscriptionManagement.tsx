'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  active: boolean;
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  amount: number;
}

export default function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState<'plans' | 'subscriptions'>('plans');
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const [plans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Basic',
      price: 9.99,
      interval: 'monthly',
      features: ['Access to basic courses', 'Community support', 'Monthly webinars'],
      active: true,
    },
    {
      id: '2',
      name: 'Pro',
      price: 19.99,
      interval: 'monthly',
      features: ['Access to all courses', 'Priority support', 'Weekly webinars', 'Project reviews'],
      active: true,
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 199.99,
      interval: 'yearly',
      features: ['Custom solutions', 'Dedicated support', 'Team management', 'API access'],
      active: true,
    },
  ]);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      planId: '2',
      planName: 'Pro',
      status: 'active',
      startDate: '2024-04-01',
      endDate: '2024-05-01',
      amount: 19.99,
    },
    // Add more dummy subscriptions as needed
  ]);

  const stats = [
    {
      name: 'Total Revenue',
      value: '$2,345.00',
      change: '+12.3%',
      icon: CreditCardIcon,
    },
    {
      name: 'Active Subscribers',
      value: '156',
      change: '+5.4%',
      icon: UserGroupIcon,
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: ChartBarIcon,
    },
  ];

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Subscription Management
        </h1>
        {activeTab === 'plans' && (
          <button
            onClick={() => setIsCreatingPlan(true)}
            className="w-full sm:w-auto group relative flex justify-center rounded-lg bg-blue-600 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all duration-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Plan
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
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

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'plans'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Plans
        </button>
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'subscriptions'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Subscriptions
        </button>
      </div>

      {/* Plans Management */}
      {activeTab === 'plans' && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-2">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-400">
                      /{plan.interval}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                    title="Edit plan"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                    title="Delete plan"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 sm:mt-6">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    plan.active
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {plan.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Subscriptions List */}
      {activeTab === 'subscriptions' && (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Plan</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Start Date</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">End Date</th>
                    <th className="text-right p-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr
                      key={subscription.id}
                      className="border-b border-gray-800 last:border-b-0"
                    >
                      <td className="p-4 text-white">{subscription.userName}</td>
                      <td className="p-4 text-white">{subscription.planName}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            subscription.status === 'active'
                              ? 'bg-green-500/10 text-green-500'
                              : subscription.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}
                        >
                          {subscription.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{subscription.startDate}</td>
                      <td className="p-4 text-gray-400">{subscription.endDate}</td>
                      <td className="p-4 text-right text-white">
                        ${subscription.amount}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                            title="Edit subscription"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          {subscription.status === 'active' && (
                            <button 
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                              title="Cancel subscription"
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {subscriptions.map((subscription) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-medium">{subscription.userName}</h3>
                    <p className="text-sm text-gray-400">{subscription.planName} Plan</p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(subscription.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>

                    {activeMenu === subscription.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                        <div className="py-1">
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => {
                              // Handle edit
                              toggleMenu(subscription.id);
                            }}
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit subscription
                          </button>
                          {subscription.status === 'active' && (
                            <button
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
                              onClick={() => {
                                // Handle cancel
                                toggleMenu(subscription.id);
                              }}
                            >
                              <XCircleIcon className="w-4 h-4" />
                              Cancel subscription
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        subscription.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : subscription.status === 'cancelled'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {subscription.status}
                    </span>
                    <span className="text-sm text-white font-medium">
                      ${subscription.amount}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-400">
                    <p>Start: {subscription.startDate}</p>
                    <p>End: {subscription.endDate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Create Plan Modal */}
      {isCreatingPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Create New Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Enter plan name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interval
                </label>
                <select className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={4}
                  placeholder="Enter features"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => setIsCreatingPlan(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-900/50 rounded-lg hover:bg-gray-800/50"
              >
                Cancel
              </button>
              <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium">
                Create Plan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
