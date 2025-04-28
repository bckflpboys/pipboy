'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PencilIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    updates: boolean;
  };
  preferences: {
    darkMode: boolean;
    newsletter: boolean;
    language: string;
  };
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      marketing: false,
      updates: true,
    },
    preferences: {
      darkMode: true,
      newsletter: true,
      language: 'en',
    },
  });

  // Protect the settings route
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // TODO: Implement image upload
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 mb-8">
              Settings
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as SettingsTab)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
                  >
                    <h2 className="text-lg font-medium text-white mb-6">
                      Profile Information
                    </h2>
                    <div className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-900">
                            {session?.user?.image ? (
                              <Image
                                src={session.user.image}
                                alt="Profile"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <UserCircleIcon className="w-full h-full text-gray-600" />
                            )}
                          </div>
                          <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 transition-colors">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            {isUploading ? (
                              <ArrowUpTrayIcon className="w-4 h-4 text-white animate-bounce" />
                            ) : (
                              <PencilIcon className="w-4 h-4 text-white" />
                            )}
                          </label>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Profile Picture</h3>
                          <p className="text-sm text-gray-400">
                            JPG, GIF or PNG. Max size of 2MB
                          </p>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={session?.user?.name || ''}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={session?.user?.email || ''}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Bio
                          </label>
                          <textarea
                            rows={4}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
                  >
                    <h2 className="text-lg font-medium text-white mb-6">
                      Notification Preferences
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                        >
                          <div>
                            <h3 className="text-white font-medium capitalize">
                              {key} Notifications
                            </h3>
                            <p className="text-sm text-gray-400">
                              Receive {key} notifications about your account
                            </p>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle(key as keyof typeof settings.notifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-blue-600' : 'bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
                  >
                    <h2 className="text-lg font-medium text-white mb-6">
                      Security Settings
                    </h2>
                    <div className="space-y-6">
                      {/* Change Password */}
                      <div className="space-y-4">
                        <h3 className="text-white font-medium">Change Password</h3>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                          Update Password
                        </button>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <button className="px-4 py-2 bg-gray-900/50 text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Billing Settings */}
                {activeTab === 'billing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
                  >
                    <h2 className="text-lg font-medium text-white mb-6">
                      Billing Settings
                    </h2>
                    <div className="space-y-6">
                      {/* Payment Method */}
                      <div>
                        <h3 className="text-white font-medium mb-4">Payment Method</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                          <div className="flex items-center gap-3">
                            <CreditCardIcon className="w-6 h-6 text-gray-400" />
                            <div>
                              <p className="text-white">Visa ending in 4242</p>
                              <p className="text-sm text-gray-400">Expires 12/2024</p>
                            </div>
                          </div>
                          <button className="text-blue-500 hover:text-blue-400 transition-colors">
                            Update
                          </button>
                        </div>
                      </div>

                      {/* Billing History */}
                      <div>
                        <h3 className="text-white font-medium mb-4">Billing History</h3>
                        <div className="space-y-2">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg"
                            >
                              <div>
                                <p className="text-white">April 2024</p>
                                <p className="text-sm text-gray-400">Pro Plan</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white">$19.99</p>
                                <button className="text-sm text-blue-500 hover:text-blue-400">
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
