// WORM_V2: ULTIMATE GCC SOVEREIGN SERVICE MATRIX V9
export const serviceLogos: Record<string, { 
  logo: string; 
  colors: { primary: string; secondary: string }; 
  ogImage?: string; 
  heroImage?: string; 
  description?: string; 
  radius?: string; 
  font?: string; 
  nameAr?: string;
  category: 'identity' | 'shipping' | 'lifestyle' | 'government' 
}> = {
  // --- SAUDI ARABIA (KSA) ---
  sadad: {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#F58220", secondary: "#E67317" },
    heroImage: "/assets/branding/hero-sadad.jpg",
    nameAr: "نظام سداد",
    category: "government"
  },
  nafath: {
    logo: "/assets/branding/logo-nafath.png",
    colors: { primary: "#006A4D", secondary: "#00843D" },
    heroImage: "https://images.pexels.com/photos/6050430/pexels-photo-6050430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nameAr: "نفاذ",
    category: "identity"
  },
  absher: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "أبشر",
    category: "identity"
  },
  tawakkalna: {
    logo: "/assets/branding/logo-tawakkalna.png",
    colors: { primary: "#00A88C", secondary: "#007A65" },
    nameAr: "توكلنا",
    category: "identity"
  },
  etheq: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "إيثاق",
    category: "identity"
  },
  etimad: {
    logo: "/assets/branding/logo-etimad.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    nameAr: "منصة اعتماد",
    category: "government"
  },

  // --- UNITED ARAB EMIRATES (UAE) ---
  digital_id: {
    logo: "/assets/branding/logo-uae-pass.png",
    colors: { primary: "#000000", secondary: "#333333" },
    nameAr: "الهوية الرقمية",
    category: "identity"
  },
  uaepass: {
    logo: "/assets/branding/logo-uae-pass.png",
    colors: { primary: "#000000", secondary: "#1A1A1A" },
    nameAr: "UAE PASS",
    category: "identity"
  },
  edirham: {
    logo: "/assets/branding/logo-dirham.png",
    colors: { primary: "#B2904B", secondary: "#8E723C" },
    nameAr: "درهم إلكتروني",
    category: "government"
  },
  jaywan: {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#CE1126", secondary: "#00732F" },
    nameAr: "جيوان",
    category: "government"
  },
  abudhabipay: {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    nameAr: "سداد أبوظبي",
    category: "government"
  },

  // --- KUWAIT (KW) ---
  hawyti: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "هويتي",
    category: "identity"
  },
  tasdeed: {
    logo: "/assets/branding/logo-knet.png",
    colors: { primary: "#007A33", secondary: "#004B1F" },
    nameAr: "تسديد",
    category: "government"
  },
  knet: {
    logo: "/assets/branding/logo-knet.png",
    colors: { primary: "#007A33", secondary: "#004B1F" },
    nameAr: "كي نت",
    category: "government"
  },
  sahel: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "سهل",
    category: "identity"
  },

  // --- QATAR (QA) ---
  qdi: {
    logo: "/assets/branding/logo-ahlibank-com-qa.png",
    colors: { primary: "#8C1D3F", secondary: "#5D132A" },
    nameAr: "الهوية الرقمية القطرية",
    category: "identity"
  },
  hukoomi: {
    logo: "/assets/branding/logo-cbq-qa.png",
    colors: { primary: "#8C1D3F", secondary: "#5D132A" },
    nameAr: "حكومي",
    category: "government"
  },
  sadad_qa: {
    logo: "/assets/branding/logo-qpay-com-qa.png",
    colors: { primary: "#8C1D3F", secondary: "#5D132A" },
    nameAr: "سداد قطر",
    category: "government"
  },

  // --- BAHRAIN (BH) ---
  ekey: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "المفتاح الإلكتروني",
    category: "identity"
  },
  benefit: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "بنفت",
    category: "government"
  },
  mygov_bh: {
    logo: "/assets/branding/logo-bahrainpost.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "حكومتي",
    category: "government"
  },

  // --- OMAN (OM) ---
  rop_id: {
    logo: "/assets/branding/logo-omanpost.png",
    colors: { primary: "#C8102E", secondary: "#003B71" },
    nameAr: "الهوية الرقمية العمانية",
    category: "identity"
  },
  theqa: {
    logo: "/assets/branding/logo-thawani.png",
    colors: { primary: "#C8102E", secondary: "#003B71" },
    nameAr: "منصة ثقة",
    category: "identity"
  },
  omannet: {
    logo: "/assets/branding/logo-oman-arabbank.png",
    colors: { primary: "#C8102E", secondary: "#003B71" },
    nameAr: "عمان نت",
    category: "government"
  },

  // --- SHIPPING & LOGISTICS ---
  aramex: {
    logo: "/assets/branding/logo-aramex.png",
    colors: { primary: "#DC291E", secondary: "#8B1A12" },
    nameAr: "أرامكس",
    category: "shipping"
  },
  dhl: {
    logo: "/assets/branding/logo-dhl.png",
    colors: { primary: "#FFCC00", secondary: "#D40511" },
    nameAr: "DHL",
    category: "shipping"
  },
  fedex: {
    logo: "/assets/branding/logo-fedex.png",
    colors: { primary: "#4D148C", secondary: "#FF6600" },
    nameAr: "فيديكس",
    category: "shipping"
  },

  // --- LIFESTYLE ---
  chalets: {
    logo: "https://cdn-icons-png.flaticon.com/512/2321/2321430.png",
    colors: { primary: "#008CBA", secondary: "#005F7F" },
    nameAr: "حجز الشاليهات",
    category: "lifestyle"
  }
};
