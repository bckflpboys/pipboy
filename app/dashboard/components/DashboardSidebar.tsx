'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  VideoCameraIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

type DashboardTab = 'videos' | 'analytics' | 'users' | 'settings' | 'blog' | 'subscriptions';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export default function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const navItems = [
    { id: 'videos', name: 'Videos', icon: VideoCameraIcon },
    { id: 'blog', name: 'Blog', icon: DocumentTextIcon },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCardIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'users', name: 'Users', icon: UserGroupIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const handleTabChange = (tab: DashboardTab) => {
    onTabChange(tab);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-gray-900/50 text-white hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 h-[100vh] md:h-full bg-black/50 backdrop-blur-lg border-r border-gray-800
        transition-all duration-300 ease-in-out z-40 overflow-y-auto
        ${isMobileMenuOpen ? 'left-0' : '-left-64'} 
        md:left-0 w-64 flex-shrink-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 pt-24 md:pt-6">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              PipBoy Admin
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as DashboardTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800 mt-auto">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors mt-2"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
