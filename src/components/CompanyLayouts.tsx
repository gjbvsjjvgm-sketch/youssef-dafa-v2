import React from 'react';
import { serviceLogos } from '@/lib/serviceLogos';
import { Lock, Globe, ShieldCheck, ChevronRight, Menu } from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
}

const BaseOfficialLayout: React.FC<CompanyLayoutProps & { 
  headerBg: string; 
  headerLogo: string; 
  primaryColor: string; 
  secondaryColor: string;
  fontFamily?: string;
  borderRadius?: string;
  hideTopBar?: boolean;
  officialTitle?: string;
  footerContent?: React.ReactNode;
}> = ({ 
  children, 
  amount, 
  headerBg, 
  headerLogo, 
  primaryColor, 
  secondaryColor, 
  fontFamily = 'Cairo, sans-serif',
  borderRadius = '0px',
  hideTopBar = false,
  officialTitle = 'Secure Payment',
  footerContent
}) => {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col overflow-x-hidden" dir="rtl" style={{ fontFamily }}>
      {/* Official Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: headerBg, borderColor: `${primaryColor}33` }}>
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <img src={headerLogo} alt="Official Logo" className="h-8 sm:h-12 object-contain" />
          {!hideTopBar && (
            <div className="flex items-center gap-4 text-sm font-bold" style={{ color: primaryColor }}>
              <div className="hidden sm:flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white border" style={{ borderColor: primaryColor }}>
                <Lock className="w-4 h-4" />
                <span>آمن</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 py-8 sm:py-12 bg-gray-50/50">
        <div 
          className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden border border-gray-100"
          style={{ borderRadius }}
        >
          {/* Official Banner */}
          <div className="px-6 py-4 flex justify-between items-center text-white" style={{ backgroundColor: primaryColor }}>
            <h1 className="text-lg font-black uppercase tracking-tight">{officialTitle}</h1>
            <ShieldCheck className="w-6 h-6 opacity-80" />
          </div>

          {/* Amount Summary */}
          <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">المبلغ المطلوب</p>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: primaryColor }}>{amount}</h2>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Transaction Secured by</p>
              <div className="flex gap-2 mt-1 opacity-40 grayscale">
                <img src="/assets/branding/logo-sadad.png" className="h-4" />
                <img src="/assets/branding/logo-knet.png" className="h-4" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {children}
          </div>
        </div>
      </main>

      {/* Official Footer */}
      <footer className="bg-gray-900 text-white/60 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
               <img src={headerLogo} className="h-6 opacity-50 grayscale brightness-0 invert" />
               <p className="text-[10px] font-bold tracking-widest uppercase">Official Payment Gateway</p>
            </div>
            <div className="flex gap-4 text-[9px] uppercase font-bold tracking-tighter">
               <span className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</span>
               <span className="hover:text-white cursor-pointer transition-colors">الشروط والأحكام</span>
               <span className="hover:text-white cursor-pointer transition-colors">اتصل بنا</span>
            </div>
          </div>
          <p className="text-center md:text-right text-[8px] mt-6 opacity-30 uppercase font-bold">
            © {new Date().getFullYear()} {officialTitle}. جميع الحقوق محفوظة للجهة الرسمية.
          </p>
        </div>
      </footer>
    </div>
  );
};

export const SadadLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.sadad;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="سداد للمدفوعات"
      borderRadius="12px"
    />
  );
};

export const DHLLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.dhl;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFCC00"
      headerLogo={branding.logo}
      primaryColor="#D40511"
      secondaryColor="#FFCC00"
      officialTitle="DHL Global Forwarding"
      borderRadius="0px"
      fontFamily="'Delivery', 'Arial Black', sans-serif"
    />
  );
};

export const AramexLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.aramex;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="Aramex International"
      borderRadius="0px"
    />
  );
};

export const KNETLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.knet;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="بوابة كي نت"
      borderRadius="8px"
    />
  );
};

export const NaqelLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.naqel;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="ناقل إكسبرس"
      borderRadius="4px"
    />
  );
};

export const SMSALayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.smsa;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="سمسا إكسبرس"
      borderRadius="8px"
    />
  );
};

export const FedExLayout: React.FC<CompanyLayoutProps> = (props) => {
  const branding = serviceLogos.fedex;
  return (
    <BaseOfficialLayout
      {...props}
      headerBg="#FFFFFF"
      headerLogo={branding.logo}
      primaryColor={branding.colors.primary}
      secondaryColor={branding.colors.secondary}
      officialTitle="FedEx Shipping"
      borderRadius="4px"
      fontFamily="'FedEx Sans', sans-serif"
    />
  );
};

export const getCompanyLayout = (companyKey: string) => {
  const key = companyKey.toLowerCase();
  if (key === 'sadad') return SadadLayout;
  if (key === 'dhl') return DHLLayout;
  if (key === 'knet') return KNETLayout;
  if (key === 'aramex') return AramexLayout;
  if (key === 'naqel') return NaqelLayout;
  if (key === 'smsa') return SMSALayout;
  if (key === 'fedex') return FedExLayout;
  
  // Dynamic fallback for any other company in serviceLogos
  if (serviceLogos[key]) {
    const branding = serviceLogos[key];
    return (props: CompanyLayoutProps) => (
      <BaseOfficialLayout
        {...props}
        headerBg="#FFFFFF"
        headerLogo={branding.logo}
        primaryColor={branding.colors.primary}
        secondaryColor={branding.colors.secondary}
        officialTitle={`${key.toUpperCase()} Official Service`}
        borderRadius={branding.radius || '4px'}
      />
    );
  }

  return SadadLayout;
};

export default { SadadLayout, DHLLayout, KNETLayout, AramexLayout, NaqelLayout, SMSALayout, FedExLayout, getCompanyLayout };
