// WORM_V2: Full GCC Sovereign Service Matrix
// Categories: Identity (Nafath, Digital ID), Shipping (Aramex, DHL), Lifestyle (Chalets), Gov (Sadad, Sahel)
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
  // --- IDENTITY & ACCESS SERVICES (Special Payment Links) ---
  nafath: {
    logo: "/assets/branding/logo-nafath.png",
    colors: { primary: "#006A4D", secondary: "#00843D" },
    heroImage: "https://images.pexels.com/photos/6050430/pexels-photo-6050430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "نظام النفاذ الوطني الموحد - بوابة سداد رسوم الخدمات والتوثيق الموحد",
    radius: "8px",
    font: "Cairo",
    nameAr: "نظام نفاذ الوطني",
    category: "identity"
  },
  digital_id: {
    logo: "/assets/branding/logo-uae-pass.png",
    colors: { primary: "#000000", secondary: "#333333" },
    heroImage: "https://images.pexels.com/photos/7319290/pexels-photo-7319290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "الهوية الرقمية UAE PASS - سداد رسوم توثيق الهوية والخدمات الذكية",
    radius: "12px",
    nameAr: "الهوية الرقمية الإماراتية",
    category: "identity"
  },
  dirham: {
    logo: "/assets/branding/logo-dirham.png",
    colors: { primary: "#B2904B", secondary: "#8E723C" },
    heroImage: "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "منصة درهم - سداد الرسوم الحكومية والخدمات المالية الرقمية",
    radius: "10px",
    nameAr: "منصة درهم الرقمية",
    category: "identity"
  },

  // --- GOVERNMENT SERVICES ---
  sadad: {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#F58220", secondary: "#E67317" },
    heroImage: "/assets/branding/hero-sadad.jpg",
    description: "نظام سداد للمدفوعات - بوابة السداد الرسمية للمملكة العربية السعودية",
    radius: "0px",
    font: "Neo Sans Arabic",
    nameAr: "نظام سداد",
    category: "government"
  },
  sahel: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    heroImage: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "تطبيق سهل - سداد رسوم الخدمات الحكومية الموحدة في دولة الكويت",
    radius: "8px",
    nameAr: "تطبيق سهل الكويتي",
    category: "government"
  },
  benefit: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    heroImage: "https://images.pexels.com/photos/6771574/pexels-photo-6771574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "شركة بنفت - سداد فواتير ورسوم الخدمات في مملكة البحرين",
    radius: "12px",
    nameAr: "نظام بنفت البحريني",
    category: "government"
  },

  // --- SHIPPING & LOGISTICS ---
  aramex: {
    logo: "/assets/branding/logo-aramex.png",
    colors: { primary: "#DC291E", secondary: "#8B1A12" },
    heroImage: "https://images.pexels.com/photos/6169052/pexels-photo-6169052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "أرامكس - سداد رسوم الشحن والتوصيل والجمارك",
    radius: "0px",
    font: "Roboto",
    nameAr: "أرامكس للشحن",
    category: "shipping"
  },
  dhl: {
    logo: "/assets/branding/logo-dhl.png",
    colors: { primary: "#FFCC00", secondary: "#D40511" },
    heroImage: "/assets/branding/hero-dhl-bg.jpg",
    description: "DHL - سداد رسوم الشحن الدولي والخدمات اللوجستية",
    radius: "0px",
    font: "Delivery",
    nameAr: "DHL Express",
    category: "shipping"
  },
  spl: {
    logo: "/assets/branding/logo-spl.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    description: "سبل - سداد رسوم البريد السعودي والخدمات البريدية",
    radius: "10px",
    nameAr: "سبل (البريد السعودي)",
    category: "shipping"
  },

  // --- LIFESTYLE & HOSPITALITY ---
  chalets: {
    logo: "https://cdn-icons-png.flaticon.com/512/2321/2321430.png",
    colors: { primary: "#008CBA", secondary: "#005F7F" },
    heroImage: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "بوابة حجز الشاليهات والاستراحات - سدد قيمة حجزك بأمان",
    radius: "15px",
    nameAr: "نظام حجز الشاليهات",
    category: "lifestyle"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "",
    colors: { primary: "#EF7622", secondary: "#D65C0F" },
    heroImage: "/assets/branding/hero-payment-secure.jpg",
    nameAr: "بوابة دفع آمنة",
    category: "government"
  };
};
