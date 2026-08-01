import React from 'react';
import { MarasimLogo } from './MarasimLogo';
import { X, Smartphone, QrCode, ShieldCheck, Check } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 text-right relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MarasimLogo colorScheme="white" size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black font-cairo text-gray-900">
              حمل تطبيق مراسيم الآن
            </h3>
            <p className="text-xs text-gray-600">
              استمتع بالتواصل المباشر مع شركات الحفلات، توثيق العقود، وإدارة الدفع بكل أمان.
            </p>
          </div>

          {/* Simulated QR Code Box */}
          <div className="bg-[#FAFAFC] p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-3">
            <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-200">
              <QrCode className="w-28 h-28 text-gray-900" />
            </div>
            <div className="text-xs font-bold text-gray-700">
              امسح الرمز بكاميرا جوالك للتحميل المباشر
            </div>
          </div>

          {/* Direct Store Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* App Store */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('جاري توجيهك إلى متجر App Store لتطبيق مراسيم');
              }}
              className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-[#ed2979] text-white hover:bg-[#d61e67] transition-colors font-bold text-xs shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.31c.64-.78 1.08-1.85.96-2.93-.93.04-2.07.62-2.74 1.4-.6.7-1.12 1.81-.98 2.88 1.05.08 2.12-.57 2.76-1.35z"/>
              </svg>
              <div className="text-right">
                <div className="text-[9px] opacity-80">تحميل للأيفون</div>
                <div>App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('جاري توجيهك إلى متجر Google Play لتطبيق مراسيم');
              }}
              className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-black text-white hover:bg-gray-900 transition-colors font-bold text-xs shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.23,23.09 5.54,23.13 5.86,23.04C6.18,22.95 6.47,22.75 6.68,22.47L16.81,15.12M16.81,8.88L6.68,1.53C6.47,1.25 6.18,1.05 5.86,0.96C5.54,0.87 5.23,0.91 4.96,1.08L14.81,10.88L16.81,8.88M20.53,10.74L17.93,12.24L15.93,10.24L17.93,8.24L20.53,9.74C21.15,10.1 21.15,10.38 20.53,10.74Z"/>
              </svg>
              <div className="text-right">
                <div className="text-[9px] opacity-80">تحميل للأندرويد</div>
                <div>Google Play</div>
              </div>
            </a>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>تطبيق آمن ومعتمد من الجهات المختصة في المملكة</span>
          </div>
        </div>

      </div>
    </div>
  );
};
