import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { 
  Package, 
  Truck, 
  Clock, 
  Shield, 
  CreditCard,
  ChevronRight,
  Globe,
  Lock
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
}

const BaseLayout: React.FC<CompanyLayoutProps> = ({ children, companyKey, trackingNumber, amount }) => {
  const branding = getBrandingByCompany(companyKey) || getBrandingByCompany('aramex')!;
  
  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Official Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={branding.logoUrl} alt={branding.nameEn} className="h-8 sm:h-10 w-auto" />
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
            <div className="hidden md:block">
              <h1 className="text-sm font-bold text-gray-900 leading-none mb-1">{branding.nameAr} - بوابة الدفع</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Official Secure Payment Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
              <Lock className="w-3 h-3 text-green-600" />
              <span className="text-[10px] font-bold text-green-700">تشفير SSL آمن</span>
            </div>
            <button className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Official BG */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={branding.heroBgUrl || '/assets/branding/hero-aramex-bg.jpg'} 
          className="w-full h-full object-cover" 
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent flex items-center">
          <div className="container mx-auto px-6 text-white">
            <Badge className="mb-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 text-white px-4 py-1">
              {trackingNumber ? `رقم الشحنة: ${trackingNumber}` : 'طلب شحن جديد'}
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black mb-2">إكمال عملية الدفع</h2>
            <p className="text-sm sm:text-lg opacity-90 max-w-lg">يرجى إتمام الدفع للمتابعة في توصيل شحنتك إلى العنوان المحدد.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-10 pb-20 flex-1 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
              <div className="bg-white p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">بيانات الدفع الإلكتروني</h3>
                </div>
                {children}
              </div>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: 'دفع آمن 100%', sub: 'معايير PCI DSS' },
                { icon: Truck, label: 'توصيل سريع', sub: '24-48 ساعة' },
                { icon: Clock, label: 'تتبع لحظي', sub: 'تحديثات مستمرة' },
                { icon: Package, label: 'حماية المشتري', sub: 'تأمين شامل' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border text-center shadow-sm">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs font-bold text-gray-900">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 rounded-3xl border-none shadow-xl bg-white">
              <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                ملخص الطلب
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">اسم الخدمة:</span>
                  <span className="font-bold">{branding.nameAr} Express</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">نوع الشحنة:</span>
                  <span className="font-bold">طرد بريدي</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">رقم التتبع:</span>
                  <span className="font-mono font-bold text-blue-600">{trackingNumber || '---'}</span>
                </div>
                <div className="pt-4 border-t-2 border-dashed flex justify-between items-end">
                  <span className="text-sm font-bold text-gray-900">إجمالي المبلغ:</span>
                  <span className="text-2xl font-black text-blue-700">{amount}</span>
                </div>
              </div>
            </Card>

            {/* Information Card */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  لماذا {branding.nameAr}؟
                </h4>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                  نحن نضمن وصول شحنتك بأمان وبأسرع وقت ممكن عبر شبكتنا العالمية الواسعة.
                </p>
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                </div>
              </div>
              <Package className="absolute -bottom-6 -left-6 w-32 h-32 text-white/10 rotate-12" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
              <img src="/assets/branding/logo-aramex.png" className="h-4" alt="Aramex" />
              <img src="/assets/branding/logo-dhl.png" className="h-4" alt="DHL" />
              <img src="/assets/branding/logo-fedex.png" className="h-4" alt="FedEx" />
              <img src="/assets/branding/logo-ups.png" className="h-4" alt="UPS" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-gray-400">© 2025 بوابة الدفع الآمنة {branding.nameEn}. جميع الحقوق محفوظة.</p>
              <div className="flex gap-4 justify-center md:justify-end mt-2">
                <a href="#" className="text-[10px] text-gray-400 hover:text-blue-600 transition-colors">سياسة الخصوصية</a>
                <a href="#" className="text-[10px] text-gray-400 hover:text-blue-600 transition-colors">الشروط والأحكام</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AramexLayout: React.FC<CompanyLayoutProps> = (props) => <BaseLayout {...props} companyKey="aramex" />;
export const DHLLayout: React.FC<CompanyLayoutProps> = (props) => <BaseLayout {...props} companyKey="dhl" />;
export const FedExLayout: React.FC<CompanyLayoutProps> = (props) => <BaseLayout {...props} companyKey="fedex" />;
export const SMSALayout: React.FC<CompanyLayoutProps> = (props) => <BaseLayout {...props} companyKey="smsa" />;

export const getCompanyLayout = (companyKey: string) => {
  const key = companyKey.toLowerCase();
  switch (key) {
    case 'aramex': return AramexLayout;
    case 'dhl': return DHLLayout;
    case 'fedex': return FedExLayout;
    case 'smsa': return SMSALayout;
    default: return AramexLayout;
  }
};

export default { AramexLayout, DHLLayout, FedExLayout, SMSALayout, getCompanyLayout };
