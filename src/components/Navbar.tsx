import React, { useState, useEffect } from 'react';
import { MarasimLogo } from './MarasimLogo';
import { Menu, X, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenDownloadModal: () => void;
  onOpenVendorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownloadModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'عن مراسم', href: '#about' },
    { name: 'كيف تعمل', href: '#how' },
    { name: 'الخدمات', href: '#services' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 font-cairo ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2.5 sm:py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100/80 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-12 sm:h-14">
          
          {/* Brand Logo (Right in RTL) */}
          <a href="#" className="flex items-center focus:outline-none shrink-0">
            <MarasimLogo size="md" />
          </a>

          {/* Desktop Navigation Links (Middle) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-900 hover:text-pink-600 text-base font-bold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Button (Left in RTL) */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
            >
              <span>تحميل التطبيق</span>
              <Smartphone className="w-4 h-4 text-pink-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 bg-white rounded-2xl shadow-xl border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 text-right">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-900 hover:text-pink-600 text-base font-bold py-1.5 transition-colors border-b border-slate-50 last:border-none"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-slate-900"
              >
                <span>تحميل التطبيق</span>
                <Smartphone className="w-4 h-4 text-pink-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

