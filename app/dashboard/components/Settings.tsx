'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';

interface Settings {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  autoApproveContent: boolean;
  enableComments: boolean;
  enableAnalytics: boolean;
  maxUploadSize: number;
  maxVideoDuration: number;
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    allowRegistration: true,
    requireEmailVerification: true,
    autoApproveContent: false,
    enableComments: true,
    enableAnalytics: true,
    maxUploadSize: 1024, // MB
    maxVideoDuration: 60, // minutes
  });

  const handleSwitchChange = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNumberChange = (key: keyof Settings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: parseInt(value, 10),
    }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
        Platform Settings
      </h1>

      <div className="grid gap-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Allow Registration</h3>
                <p className="text-sm text-gray-400">Allow new users to register</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onChange={() => handleSwitchChange('allowRegistration')}
                className={`${
                  settings.allowRegistration ? 'bg-blue-600' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
              >
                <span
                  className={`${
                    settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Require Email Verification</h3>
                <p className="text-sm text-gray-400">Users must verify their email</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onChange={() => handleSwitchChange('requireEmailVerification')}
                className={`${
                  settings.requireEmailVerification ? 'bg-blue-600' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
              >
                <span
                  className={`${
                    settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </motion.div>

        {/* Content Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Content Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-approve Content</h3>
                <p className="text-sm text-gray-400">Automatically approve uploaded videos</p>
              </div>
              <Switch
                checked={settings.autoApproveContent}
                onChange={() => handleSwitchChange('autoApproveContent')}
                className={`${
                  settings.autoApproveContent ? 'bg-blue-600' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
              >
                <span
                  className={`${
                    settings.autoApproveContent ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Enable Comments</h3>
                <p className="text-sm text-gray-400">Allow users to comment on videos</p>
              </div>
              <Switch
                checked={settings.enableComments}
                onChange={() => handleSwitchChange('enableComments')}
                className={`${
                  settings.enableComments ? 'bg-blue-600' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
              >
                <span
                  className={`${
                    settings.enableComments ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Maximum Upload Size (MB)
              </label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => handleNumberChange('maxUploadSize', e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Maximum Video Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.maxVideoDuration}
                onChange={(e) => handleNumberChange('maxVideoDuration', e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Analytics Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Analytics Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Enable Analytics</h3>
                <p className="text-sm text-gray-400">Collect user and content analytics</p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onChange={() => handleSwitchChange('enableAnalytics')}
                className={`${
                  settings.enableAnalytics ? 'bg-blue-600' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
              >
                <span
                  className={`${
                    settings.enableAnalytics ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
