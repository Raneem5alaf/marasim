import React from 'react';
import { POLICY_DATA } from '../data/marasimData';
import { Clock, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';

export const PolicySection: React.FC = () => {
  return (
    <section id="policy" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Policy Box */}
        <div className="bg-gradient-to-br from-[#FAFAFC] via-white to-[#F4F4F9] rounded-3xl p-8 sm:p-14 border border-gray-200/90 shadow-lg text-right">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right Column: Policy Explanation */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ed2979]/10 text-[#ed2979] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>الضمان والتزامات الخدمة</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-cairo text-gray-900 tracking-tight">
                {POLICY_DATA.title}
              </h2>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {POLICY_DATA.content}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>استرجاع تلقائي للمحفظة أو الحساب البنكي</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#0091ad]" />
                  <span>توثيق رسمي بالبند في العقود الإلكترونية</span>
                </div>
              </div>

            </div>

            {/* Left Column: Visual Timeline Card */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Timeline Step 1: 0-48 Hours */}
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500/30 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>نافذة المرونة الكاملة (0 - 48 ساعة)</span>
                    </div>
                    <div className="text-lg font-bold font-cairo text-emerald-600">
                      استرجاع العربون 100%
                    </div>
                    <p className="text-xs text-gray-600">
                      يمكنك الإلغاء بزر واحد عبر التطبيق واستعادة المبلغ كاملاً بدون أسئلة.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0">
                    مضمون
                  </span>
                </div>
              </div>

              {/* Timeline Step 2: After 48 Hours */}
              <div className="bg-white p-6 rounded-2xl border-2 border-amber-500/30 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>بعد انقضاء 48 ساعة من التأكيد</span>
                    </div>
                    <div className="text-lg font-bold font-cairo text-amber-600">
                      التزام بالتجهيزات الفعلية
                    </div>
                    <p className="text-xs text-gray-600">
                      يتعذر استرجاع العربون لبدء المزود في شراء الورد والحجوزات الخاصة.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0">
                    التزام مزود
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
