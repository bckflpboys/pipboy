'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Class', href: '/class' },
  { label: 'Membership', href: '/membership' },
  { label: 'Settings', href: '/settings' },
];

interface ProfileDropdownProps {
  isOpen: boolean;
}

export default function ProfileDropdown({ isOpen }: ProfileDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 sm:right-auto top-full mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 focus:outline-none transform origin-top-right">
      <div 
        className="py-1 divide-y divide-gray-800" 
        role="menu" 
        aria-orientation="vertical" 
        aria-labelledby="user-menu-button"
      >
        <div className="py-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors first:rounded-t-lg"
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="py-1">
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors last:rounded-b-lg"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
