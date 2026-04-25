// WORM_V2_V11: ULTIMATE SOVEREIGN BRANDING MATRIX
export interface ServiceBranding {
  logo: string;
  colors: { primary: string; secondary: string };
  nameAr: string;
  nameEn: string;
  category: 'government' | 'shipping' | 'financial';
  font?: string;
}

export const serviceLogos: Record<string, ServiceBranding> = {
  // --- KSA ---
  sadad: {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#EB7625", secondary: "#2B335E" },
    nameAr: "سداد",
    nameEn: "SADAD",
    category: "government"
  },
  nafath: {
    logo: "/assets/branding/logo-nafath.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "نفاذ",
    nameEn: "Nafath",
    category: "government"
  },
  absher: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "أبشر",
    nameEn: "Absher",
    category: "government"
  },
  tawakkalna: {
    logo: "/assets/branding/logo-tawakkalna.png",
    colors: { primary: "#00A88C", secondary: "#007A65" },
    nameAr: "توكلنا",
    nameEn: "Tawakkalna",
    category: "government"
  },
  etheq: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "إيثاق",
    nameEn: "Etheq",
    category: "government"
  },
  etimad: {
    logo: "/assets/branding/logo-etimad.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    nameAr: "منصة اعتماد",
    nameEn: "Etimad",
    category: "government"
  },

  // --- UAE ---
  uaepass: {
    logo: "/assets/branding/logo-uae-pass.png",
    colors: { primary: "#000000", secondary: "#1A1A1A" },
    nameAr: "UAE PASS",
    nameEn: "UAE PASS",
    category: "government"
  },
  edirham: {
    logo: "/assets/branding/logo-dirham.png",
    colors: { primary: "#B2904B", secondary: "#8E723C" },
    nameAr: "الدرهم الإلكتروني",
    nameEn: "eDirham",
    category: "government"
  },
  jaywan: {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#CE1126", secondary: "#00732F" },
    nameAr: "جيوان",
    nameEn: "Jaywan",
    category: "government"
  },

  // --- KUWAIT ---
  hawyti: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "هويتي",
    nameEn: "Kuwait Mobile ID",
    category: "government"
  },
  sahel: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "سهل",
    nameEn: "Sahel",
    category: "government"
  },
  knet: {
    logo: "/assets/branding/logo-knet.png",
    colors: { primary: "#007A33", secondary: "#004B1F" },
    nameAr: "كي نت",
    nameEn: "KNET",
    category: "government"
  },

  // --- SHIPPING ---
  aramex: {
    logo: "/assets/branding/logo-aramex.png",
    colors: { primary: "#DC291E", secondary: "#B12018" },
    nameAr: "أرامكس",
    nameEn: "Aramex",
    category: "shipping"
  },
  dhl: {
    logo: "/assets/branding/logo-dhl.png",
    colors: { primary: "#FFCC00", secondary: "#D2002E" },
    nameAr: "دي إتش إل",
    nameEn: "DHL",
    category: "shipping"
  },
  smsa: {
    logo: "/assets/branding/logo-smsa.png",
    colors: { primary: "#004B87", secondary: "#E31E24" },
    nameAr: "سمسا",
    nameEn: "SMSA",
    category: "shipping"
  }
};

export const getServiceBranding = (serviceName: string): ServiceBranding => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#0A1628", secondary: "#1E3A5F" },
    nameAr: "بوابة دفع",
    nameEn: "Payment Gateway",
    category: "government"
  };
};
