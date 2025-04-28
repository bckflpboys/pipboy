'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from './components/DashboardSidebar';
import VideoManagement from './components/VideoManagement';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import BlogManagement from './components/BlogManagement';
import SubscriptionManagement from './components/SubscriptionManagement';

type DashboardTab = 'videos' | 'analytics' | 'users' | 'settings' | 'blog' | 'subscriptions';

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('videos');

  // Protect the dashboard route
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return <VideoManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <VideoManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          <div className="relative">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />
            
            {/* Content */}
            <div className="relative z-10">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
