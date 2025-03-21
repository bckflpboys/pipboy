"use client";

import Link from 'next/link';
import Button from './Button';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-white text-xl font-bold">
            Pipboy
          </Link>

          {/* Auth Button */}
          {session ? (
            <Button variant="secondary" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => router.push('/auth/signin')}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
