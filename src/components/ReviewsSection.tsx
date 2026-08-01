import React from 'react';
import { REVIEWS_DATA } from '../data/marasimData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#FBFBFA] font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            رأي عملاءنا
          </h2>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-black/10 rounded-2xl p-7 flex flex-col justify-between gap-6 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="text-[#ed2979] text-sm tracking-widest text-right" dir="ltr">
                  ★★★★★
                </div>
                <p className="text-base text-[#0A0A0B] font-medium leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                <div
                  className={`w-11 h-11 rounded-full ${review.avatarBg || 'bg-[#ed2979]'} text-white font-baloo font-bold text-lg flex items-center justify-center shrink-0`}
                >
                  {review.avatar}
                </div>
                <div>
                  <b className="block text-sm font-bold text-[#0A0A0B] font-baloo">
                    {review.name}
                  </b>
                  <span className="text-xs text-[#3A3A3D]">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
