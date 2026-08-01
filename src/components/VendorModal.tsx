import React, { useState } from 'react';
import { X, Building2, CheckCircle2, Send, Shield, Award } from 'lucide-react';
import { CITIES } from '../data/marasimData';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    commercialReg: '',
    serviceType: 'تنظيم زواجات ومناسبات',
    city: 'الرياض',
    contactName: '',
    phone: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-ibm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f5f8] text-[#0091ad] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold font-baloo text-[#0A0A0B]">
              تم استلام طلب الانضمام بنجاح!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
              شكراً لرغبتك بالانضمام كمزوّد خدمة معتمد في منصة مراسم. سيتواصل معك فريق العلاقات والتحقق خلال 24 ساعة لمراجعة السجل التجاري واعتماد حسابك.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#0A0A0B] text-white font-bold text-sm"
            >
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-right">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#e6f5f8] text-[#00728a] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold font-baloo text-[#0A0A0B]">
                  تسجيل مزوّد خدمة جديد
                </h3>
                <p className="text-xs text-gray-500">
                  انضم لنخبة الشركات واستقبل طلبات المناسبات في مدينتك
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  اسم الشركة / المؤسسة *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شركة المراسم الملكية لتنظيم الفعاليات"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] focus:ring-1 focus:ring-[#ed2979] outline-hidden text-right"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    رقم السجل التجاري *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1010xxxxxx"
                    value={formData.commercialReg}
                    onChange={(e) => setFormData({ ...formData, commercialReg: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] outline-hidden text-right font-mono-code text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    المدينة الرئيسية *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] outline-hidden text-right bg-white"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  تخصص الخدمات الرئيسي *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] outline-hidden text-right bg-white"
                >
                  <option value="تنظيم زواجات ومناسبات">تنسيق وتنظيم زواجات ومناسبات</option>
                  <option value="تنظيم مؤتمرات ومعارض">تنظيم مؤتمرات ومعارض شركات</option>
                  <option value="تجهيز شاشات وإضاءة وصوت">تجهيز شاشات LED، إضاءة وأنظمة صوت</option>
                  <option value="ضيافة وبوفيهات">خدمات ضيافة وبوفيهات فاخرة</option>
                  <option value="تنسيق ورد وكوش">تنسيق زهور وكوش ومسارح</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    اسم المسؤول *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] outline-hidden text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    رقم الجوال (واتساب) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ed2979] outline-hidden text-right font-mono-code text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#fdeaf1] p-3.5 rounded-xl text-xs text-[#c81e63] font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0 text-[#ed2979]" />
              <span>جميع الشركات يخضع تسجيلها للتحقق المالي والقانوني لضمان جودة المنصة.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#ed2979] hover:bg-[#c81e63] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال طلب الانضمام</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
