'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ClientWrapper from '@/components/ClientWrapper';
import DashboardSidebar from './components/DashboardSidebar';
import VideoManagement from './components/VideoManagement';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import BlogManagement from './components/BlogManagement';
import SubscriptionManagement from './components/SubscriptionManagement';

// Define tab types
type DashboardTab = 'videos' | 'analytics' | 'users' | 'settings' | 'blog' | 'subscriptions';

// Inner content component for dashboard functionality
function DashboardContent() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('videos');
  
  // Tab content mapping function
  const getTabContent = () => {
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
    <div className="min-h-screen bg-black">
      <div className="flex h-screen pt-16">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto">
          <div className="relative h-full">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {getTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Page component with admin verification wrapped in ClientWrapper
function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Only verify admin role if session is available
    if (status === 'loading') return;
    
    // Verify admin access on component mount
    const verifyAdminAccess = async () => {
      try {
        // Call the admin access verification API
        const response = await fetch('/api/auth/check-admin-access');
        const result = await response.json();
        
        // If not an admin, redirect to home
        if (!result.success) {
          router.replace('/?message=You+do+not+have+permission+to+access+the+dashboard');
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        // On error, safely redirect
        router.replace('/');
      } finally {
        setIsChecking(false);
      }
    };
    
    // Run verification if user is logged in
    if (status === 'authenticated') {
      verifyAdminAccess();
    } else if (status === 'unauthenticated') {
      // Redirect to login if not authenticated
      router.replace('/auth/signin?callbackUrl=/dashboard');
    }
  }, [status, router]);
  
  // Show loading state while checking
  if (isChecking || status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-blue-500 text-xl">Verifying access...</div>
      </div>
    );
  }
  
  // Only render dashboard for authenticated users (actual admin check is done in useEffect)
  return isChecking ? null : (session ? <DashboardContent /> : null);
}

// Export the wrapped component
export default function Page() {
  return (
    <ClientWrapper>
      <DashboardPage />
    </ClientWrapper>
  );
}
