import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { QuoteModal } from './components/QuoteModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { VendorModal } from './components/VendorModal';
import { Footer } from './components/Footer';
import { AppLoadingScreen } from './components/AppLoadingScreen';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setPreselectedService(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0B] font-cairo antialiased selection:bg-[#ed2979] selection:text-white dir-rtl" id="top">
      
      {/* Precision Loading Screen matching aikawakenichi.com tech spec */}
      <AppLoadingScreen onLoaded={handleLoaded} />

      {/* Sticky Header */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenVendorModal={() => setVendorModalOpen(true)}
      />

      <main>
        {/* Section 1: Hero Header with Fracture assemble canvas reveal */}
        <HeroSection
          isLoaded={isLoaded}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          onOpenVendorModal={() => setVendorModalOpen(true)}
        />

        {/* Section 2: About Us */}
        <AboutSection />

        {/* Section 3: How It Works */}
        <HowItWorksSection />

        {/* Section 4: Services */}
        <ServicesSection
          onSelectServiceForQuote={(title) => handleOpenQuoteModal(title)}
        />

        {/* Section 6: Client Reviews */}
        <ReviewsSection />

        {/* Section 7: FAQ */}
        <FAQSection
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenVendorModal={() => setVendorModalOpen(true)}
      />

      {/* Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={preselectedService}
      />

      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <VendorModal
        isOpen={vendorModalOpen}
        onClose={() => setVendorModalOpen(false)}
      />

    </div>
  );
}

