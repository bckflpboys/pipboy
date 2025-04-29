"use client";

import Link from 'next/link';
import Button from './Button';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section with logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-white text-lg sm:text-xl font-bold hover:text-blue-500 transition-colors"
            >
              Pipboy
            </Link>
          </div>

          {/* Right section with auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            {session ? (
              <UserProfile />
            ) : (
              <div className="flex items-center">
                <Button 
                  variant="secondary" 
                  onClick={() => router.push('/auth/signin')}
                  className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
