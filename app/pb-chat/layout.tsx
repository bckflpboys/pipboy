import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Import styles directly to ensure they're loaded
import '../globals.css';
import { Providers } from '../providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PB Trading Chat Bot',
  description: 'AI-powered trading assistant for market analysis and trading advice',
};

// This creates a completely separate layout for the PB Chat route
// It DOES NOT include the main Navbar from the root layout
export default function PBChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>PB Trading Chat Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AI-powered trading assistant for market analysis and trading advice" />
      </head>
      <body className={inter.className}>
        <Providers>
          {/* This layout intentionally has no main Navbar, only children components */}
          {/* The children components include their own ChatHeader for navigation */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
