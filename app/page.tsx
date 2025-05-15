"use client";

import HeroSection from '@/components/HeroSection';
import EcosystemSection from '@/components/EcosystemSection';
import NetworkSection from '@/components/NetworkSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/NewsletterSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import AccessDeniedHandler from '@/components/AccessDeniedHandler';
import ClientWrapper from '@/components/ClientWrapper';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Handle access denied messages - wrapped in ClientWrapper */}
      <ClientWrapper>
        <AccessDeniedHandler />
      </ClientWrapper>
      
      <HeroSection />
      <EcosystemSection />
      <NetworkSection />
      <MarketplaceSection />
      <BlogSection />
      <NewsletterSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
