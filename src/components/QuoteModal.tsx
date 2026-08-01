import React, { useState } from 'react';
import { CITIES, SERVICES_DATA } from '../data/marasimData';
import { QuoteFormData } from '../types';
import { X, CheckCircle, Sparkles, Calendar, MapPin, Users, DollarSign, Send, ArrowLeft } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    eventType: preselectedService || SERVICES_DATA[0].title,
    city: 'الرياض',
    guestCount: '100 - 250 شخص',
    budget: '15,000 - 30,000 ر.س',
    date: '',
    name: '',
    phone: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else {
      // Complete submission
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 text-right relative animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ed2979]" />
              <h3 className="text-xl font-bold font-cairo">طلب عرض سعر مباشر</h3>
            </div>
            <p className="text-xs text-gray-400">احصل على عروض مخصصة من أفضل مزودي الخدمات</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        {step <= 3 && (
          <div className="bg-gray-100 h-1.5 w-full">
            <div
              className="bg-[#ed2979] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Event Type & City */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ed2979]" />
                  <span>اختر نوع المناسبة</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, eventType: srv.title })}
                      className={`p-3 rounded-xl border text-xs font-bold text-right transition-all cursor-pointer ${
                        formData.eventType === srv.title
                          ? 'border-[#ed2979] bg-[#ed2979]/10 text-[#ed2979]'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {srv.title}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: 'مناسبة خاصة مخصصة' })}
                    className={`p-3 rounded-xl border text-xs font-bold text-right transition-all cursor-pointer ${
                      formData.eventType === 'مناسبة خاصة مخصصة'
                        ? 'border-[#ed2979] bg-[#ed2979]/10 text-[#ed2979]'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    مناسبة خاصة مخصصة
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0091ad]" />
                  <span>المدينة المقامة بها الفعالية</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#ed2979]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ed2979] hover:bg-[#d61e67] text-white font-bold text-sm transition-colors cursor-pointer"
              >
                المتابعة (الخطوة 2 من 3)
              </button>
            </form>
          )}

          {/* Step 2: Budget & Guest Count */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0091ad]" />
                  <span>عدد الحضور المتوقع</span>
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#ed2979]"
                >
                  <option value="أقل من 50 شخص">أقل من 50 شخص (حفل مصغر)</option>
                  <option value="50 - 100 شخص">50 - 100 شخص</option>
                  <option value="100 - 250 شخص">100 - 250 شخص</option>
                  <option value="250 - 500 شخص">250 - 500 شخص</option>
                  <option value="أكثر من 500 شخص">أكثر من 500 شخص (مؤتمر ضخم)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#ed2979]" />
                  <span>الميزانية التقديرية (ر.س)</span>
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#ed2979]"
                >
                  <option value="5,000 - 15,000 ر.س">5,000 - 15,000 ر.س</option>
                  <option value="15,000 - 30,000 ر.س">15,000 - 30,000 ر.س</option>
                  <option value="30,000 - 60,000 ر.س">30,000 - 60,000 ر.س</option>
                  <option value="أكثر من 60,000 ر.س">أكثر من 60,000 ر.س (VIP)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-600" />
                  <span>تاريخ المناسبة المتوقع</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#ed2979]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
                >
                  السابق
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-[#ed2979] hover:bg-[#d61e67] text-white font-bold text-xs cursor-pointer"
                >
                  المتابعة لبيانات التواصل
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Name & Phone */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800">الاسم الكريم</label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الثلاثي"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#ed2979]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800">رقم الجوال (لإرسال العروض)</label>
                <input
                  type="tel"
                  placeholder="05XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#ed2979]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800">تفاصيل إضافية (اختياري)</label>
                <textarea
                  rows={2}
                  placeholder="اكتب أي ملاحظات أو أفكار خاصة لديكور القاعة أو الألوان..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAFAFC] border border-gray-200 p-3 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#ed2979]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
                >
                  السابق
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 rounded-xl bg-[#ed2979] hover:bg-[#d61e67] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال وتلقي العروض فوراً</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success Confirmation */}
          {step === 4 && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black font-cairo text-gray-900">
                  تم استلام طلبك بنجاح!
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  شكراً لك يا <span className="font-bold text-gray-900">{formData.name}</span>. سيقوم أفضل 3 مزودي خدمات في مدينة <span className="font-bold text-[#ed2979]">{formData.city}</span> بإرسال عروضهم المخصصة لرقمك خلال الساعات القادمة.
                </p>
              </div>

              <div className="bg-[#FAFAFC] p-4 rounded-2xl border border-gray-200 text-xs text-right space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">نوع الفعالية:</span>
                  <span className="font-bold text-gray-800">{formData.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الميزانية:</span>
                  <span className="font-bold text-[#ed2979]">{formData.budget}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs cursor-pointer"
              >
                تم، إغلاق النافذة
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
