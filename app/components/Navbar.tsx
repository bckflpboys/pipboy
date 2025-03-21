"use client";

import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-white text-xl font-bold">
            Pipboy
          </Link>

          {/* Sign Up Button */}
          <Button variant="secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
