import React from 'react';
import { HOW_IT_WORKS_DATA } from '../data/marasimData';

export const HowItWorksSection: React.FC = () => {
  const steps = HOW_IT_WORKS_DATA.clientSteps;

  return (
    <section id="how" className="py-20 bg-slate-50/50 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            {HOW_IT_WORKS_DATA.heading}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {HOW_IT_WORKS_DATA.subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              {/* Step Number Circle */}
              <div className="w-10 h-10 rounded-full bg-[#ed2979] text-white font-bold text-base flex items-center justify-center mb-5 shadow-sm">
                {step.num}
              </div>

              <h3 className="font-bold text-xl text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
