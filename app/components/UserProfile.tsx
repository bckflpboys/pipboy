'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function UserProfile() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session?.user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1 rounded-lg hover:bg-gray-800/50"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full ring-2 ring-gray-800">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s profile`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-200 text-xs sm:text-sm font-medium">
                {session.user.name?.[0] || session.user.email?.[0]}
              </span>
            </div>
          )}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-white">
          {session.user.name || session.user.email?.split('@')[0]}
        </span>
      </button>

      <ProfileDropdown isOpen={isDropdownOpen} />
    </div>
  );
}
