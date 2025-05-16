import type { Metadata } from 'next';

// The metadata export will still work and override the parent layout's metadata
export const metadata: Metadata = {
  title: 'PB Trading Chat Bot',
  description: 'AI-powered trading assistant for market analysis and trading advice',
};

// This creates a layout for the PB Chat route
// It DOES NOT include the main Navbar from the root layout
export default function PBChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* This layout intentionally has no main Navbar, only children components */}
      {/* The children components include their own ChatHeader for navigation */}
      {children}
    </>
  );
}
