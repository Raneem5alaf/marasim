import React, { useState } from 'react';
import { MarasimLogo } from './MarasimLogo';
import { X, Mail, Phone, ExternalLink, ShieldCheck, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onOpenDownloadModal: () => void;
  onOpenVendorModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuoteModal,
  onOpenDownloadModal,
  onOpenVendorModal,
}) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'refund' | 'privacy' | null>(null);

  return (
    <footer className="bg-white py-5 sm:py-6 border-t border-slate-100 font-cairo text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal 3-Column Tighter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start text-xs sm:text-sm">
          
          {/* Column 1: Contact / Email */}
          <div className="space-y-1 text-slate-600 leading-relaxed font-normal">
            <p className="font-bold text-slate-900">منصة مراسم الرقمية</p>
            <p>
              <a 
                href="mailto:support@marasem.app" 
                className="hover:text-pink-600 transition-colors font-medium text-slate-600"
                dir="ltr"
              >
                support@marasem.app
              </a>
            </p>
          </div>

          {/* Column 2: Core Links */}
          <div>
            <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
              <li>
                <a href="#about" className="hover:text-pink-600 transition-colors inline-block">
                  عن مراسم
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-pink-600 transition-colors inline-block">
                  كيف تعمل المنصة
                </a>
              </li>

              <li>
                <a href="#testimonials" className="hover:text-pink-600 transition-colors inline-block">
                  آراء العملاء
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Secondary & Legal Links */}
          <div>
            <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">

              <li>
                <button
                  onClick={() => setActiveModal('refund')}
                  className="hover:text-pink-600 transition-colors text-right cursor-pointer"
                >
                  سياسة الإلغاء والاسترجاع
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-pink-600 transition-colors text-right cursor-pointer"
                >
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-pink-600 transition-colors text-right cursor-pointer"
                >
                  الشروط والأحكام
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-slate-400 font-normal">
          <div className="flex items-center gap-2">
            <MarasimLogo size="sm" />
            <span>© 2026 مراسم. جميع الحقوق محفوظة.</span>
          </div>
        </div>

      </div>

      {/* MODAL: Cancellation & Refund Policy */}
      {activeModal === 'refund' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#fdeaf1] text-[#c81e63] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold font-baloo text-[#0A0A0B]">
                  سياسة الإلغاء والاسترجاع
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#3A3A3D] leading-relaxed">
              <p className="font-medium text-gray-800">
                حرصاً من منصة <span className="text-[#ed2979] font-bold">مراسم</span> على حفظ حقوق جميع الأطراف وتوفير بيئة حجز مرنة وآمنة، نعتمد سياسة الإلغاء والاسترجاع التالية:
              </p>

              {/* Box 1: 0 - 48 Hours */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold font-baloo text-base">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>الإلغاء خلال 48 ساعة من الحجز (استرجاع 100%)</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  يحق للعميل إلغاء الحجز مجاناً خلال أول 48 ساعة من تأكيد الطلب، والحصول على استرداد كامل للمبلغ المدفوع (100%) تلقائياً وبدون أي خصومات أو رسوم إدارية.
                </p>
              </div>

              {/* Box 2: After 48 Hours */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold font-baloo text-base">
                  <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>الإلغاء بعد انقضاء 48 ساعة</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  في حال الإلغاء بعد 48 ساعة، يُطبق العقد الإلكتروني الموثق بين الطرفين. يُخصم فقط التكاليف الفعلية المثبتة التي تكبدها مزود الخدمة (مثل حجز القاعات والتوريدات الخاصة)، ويُسترد باقي المبلغ للحساب.
                </p>
              </div>

              {/* Box 3: Automated Payout */}
              <div className="p-4 bg-[#F2F1EE] border border-black/10 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[#0A0A0B] font-bold font-baloo text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#0091ad] shrink-0" />
                  <span>آلية تحويل المبالغ المستردة</span>
                </div>
                <p className="text-xs text-[#3A3A3D] leading-relaxed">
                  تُعاد المبالغ المستردة مباشرةً إلى وسيلة الدفع الأصلية (بطاقة مدى، Apple Pay، أو محفظتك الإلكترونية) خلال 3 إلى 7 أيام عمل من تاريخ رفع طلب الإلغاء عبر التطبيق.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-full bg-[#0A0A0B] hover:bg-black text-white font-bold text-sm transition-colors"
            >
              فهمت السياسة
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Terms */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-7 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl text-right">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-xl font-bold font-baloo text-[#0A0A0B]">الشروط والأحكام</h3>
              <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-[#3A3A3D] space-y-3 leading-relaxed">
              <p>باستخدامك تطبيق مراسم، فإنك توافق على تنظيم كافة التعاملات بين أصحاب المناسبات ومزوّدي الخدمة داخل التطبيق حصرًا، بما يشمل التواصل، العروض، العقود، والمدفوعات.</p>
              <p>يلتزم مزوّد الخدمة بتنفيذ الخدمة وفق تفاصيل العرض المعتمد والعقد الموقّع إلكترونيًا. كما يلتزم العميل بسداد المستحقات المالية وفق شروط الدفع المتفق عليها ضمن العرض.</p>
              <p>تحتفظ منصة مراسم بحق تعليق أي حساب يخالف هذه الشروط أو يحاول تجاوز قنوات التواصل والدفع المعتمدة داخل التطبيق.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Privacy Policy */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-7 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl text-right">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-xl font-bold font-baloo text-[#0A0A0B]">سياسة الخصوصية</h3>
              <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-[#3A3A3D] space-y-3 leading-relaxed">
              <p>نحرص في مراسم على حماية بياناتك الشخصية ومعلومات مناسبتك، ولا نشارك أرقام التواصل بين الأطراف خارج التطبيق حفاظًا على خصوصية الجميع.</p>
              <p>تُستخدم بياناتك فقط لتقديم الخدمة وتحسين تجربتك، ولا تُباع أو تُشارك مع أي جهة خارجية دون موافقتك الصريحة.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
