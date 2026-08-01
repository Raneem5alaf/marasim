import React from 'react';
import { HERO_DATA } from '../data/marasimData';
import { motion } from 'motion/react';
import { FragmentedHeroCanvas } from './FragmentedHeroCanvas';
import { MarasimLogo } from './MarasimLogo';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onOpenDownloadModal: () => void;
  onOpenVendorModal?: () => void;
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroProps> = ({
  isLoaded = true,
}) => {
  // Words for staggered reveal effect
  const headlineWords = [
    { type: 'text', value: 'لمناسبتك..' },
    { type: 'logo', value: 'logo' },
    { type: 'text', value: 'تليقُ' },
    { type: 'text', value: 'بها' },
  ];

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-20 overflow-hidden font-cairo" id="top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Subtle Aesthetic Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50/80 border border-pink-100 text-pink-700 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>المنصة الأولى لتنظيم الفعاليات والمناسبات</span>
            </motion.div>

            {/* Main Headline with Logo embedded */}
            <h1 className="text-2xl sm:text-3xl lg:text-4.5xl font-extrabold text-slate-900 leading-tight flex flex-wrap items-center gap-x-3 gap-y-2 [text-shadow:_0_2px_12px_rgba(0,0,0,0.06)]">
              {headlineWords.map((item, idx) => {
                if (item.type === 'logo') {
                  return (
                    <span key={idx} className="relative overflow-hidden inline-flex items-center py-1">
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isLoaded ? { y: '0%', opacity: 1 } : {}}
                        transition={{
                          duration: 0.45,
                          delay: 0.2 + idx * 0.08,
                          ease: [0.104, 0.204, 0.492, 1],
                        }}
                        className="inline-flex items-center"
                      >
                        <MarasimLogo size="lg" className="h-9 sm:h-11 lg:h-13 -my-1" />
                      </motion.span>
                    </span>
                  );
                }

                return (
                  <span key={idx} className="relative overflow-hidden inline-block py-1">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={isLoaded ? { y: '0%', opacity: 1 } : {}}
                      transition={{
                        duration: 0.45,
                        delay: 0.2 + idx * 0.08,
                        ease: [0.104, 0.204, 0.492, 1],
                      }}
                      className="inline-block text-slate-900"
                    >
                      {item.value}
                    </motion.span>
                  </span>
                );
              })}
            </h1>

            {/* Lead Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl border-r-2 border-pink-200 pr-4"
            >
              {HERO_DATA.subheadline}
            </motion.p>

          </div>

          {/* Left Column: Canvas Shatter/Fragmented Visual Showcase */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[460px]">
            <FragmentedHeroCanvas isLoaded={isLoaded} />
          </div>

        </div>
      </div>
    </section>
  );
};

