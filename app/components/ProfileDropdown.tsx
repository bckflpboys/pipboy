'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

const menuItems = [
  { label: 'Profile', href: '/profile' },
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
    <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => signOut()}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
