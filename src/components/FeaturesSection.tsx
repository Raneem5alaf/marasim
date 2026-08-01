import React from 'react';
import { FEATURES_DATA } from '../data/marasimData';
import { AppSimulator } from './AppSimulator';
import { ShieldCheck, MessageSquare, Bell, CreditCard } from 'lucide-react';

interface FeaturesProps {
  onOpenDownloadModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesProps> = ({ onOpenDownloadModal }) => {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'contracts':
        return <ShieldCheck className="w-5 h-5 text-white" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-white" />;
      case 'notifications':
        return <Bell className="w-5 h-5 text-white" />;
      case 'payments':
        return <CreditCard className="w-5 h-5 text-white" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-[#0A0A0B] text-white font-ibm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 font-mono-code text-xs font-semibold tracking-wider text-[#ff85b3] bg-[#ed2979]/20 px-4 py-1.5 rounded-full uppercase" dir="ltr">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed2979]" />
            <span>المميزات الأساسية</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-baloo text-white">
            كل ما تحتاجه لمناسبة بلا قلق
          </h2>
          <p className="text-[#b9b9bd] text-base leading-relaxed">
            أدوات مصمّمة لحماية الطرفين وتسريع كل خطوة.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-16 border border-white/10">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#131315] p-8 hover:bg-[#1a1a1d] transition-colors group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ed2979] to-[#0091ad] flex items-center justify-center mb-6 shadow-md">
                  {getFeatureIcon(feature.id)}
                </div>
                <h4 className="font-baloo font-bold text-xl text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#a9a9ad] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive App Simulator Feature Preview */}
        <div className="bg-[#131315] border border-white/10 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-2 font-mono-code text-xs font-semibold tracking-wider text-[#0091ad] bg-[#0091ad]/20 px-3.5 py-1 rounded-full">
                <span>معاينة تفاعلية للتطبيق</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-baloo text-white">
                تجربة مستخدم بلمسة زفافية فاخرة
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                جرب محاكاة التطبيق التفاعلي: يمكنك تصفح العروض، مراجعة ببنود العقد الإلكتروني، والتحدث المباشر مع مزودي الخدمة مباشرةً هنا.
              </p>
              <button
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ed2979] hover:bg-[#c81e63] text-white font-bold text-sm transition-all"
              >
                <span>حمّل التطبيق واكتشف المزيد</span>
              </button>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <AppSimulator />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
