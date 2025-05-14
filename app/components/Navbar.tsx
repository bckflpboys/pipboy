"use client";

import Link from 'next/link';
import Button from './Button';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPbSubdomain, setIsPbSubdomain] = useState(false);
  
  // Check if we're on the PB subdomain
  useEffect(() => {
    const hostname = window.location.hostname;
    const isPbDomain = hostname.startsWith('pb.') || hostname === 'pb.localhost';
    setIsPbSubdomain(isPbDomain);
  }, []);

  // Don't render the navbar at all when on pb subdomain
  if (isPbSubdomain) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center h-16 bg-black/50 backdrop-blur-lg border border-gray-800/50 rounded-2xl px-6">
          {/* Left section with logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-white text-lg sm:text-xl font-bold hover:text-blue-500 transition-colors"
            >
              <Image 
                src="/PIPBOY-LOGO-WHITE.png"
                alt="Pipboy Logo"
                width={100}
                height={40}
                className="object-contain w-auto h-[40px]"
                priority
              />
            </Link>
          </div>

          {/* Center section with navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Resources
            </Link>
            <a 
              href="http://pb.localhost:3000" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              <span className="flex items-center">
                <span className="mr-1.5 text-blue-400">🤖</span>
                PB Chat Bot
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
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

      {/* Mobile Menu Dropdown */}
      <div className="max-w-5xl mx-auto">
        <div 
          className={`md:hidden bg-black/95 backdrop-blur-lg border border-gray-800/50 rounded-xl transition-all duration-300 ease-in-out mt-2 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
        <div className="px-4 py-4 space-y-3">
          <Link 
            href="/blog" 
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/resources" 
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <a 
            href="http://pb.localhost:3000" 
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <span className="mr-1.5 text-blue-400">🤖</span>
              PB Chat Bot
            </span>
          </a>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
