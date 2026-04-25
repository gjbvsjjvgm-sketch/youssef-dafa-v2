import React from 'react';
import { getBranding } from '@/lib/brandingSystem';
import { Lock, Globe } from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
}

/**
 * SADAD Official Layout Clone (1:1 sadad.com)
 */
export const SadadLayout: React.FC<CompanyLayoutProps> = ({ children, amount }) => {
  const branding = getBranding('sadad');
  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <header className="bg-white border-b-[1px] border-[#D1D1D1] h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <img src={branding.logoUrl} alt="SADAD" className="h-10" />
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[#9D9D9C] text-sm font-bold">
               <Globe className="w-4 h-4" />
               <span>English</span>
             </div>
             <div className="bg-[#EF7622] text-white px-6 py-2 text-sm font-bold cursor-pointer">
               تسجيل الدخول
             </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-[#F9F9F9] border border-[#D1D1D1] p-8">
          <div className="flex justify-between items-center mb-8 border-b border-[#D1D1D1] pb-4">
            <h1 className="text-2xl font-bold text-[#333333]">سداد للمدفوعات</h1>
            <div className="text-right">
              <span className="block text-xs text-[#9D9D9C]">المبلغ المطلوب</span>
              <span className="text-2xl font-bold text-[#EF7622]">{amount}</span>
            </div>
          </div>
          {children}
        </div>
      </main>
      <footer className="bg-[#333333] text-white py-6">
        <div className="container mx-auto px-4 text-center text-xs">
          جميع الحقوق محفوظة لنظام سداد للمدفوعات © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

/**
 * DHL Official Layout Clone (1:1 dhl.com)
 */
export const DHLLayout: React.FC<CompanyLayoutProps> = ({ children, amount }) => {
  const branding = getBranding('dhl');
  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <header className="bg-[#FFCC00] h-16 border-b-4 border-[#D40511]">
        <div className="container mx-auto px-4 h-full flex items-center">
          <img src={branding.logoUrl} alt="DHL" className="h-8" />
        </div>
      </header>
      <main className="flex-1">
        <div className="bg-[#F3F3F3] py-10">
          <div className="container mx-auto px-4 max-w-3xl bg-white p-10 border border-[#E6E6E6] shadow-none">
            <h2 className="text-3xl font-black text-[#D40511] mb-6 uppercase">Secure Payment</h2>
            <div className="bg-[#FFCC00]/10 p-4 border-r-4 border-[#FFCC00] mb-8">
              <p className="text-sm font-bold">إجمالي المبلغ المستحق للدفع: <span className="text-xl text-[#D40511]">{amount}</span></p>
            </div>
            {children}
          </div>
        </div>
      </main>
      <footer className="bg-[#1A1A1A] text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
          <span>Deutsche Post DHL Group</span>
          <div className="flex gap-4">
            <span>Fraud Awareness</span>
            <span>Legal Notice</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * KNET Official Layout Clone (1:1 knet.com.kw)
 */
export const KNETLayout: React.FC<CompanyLayoutProps> = ({ children, amount }) => {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <header className="bg-white border-b-2 border-[#008080] h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <img src="/assets/branding/logo-knet.png" alt="KNET" className="h-12" />
          <div className="flex items-center gap-2 text-[#008080] font-bold text-sm">
             <Lock className="w-4 h-4" />
             <span>Secure Checkout</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden border border-[#D1D1D1]">
          <div className="bg-[#008080] p-4 text-white text-center">
            <h3 className="font-bold">بوابة الدفع الإلكترونية</h3>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 text-sm border-b pb-4">
              <span className="text-gray-500">مبلغ الفاتورة:</span>
              <span className="text-lg font-bold text-[#E31B23]">{amount}</span>
            </div>
            {children}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-[10px] text-gray-400">
        © {new Date().getFullYear()} Shared Electronic Banking Services Company (KNET)
      </footer>
    </div>
  );
};

export const getCompanyLayout = (companyKey: string) => {
  const key = companyKey.toLowerCase();
  if (key === 'sadad') return SadadLayout;
  if (key === 'dhl') return DHLLayout;
  if (key === 'knet') return KNETLayout;
  return SadadLayout;
};

export default { SadadLayout, DHLLayout, KNETLayout, getCompanyLayout };
