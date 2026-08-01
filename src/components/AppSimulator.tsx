import React, { useState } from 'react';
import { FileCheck, ShieldCheck, MessageSquare, Send, CheckCircle2, Lock, ArrowRight, Star, Clock } from 'lucide-react';
import { MarasimLogo } from './MarasimLogo';

export const AppSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contracts' | 'payments' | 'chat'>('contracts');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'vendor', text: 'أهلاً بك! شركة الفخامة للضيافة يسعدها تنفيذ كوشة زفافك بالطراز الأندلسي.', time: '10:42 ص' },
    { sender: 'user', text: 'أهلاً بكم، هل العقد يتضمن تفاصيل الزهور الطبيعية والإضاءة البقعية؟', time: '10:43 ص' },
    { sender: 'vendor', text: 'بالتأكيد! تم إضافة كراسة المواصفات بالكامل داخل العقد الإلكتروني بالمنصة.', time: '10:44 ص' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} ص`;
    setChatMessages(prev => [...prev, { sender: 'user', text: inputMsg, time: timeStr }]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'vendor', text: 'ممتاز! يمكنك توثيق العقد ودفع العربون الآن بكل أمان.', time: timeStr }
      ]);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-800 max-w-sm sm:max-w-md mx-auto">
      
      {/* Smartphone Mockup Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
        <div className="flex items-center gap-2">
          <MarasimLogo colorScheme="white" size="sm" />
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] text-gray-400 font-medium">تطبيق مراسيم المباشر</span>
        </div>
      </div>

      {/* Simulator Feature Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-900 rounded-xl mb-4 border border-gray-800">
        <button
          onClick={() => setActiveTab('contracts')}
          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'contracts' ? 'bg-[#ed2979] text-white shadow-xs' : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>عقد موثق</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'payments' ? 'bg-[#ed2979] text-white shadow-xs' : 'text-gray-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>دفع آمن</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'chat' ? 'bg-[#ed2979] text-white shadow-xs' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>المحادثة</span>
        </button>
      </div>

      {/* Screen Content Window */}
      <div className="bg-gray-900/90 rounded-2xl p-4 min-h-[340px] flex flex-col justify-between border border-gray-800 text-right">
        
        {/* Tab 1: Contracts Screen */}
        {activeTab === 'contracts' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-emerald-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>عقد رقمي موثق #MR-9042</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-md">موقع إلكترونياً</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">مزود الخدمة:</span>
                <span className="font-bold text-white">شركة الرؤية الملكية للفعاليات</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">نوع المناسبة:</span>
                <span className="font-bold text-white">تنسيق زفاف متكامل</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">موعد التنفيذ:</span>
                <span className="font-bold text-white">15 أكتوبر 2024</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">قيمة التعاقد:</span>
                <span className="font-bold text-[#ed2979]">28,500 ر.س</span>
              </div>
            </div>

            <div className="bg-gray-800/60 p-3 rounded-xl border border-gray-700/50 space-y-1 text-[11px] text-gray-300">
              <div className="font-bold text-white flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#0091ad]" />
                <span>شرط حماية العربون (48 ساعة)</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                يضمن هذا العقد استرجاع العربون كاملاً عند الإلغاء خلال 48 ساعة وفق سياسة المنصة المعتمدة.
              </p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>تحميل نسخة العقد PDF</span>
            </button>
          </div>
        )}

        {/* Tab 2: Payments Screen */}
        {activeTab === 'payments' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center space-y-1">
              <div className="text-[11px] text-gray-400">المبلغ الإجمالي الموثق</div>
              <div className="text-2xl font-black font-cairo text-white">12,000 ر.س</div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0091ad]/20 text-[#0091ad] text-[10px] font-bold">
                <Lock className="w-3 h-3" />
                <span>دفع معلق في الحساب الضامن</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-3 h-3 rounded-full bg-[#ed2979]" />
                  دفع العربون (30%)
                </span>
                <span className="font-bold text-white">3,600 ر.س</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-800/40 border border-gray-800 flex items-center justify-between opacity-60">
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  الدفعة النهائية (بعد التنفيذ)
                </span>
                <span className="font-bold text-gray-400">8,400 ر.س</span>
              </div>
            </div>

            {/* Payment Methods Badges */}
            <div className="pt-2 border-t border-gray-800 space-y-2">
              <div className="text-[10px] text-gray-400">وسائل الدفع المعتمدة</div>
              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                <div className="p-1.5 rounded-lg bg-gray-800 text-gray-200">مدى</div>
                <div className="p-1.5 rounded-lg bg-gray-800 text-gray-200">Apple Pay</div>
                <div className="p-1.5 rounded-lg bg-gray-800 text-gray-200">Visa</div>
                <div className="p-1.5 rounded-lg bg-gray-800 text-gray-200">MasterCard</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Chat Screen */}
        {activeTab === 'chat' && (
          <div className="flex flex-col justify-between h-[300px] animate-in fade-in duration-300">
            {/* Vendor Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-800 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#ed2979] text-white flex items-center justify-center font-bold">
                م
              </div>
              <div>
                <div className="font-bold text-white">مزود الخدمة: رويال دبلومات</div>
                <div className="text-[9px] text-emerald-400">متصل الآن - استجابة سريعة</div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 py-3 overflow-y-auto space-y-2 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'mr-auto text-left items-end' : 'ml-auto text-right items-start'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-2xl text-[11px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#ed2979] text-white rounded-br-xs'
                        : 'bg-gray-800 text-gray-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 pt-2 border-t border-gray-800">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="اكتب استفسارك للشركة..."
                className="flex-1 bg-gray-800 text-white text-xs px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-[#ed2979]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#ed2979] hover:bg-[#d61e67] text-white transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
