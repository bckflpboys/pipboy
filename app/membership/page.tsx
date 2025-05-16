'use client';


import ClientWrapper from '@/components/ClientWrapper';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

interface Subscription {
  id: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  amount: number;
  renewalDate: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'successful' | 'failed' | 'refunded';
  method: string;
  description: string;
}

function MembershipPageInner() {
  const { status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'payments'>('overview');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Protect the membership route
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const subscription: Subscription = {
    id: '1',
    planName: 'Pro Plan',
    status: 'active',
    startDate: '2024-04-01',
    endDate: '2024-05-01',
    amount: 19.99,
    renewalDate: '2024-05-01',
  };

  const payments: Payment[] = [
    {
      id: '1',
      date: '2024-04-01',
      amount: 19.99,
      status: 'successful',
      method: 'Visa ending in 4242',
      description: 'Pro Plan - Monthly Subscription',
    },
    {
      id: '2',
      date: '2024-03-01',
      amount: 19.99,
      status: 'successful',
      method: 'Visa ending in 4242',
      description: 'Pro Plan - Monthly Subscription',
    },
  ];

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />

          {/* Content */}
          <div className="relative z-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                My Membership
              </h1>
              <div className="flex w-full sm:w-auto gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'payments'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Payment History
                </button>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Current Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-lg font-medium text-white mb-1">
                        Current Plan
                      </h2>
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {subscription.planName}
                      </p>
                      <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                        <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Renews on {subscription.renewalDate}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        subscription.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {subscription.status === 'active' ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                      )}
                      {subscription.status}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Monthly Price</p>
                      <p className="text-xl sm:text-2xl font-semibold text-white">
                        ${subscription.amount}
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Start Date</p>
                      <p className="text-base sm:text-lg font-medium text-white">
                        {subscription.startDate}
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Next Billing</p>
                      <p className="text-base sm:text-lg font-medium text-white">
                        {subscription.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium">
                      Upgrade Plan
                    </button>
                    <button className="w-full sm:w-auto px-4 py-2 bg-gray-900/50 text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 text-sm font-medium">
                      Cancel Subscription
                    </button>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
                >
                  <h2 className="text-base sm:text-lg font-medium text-white mb-4">
                    Payment Method
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-3 bg-gray-900/50 rounded-lg">
                        <CreditCardIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-white font-medium">
                          Visa ending in 4242
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Expires 12/2024
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base">
                      Update
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'payments' && (
              <>
                {/* Desktop Payment History */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden sm:block bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-white">
                      Payment History
                    </h2>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors">
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Date
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Description
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Amount
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Status
                          </th>
                          <th className="text-right p-4 text-sm font-medium text-gray-400">
                            Receipt
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr
                            key={payment.id}
                            className="border-b border-gray-800 last:border-b-0"
                          >
                            <td className="p-4 text-white">{payment.date}</td>
                            <td className="p-4">
                              <div>
                                <p className="text-white">{payment.description}</p>
                                <p className="text-sm text-gray-400">
                                  {payment.method}
                                </p>
                              </div>
                            </td>
                            <td className="p-4 text-white">
                              ${payment.amount.toFixed(2)}
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  payment.status === 'successful'
                                    ? 'bg-green-500/10 text-green-500'
                                    : payment.status === 'failed'
                                    ? 'bg-red-500/10 text-red-500'
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                                <ChevronRightIcon className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Mobile Payment History */}
                <div className="sm:hidden space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium text-white">
                      Payment History
                    </h2>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors">
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {payments.map((payment) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-white font-medium">
                            ${payment.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">{payment.date}</p>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(payment.id)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                          >
                            <EllipsisVerticalIcon className="w-5 h-5" />
                          </button>

                          {activeMenu === payment.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                              <div className="py-1">
                                <button
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                                  onClick={() => {
                                    // Handle view receipt
                                    toggleMenu(payment.id);
                                  }}
                                >
                                  <ChevronRightIcon className="w-4 h-4" />
                                  View Receipt
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-white">{payment.description}</p>
                        <p className="text-xs text-gray-400">{payment.method}</p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'successful'
                              ? 'bg-green-500/10 text-green-500'
                              : payment.status === 'failed'
                              ? 'bg-red-500/10 text-red-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// Export with ClientWrapper for navigation hooks
export default function MembershipPage(props) {
  return (
    <ClientWrapper>
      <MembershipPageInner {...props} />
    </ClientWrapper>
  );
}
