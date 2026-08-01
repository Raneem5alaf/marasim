import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/marasimData';
import { ServiceItem } from '../types';
import { Heart, GraduationCap, Briefcase, Sparkles, ArrowLeft, CheckCircle, X } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FAFAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl text-right">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              حلول متكاملة لكل أبعاد مناسبتك
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-normal">
              نجمع أفضل الخبراء ومزودي الخدمات لنضمن لك تجربة احتفالية فريدة خالية من التوتر.
            </p>
          </div>


        </div>

        {/* Orchid Style Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-[#ed2979] shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image & Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md text-[#ed2979] flex items-center justify-center shadow-md group-hover:bg-[#ed2979] group-hover:text-white transition-colors duration-300">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-right space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-cairo text-gray-900 mb-2 group-hover:text-[#ed2979] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-gray-100 text-[11px] font-medium text-gray-600 group-hover:bg-[#ed2979]/10 group-hover:text-[#ed2979] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 text-right relative">
            
            {/* Modal Header Image */}
            <div className="relative h-64">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 right-6 text-white space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ed2979] text-xs font-bold">
                  {selectedService.subtitle}
                </div>
                <h3 className="text-3xl font-black font-cairo">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">الوصف المتكامل</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">ماذا تشمل هذه الخدمة؟</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#FAFAFC] p-3 rounded-xl border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-[#ed2979] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-gray-800">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>

          </div>
        </div>
      )}

    </section>
  );
};
