// Service logos and branding - All GCC shipping carriers and payment systems
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string; radius?: string; font?: string }> = {
  // Saudi Government Systems
  sadad: {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#F58220", secondary: "#E67317" },
    heroImage: "/assets/branding/hero-sadad.jpg",
    description: "نظام سداد للمدفوعات - الحل الأمثل لدفع الفواتير والخدمات الحكومية في المملكة العربية السعودية",
    radius: "10px",
    font: "Neo Sans Arabic"
  },
  madmoun: {
    logo: "/assets/branding/logo-madmoun.png",
    colors: { primary: "#006A4D", secondary: "#00843D" },
    description: "منصة مضمون - لتوثيق العقود والتعاملات المالية الآمنة",
    radius: "8px"
  },
  
  // UAE Government Systems
  jaywan: {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#CE1126", secondary: "#00732F" },
    heroImage: "/assets/branding/hero-emirates-post.jpg",
    description: "بوابة الدفع الذكي - حكومة دولة الإمارات العربية المتحدة",
    radius: "0px"
  },
  
  // Kuwait Government Systems
  knet: {
    logo: "/assets/branding/logo-knet.png",
    colors: { primary: "#007A33", secondary: "#004B1F" },
    heroImage: "/assets/branding/hero-knet.jpg",
    description: "شركة شبكة المعلومات القانونية (كي نت) - الدفع الإلكتروني الآمن في دولة الكويت",
    radius: "4px"
  },

  // Bahrain Government Systems
  benefit: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    description: "شركة بنفت - الحل الأمثل للمدفوعات الإلكترونية في مملكة البحرين",
    radius: "12px"
  },

  // Shipping Companies
  aramex: {
    logo: "/assets/branding/logo-aramex.png",
    colors: { primary: "#DC291E", secondary: "#8B1A12" },
    heroImage: "/assets/branding/hero-aramex-bg.jpg",
    description: "أرامكس - توصيل سريع، تتبع دقيق، وحلول لوجستية متكاملة",
    radius: "0px",
    font: "Roboto"
  },
  dhl: {
    logo: "/assets/branding/logo-dhl.png",
    colors: { primary: "#FFCC00", secondary: "#D40511" },
    heroImage: "/assets/branding/hero-dhl-bg.jpg",
    description: "DHL - التميز في الخدمات اللوجستية، توصيل عالمي موثوق",
    radius: "0px",
    font: "Delivery"
  },
  fedex: {
    logo: "/assets/branding/logo-fedex.png",
    colors: { primary: "#4D148C", secondary: "#FF6600" },
    heroImage: "/assets/branding/hero-fedex-bg.jpg",
    description: "فيديكس - العالم في الوقت المحدد، شحن دولي ومحلي فائق السرعة",
    radius: "4px",
    font: "FedEx Sans"
  },
  ups: {
    logo: "/assets/branding/logo-ups.png",
    colors: { primary: "#351C15", secondary: "#FFB500" },
    description: "UPS - شحن، تتبع، وتوصيل طرود بكفاءة عالية",
    radius: "4px"
  },
  smsa: {
    logo: "/assets/branding/logo-smsaexpress.png",
    colors: { primary: "#662D91", secondary: "#FF6600" },
    description: "سمسا إكسبرس - شريكك اللوجستي الموثوق في المملكة العربية السعودية",
    radius: "8px"
  },
  naqel: {
    logo: "/assets/branding/logo-naqel.png",
    colors: { primary: "#E61838", secondary: "#002E60" },
    heroImage: "/assets/branding/hero-logistics-trucks.jpg",
    description: "ناقل إكسبرس - توصيل الميل الأخير وحلول سلاسل الإمداد",
    radius: "4px"
  },
  saudipost: {
    logo: "/assets/branding/logo-spl.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    description: "SPL - سبل البريد السعودي، الحلول اللوجستية الحديثة للمملكة",
    radius: "10px"
  },
  zajil: {
    logo: "/assets/branding/logo-zajil.png",
    colors: { primary: "#1C4587", secondary: "#FF9900" },
    description: "زاجل - شحن محلي ودولي آمن وسريع",
    radius: "4px"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/assets/branding/hero-payment-secure.jpg",
    heroImage: "/assets/branding/hero-payment-secure.jpg",
    description: "خدمة دفع آمنة وموثوقة"
  };
};
