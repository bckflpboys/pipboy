import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Capital Club - The Fastest Growing Entrepreneur Club",
  description: "Join the fastest growing entrepreneur club in the world. Access exclusive resources, networking opportunities, and education to accelerate your business growth.",
  keywords: "entrepreneur club, business networking, entrepreneurship, business education, startup community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
