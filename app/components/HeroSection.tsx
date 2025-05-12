"use client";

import Image from 'next/image';
import Button from './Button';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop"
          alt="Entrepreneur Club Background"
          fill
          className="object-cover brightness-50"
          priority
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight tracking-wider">
          THE F<span className="font-serif">∆</span>STEST GROWING
          <br />
          TRADING
          <br />
          C<span className="font-serif">∅</span>MMUNITY
        </h1>
        <div className="mt-8">
          <Button variant="primary" className="uppercase tracking-widest">
            JOIN US
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
