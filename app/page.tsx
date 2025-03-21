"use client";

import HeroSection from '@/components/HeroSection';
import EcosystemSection from '@/components/EcosystemSection';
import NetworkSection from '@/components/NetworkSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import NewsletterSection from '@/components/NewsletterSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <EcosystemSection />
      <NetworkSection />
      <MarketplaceSection />
      <NewsletterSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
