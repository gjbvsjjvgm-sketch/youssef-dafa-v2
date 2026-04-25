export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primary: string;
  secondary: string;
  arabic: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  hero: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface CompanyBranding {
  id: string;
  nameEn: string;
  nameAr: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  logoUrl?: string;
  heroBgUrl?: string;
  websiteUrl?: string;
  description: string;
  headerStyle?: 'full' | 'compact' | 'centered';
  layoutType?: 'standard' | 'cloned';
}

export const bankBranding: Record<string, any> = {};

export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  aramex: {
    id: 'aramex',
    nameEn: 'Aramex',
    nameAr: 'أرامكس',
    colors: {
      primary: '#DC291E',
      secondary: '#FFFFFF',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E1E1E1',
    },
    fonts: { primary: 'Roboto, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'linear-gradient(to right, #DC291E 0%, #A32117 100%)' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '0px', md: '0px', lg: '0px' },
    logoUrl: '/assets/branding/logo-aramex.png',
    heroBgUrl: '/assets/branding/hero-aramex-bg.jpg',
    websiteUrl: 'https://www.aramex.com',
    description: 'شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع',
    headerStyle: 'compact',
    layoutType: 'cloned'
  },
  dhl: {
    id: 'dhl',
    nameEn: 'DHL',
    nameAr: 'دي إتش إل',
    colors: {
      primary: '#D40511',
      secondary: '#FFCC00',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#FFFFFF',
      border: '#FFCC00',
    },
    fonts: { primary: 'Delivery, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '0px', md: '0px', lg: '0px' },
    logoUrl: '/assets/branding/logo-dhl.png',
    heroBgUrl: '/assets/branding/hero-dhl-bg.jpg',
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي',
    layoutType: 'cloned'
  },
  fedex: {
    id: 'fedex',
    nameEn: 'FedEx',
    nameAr: 'فيديكس',
    colors: {
      primary: '#4D148C',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#333333',
      textLight: '#757575',
      textOnPrimary: '#FFFFFF',
      border: '#D1D1D1',
    },
    fonts: { primary: 'Roboto, Arial, sans-serif', secondary: 'FedEx Sans, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'none' },
    shadows: { sm: '0 1px 3px rgba(0,0,0,0.1)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 15px rgba(0,0,0,0.1)' },
    borderRadius: { sm: '4px', md: '4px', lg: '4px' },
    logoUrl: '/assets/branding/logo-fedex.png',
    heroBgUrl: '/assets/branding/hero-fedex-bg.jpg',
    websiteUrl: 'https://www.fedex.com',
    description: 'خدمات شحن دولية موثوقة مع تتبع فوري للشحنات',
    layoutType: 'cloned'
  },
  spl: {
    id: 'spl',
    nameEn: 'SPL (Saudi Post)',
    nameAr: 'البريد السعودي (سبل)',
    colors: {
      primary: '#003D71',
      secondary: '#FFFFFF',
      accent: '#E1F0F7',
      background: '#FFFFFF',
      surface: '#F4F7F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E1E9F0',
    },
    fonts: { primary: 'SPL Sans, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'linear-gradient(135deg, #003D71 0%, #002A4E 100%)' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '8px', md: '8px', lg: '8px' },
    logoUrl: '/assets/branding/logo-spl.png',
    websiteUrl: 'https://spl.com.sa',
    description: 'المشغل البريدي اللوجستي الرسمي في المملكة العربية السعودية',
    layoutType: 'cloned'
  },
  sadad: {
    id: 'sadad',
    nameEn: 'SADAD',
    nameAr: 'سداد',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FDF7F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5D0',
    },
    fonts: { primary: 'Neo Sans, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Neo Sans Arabic, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #F58220, #E67317)', secondary: 'none', hero: 'linear-gradient(180deg, #F58220 0%, #E67317 100%)' },
    shadows: { sm: '0 1px 2px rgba(245, 130, 32, 0.08)', md: '0 4px 6px rgba(245, 130, 32, 0.12)', lg: '0 10px 15px rgba(245, 130, 32, 0.18)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/assets/branding/logo-sadad.png',
    heroBgUrl: '/assets/branding/hero-sadad.jpg',
    websiteUrl: 'https://www.sadad.com',
    description: 'نظام سداد للمدفوعات - الحل المركزي لجميع الفواتير والمدفوعات الحكومية',
    layoutType: 'cloned'
  },
  knet: {
    id: 'knet',
    nameEn: 'KNET',
    nameAr: 'كي نت',
    colors: {
      primary: '#007A33',
      secondary: '#004B1F',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F2F9F4',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#C0E0C8',
    },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'none' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '4px', md: '4px', lg: '4px' },
    logoUrl: '/assets/branding/logo-knet.png',
    heroBgUrl: '/assets/branding/hero-knet.jpg',
    websiteUrl: 'https://www.knet.com.kw',
    description: 'شبكة المعلومات القانونية - حلول الدفع الإلكتروني في الكويت',
    layoutType: 'cloned'
  }
};

export const getBrandingByCompany = (id: string): CompanyBranding => {
  return shippingCompanyBranding[id] || shippingCompanyBranding['aramex'];
};
