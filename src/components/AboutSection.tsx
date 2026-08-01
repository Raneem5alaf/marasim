import React from 'react';
import { ABOUT_DATA } from '../data/marasimData';
import { MarasimIconMark } from './MarasimLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50/60 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Right: Section Text */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              من نحن
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>{ABOUT_DATA.content}</p>
              {ABOUT_DATA.subcontent && <p>{ABOUT_DATA.subcontent}</p>}
            </div>
          </div>

          {/* Left: Pillars Stack */}
          <div className="space-y-4">
            
            {/* Pillar 1 */}
            <div className="flex gap-4 items-start bg-white border border-black/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#fdeaf1] text-[#c81e63] flex items-center justify-center">
                <MarasimIconMark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-baloo font-bold text-lg text-[#0A0A0B] mb-1">
                  {ABOUT_DATA.pillars[0].title}
                </h4>
                <p className="text-sm text-[#3A3A3D] leading-relaxed">
                  {ABOUT_DATA.pillars[0].desc}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4 items-start bg-white border border-black/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#e6f5f8] text-[#00728a] flex items-center justify-center">
                <MarasimIconMark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-baloo font-bold text-lg text-[#0A0A0B] mb-1">
                  {ABOUT_DATA.pillars[1].title}
                </h4>
                <p className="text-sm text-[#3A3A3D] leading-relaxed">
                  {ABOUT_DATA.pillars[1].desc}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4 items-start bg-white border border-black/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0A0A0B] text-white flex items-center justify-center">
                <MarasimIconMark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-baloo font-bold text-lg text-[#0A0A0B] mb-1">
                  {ABOUT_DATA.pillars[2].title}
                </h4>
                <p className="text-sm text-[#3A3A3D] leading-relaxed">
                  {ABOUT_DATA.pillars[2].desc}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
