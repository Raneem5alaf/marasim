import React, { useState } from 'react';
import { FAQ_DATA } from '../data/marasimData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQProps {
  onOpenQuoteModal?: () => void;
}

export const FAQSection: React.FC<FAQProps> = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Title & Badge) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 text-right">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              الأسئلة الشائعة
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg font-cairo leading-relaxed max-w-md">
              جمعنا لك الإجابات المباشرة عن أكثر الاستفسارات وروداً من عملائنا ومزودي الخدمات لتنظيم مناسبتك بكل سهولة.
            </p>
          </div>

          {/* Right Column (Accordion Cards) */}
          <div className="lg:col-span-7 space-y-3.5 text-right">
            {FAQ_DATA.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#f8fafc] border-2 border-[#2563eb] shadow-sm'
                      : 'bg-[#f3f4f6] hover:bg-[#e9ecef] border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl font-bold font-cairo text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className="shrink-0 text-slate-800">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-900" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-700" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-slate-600 text-base font-cairo leading-relaxed pt-1">
                          <p className="border-t border-slate-200/60 pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

