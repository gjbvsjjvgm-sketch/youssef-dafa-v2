export interface Bank {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  color: string;
  radius: string;
  font: string;
  gradient?: string;
  shadow?: string;
}

export interface BanksByCountry {
  [countryCode: string]: Bank[];
}

export const BANKS_BY_COUNTRY: BanksByCountry = {
  AE: [
    { id: "fab", name: "First Abu Dhabi Bank", nameAr: "بنك أبوظبي الأول", logo: "/assets/branding/logo-fab.png", color: "#002A54", radius: "4px", font: "Frutiger, Arial", gradient: "linear-gradient(180deg, #00AEEF 0%, #0072BC 100%)", shadow: "0 2px 4px rgba(0,0,0,0.1)" },
    { id: "enbd", name: "Emirates NBD", nameAr: "بنك الإمارات دبي الوطني", logo: "/assets/branding/logo-emiratesnbd.png", color: "#003366", radius: "0px", font: "Frutiger Next, sans-serif" },
    { id: "adcb", name: "Abu Dhabi Commercial Bank", nameAr: "بنك أبوظبي التجاري", logo: "/assets/branding/logo-adcb.png", color: "#EC0100", radius: "0px", font: "ADCB Sans, Helvetica" },
    { id: "mashreq", name: "Mashreq Bank", nameAr: "بنك المشرق", logo: "/assets/branding/logo-mashreq.png", color: "#FF5E00", radius: "25px", font: "Mashreq Sans, sans-serif", shadow: "0 4px 6px rgba(255, 94, 0, 0.2)" },
    { id: "dib", name: "Dubai Islamic Bank", nameAr: "بنك دبي الإسلامي", logo: "/assets/branding/logo-dib-ae.png", color: "#8C1B2F", radius: "4px", font: "DIB Display, sans-serif", gradient: "linear-gradient(90deg, #8C1B2F 0%, #A32036 100%)" },
    { id: "adib", name: "Abu Dhabi Islamic Bank", nameAr: "مصرف أبوظبي الإسلامي", logo: "/assets/branding/logo-adib-ae.png", color: "#004A99", radius: "8px", font: "ADIB Sans, sans-serif" },
    { id: "cbd", name: "Commercial Bank of Dubai", nameAr: "بنك دبي التجاري", logo: "/assets/branding/logo-cbd-ae.png", color: "#003E7E", radius: "0px", font: "CBD Sans, Arial" },
    { id: "rakbank", name: "RAKBANK", nameAr: "بنك رأس الخيمة الوطني", logo: "/assets/branding/logo-rakbank-ae.png", color: "#C11114", radius: "12px", font: "Inter, sans-serif", shadow: "0 2px 10px rgba(0,0,0,0.05)" },
    { id: "sib", name: "Sharjah Islamic Bank", nameAr: "مصرف الشارقة الإسلامي", logo: "/assets/branding/logo-sib-ae.png", color: "#00563F", radius: "0px", font: "SIB Custom, sans-serif" },
    { id: "ajman", name: "Ajman Bank", nameAr: "مصرف عجمان", logo: "/assets/branding/logo-ajman.png", color: "#164E9F", radius: "2px", font: "Ajman Sans, sans-serif" },
    { id: "uab", name: "United Arab Bank", nameAr: "البنك العربي المتحد", logo: "/assets/branding/logo-uab.png", color: "#0025DD", radius: "30px", font: "UAB Display, sans-serif" },
    { id: "hilal", name: "Al Hilal Bank", nameAr: "مصرف الهلال", logo: "/assets/branding/logo-hilal.png", color: "#FF6D00", radius: "50px", font: "AlHilal Sans, sans-serif" },
    { id: "mbank", name: "Al Maryah Community Bank", nameAr: "بنك المارية المحلي", logo: "/assets/branding/logo-mbank-ae.png", color: "#003A70", radius: "8px", font: "Poppins, sans-serif", shadow: "0 4px 12px rgba(0, 58, 112, 0.1)" },
    { id: "cbi", name: "Commercial Bank International", nameAr: "البنك التجاري الدولي", logo: "/assets/branding/logo-cbi.png", color: "#004685", radius: "0px", font: "Frutiger, sans-serif" },
    { id: "investbank", name: "Invest Bank", nameAr: "بنك الاستثمار", logo: "/assets/branding/logo-investbank.png", color: "#A1804B", radius: "0px", font: "Times New Roman" },
    { id: "arabbank", name: "Arab Bank", nameAr: "البنك العربي", logo: "/assets/branding/logo-arabbank.png", color: "#005CAB", radius: "0px", font: "Arial, sans-serif" },
    { id: "hsbc", name: "HSBC UAE", nameAr: "إتش إس بي سي الإمارات", logo: "/assets/branding/logo-hsbc-ae.png", color: "#DB0011", radius: "0px", font: "Univers Next, sans-serif" },
    { id: "sc", name: "Standard Chartered UAE", nameAr: "ستاندرد تشارترد", logo: "/assets/branding/logo-sc.png", color: "#0072CE", radius: "4px", font: "SC Sans, sans-serif" },
    { id: "citi", name: "Citibank UAE", nameAr: "سيتي بنك الإمارات", logo: "/assets/branding/logo-citi.png", color: "#003087", radius: "2px", font: "Interstate, sans-serif" },
    { id: "wio", name: "Wio Bank", nameAr: "بنك ويو", logo: "/assets/branding/logo-wio.png", color: "#5700FF", radius: "16px", font: "Wio Sans, sans-serif", shadow: "0 8px 16px rgba(87, 0, 255, 0.1)" },
    { id: "zand", name: "Zand Bank", nameAr: "بنك زاند", logo: "/assets/branding/logo-zand-ae.png", color: "#000000", radius: "40px", font: "PP Neue Montreal, sans-serif" }
  ],
  SA: [
    { id: "snb", name: "Saudi National Bank (SNB)", nameAr: "البنك الأهلي السعودي", logo: "/assets/branding/logo-alahli.png", color: "#006A4D", radius: "8px", font: "Neo Sans Arabic" },
    { id: "alrajhi", name: "Al Rajhi Bank", nameAr: "مصرف الراجحي", logo: "/assets/branding/logo-alrajhibank-com-sa.png", color: "#0055A5", radius: "12px", font: "Al Rajhi Font" },
    { id: "riyad", name: "Riyad Bank", nameAr: "بنك الرياض", logo: "/assets/branding/logo-riyadbank.png", color: "#FFA500", radius: "4px", font: "GE SS Two" },
    { id: "sab", name: "Saudi Awwal Bank (SAB)", nameAr: "البنك السعودي الأول", logo: "/assets/branding/logo-sab.png", color: "#D91D24", radius: "0px", font: "SAB Sans" },
    { id: "alinma", name: "Alinma Bank", nameAr: "مصرف الإنماء", logo: "/assets/branding/logo-alinma.png", color: "#003057", radius: "10px", font: "Alinma Sans" },
    { id: "albilad", name: "Bank Albilad", nameAr: "بنك البلاد", logo: "/assets/branding/logo-bankalbilad.png", color: "#004B8D", radius: "8px", font: "Albilad Font" },
    { id: "aljazira", name: "Bank AlJazira", nameAr: "بنك الجزيرة", logo: "/assets/branding/logo-aljazirabank-com-sa.png", color: "#0054A6", radius: "4px", font: "AlJazira Font" },
    { id: "saib", name: "The Saudi Investment Bank (SAIB)", nameAr: "البنك السعودي للاستثمار", logo: "/assets/branding/logo-saib.png", color: "#1D3A8A", radius: "0px", font: "Inter" },
    { id: "bsf", name: "Banque Saudi Fransi", nameAr: "البنك السعودي الفرنسي", logo: "/assets/branding/logo-alfransi-com-sa.png", color: "#0054A6", radius: "0px", font: "Neo Sans" },
    { id: "anb", name: "Arab National Bank (ANB)", nameAr: "البنك العربي الوطني", logo: "/assets/branding/logo-anb-com-sa.png", color: "#006A4D", radius: "0px", font: "Neo Sans" }
  ],
  KW: [
    { id: "nbk", name: "National Bank of Kuwait (NBK)", nameAr: "بنك الكويت الوطني", logo: "/assets/branding/logo-nbk.png", color: "#003153", radius: "0px", font: "NBK Font" },
    { id: "kfh", name: "Kuwait Finance House (KFH)", nameAr: "بيت التمويل الكويتي", logo: "/assets/branding/logo-kfh.png", color: "#006747", radius: "0px", font: "Neo Sans" },
    { id: "boubyan", name: "Boubyan Bank", nameAr: "بنك بوبيان", logo: "/assets/branding/logo-boubyan-bank.png", color: "#512D6D", radius: "8px", font: "Neo Sans" },
    { id: "gulfbank", name: "Gulf Bank", nameAr: "بنك الخليج", logo: "/assets/branding/logo-gulfbank.png", color: "#C11B17", radius: "0px", font: "Neo Sans" },
    { id: "burgan", name: "Burgan Bank", nameAr: "بنك برقان", logo: "/assets/branding/logo-burgan.png", color: "#0054A6", radius: "0px", font: "Neo Sans" },
    { id: "cbk", name: "Commercial Bank of Kuwait (CBK)", nameAr: "البنك التجاري الكويتي", logo: "/assets/branding/logo-cbk.png", color: "#1D3A8A", radius: "0px", font: "Neo Sans" },
    { id: "warba", name: "Warba Bank", nameAr: "بنك وربة", logo: "/assets/branding/logo-warbabank.png", color: "#00A9E0", radius: "4px", font: "Neo Sans" },
    { id: "kib", name: "Kuwait International Bank (KIB)", nameAr: "بنك الكويت الدولي", logo: "/assets/branding/logo-kib-com-kw.png", color: "#004B8D", radius: "0px", font: "Neo Sans" },
    { id: "abk", name: "Al Ahli Bank of Kuwait (ABK)", nameAr: "البنك الأهلي الكويتي", logo: "/assets/branding/logo-abk-eahli.png", color: "#004B8D", radius: "0px", font: "Neo Sans" }
  ],
  QA: [
    { id: "qnb", name: "Qatar National Bank (QNB)", nameAr: "بنك قطر الوطني", logo: "/assets/branding/logo-qnb.png", color: "#4D0011", radius: "0px", font: "Neo Sans" },
    { id: "qib", name: "Qatar Islamic Bank (QIB)", nameAr: "مصرف قطر الإسلامي", logo: "/assets/branding/logo-qib-com-qa.png", color: "#004B8D", radius: "0px", font: "Neo Sans" },
    { id: "cbq", name: "Commercial Bank of Qatar (CBQ)", nameAr: "البنك التجاري القطري", logo: "/assets/branding/logo-cbq-qa.png", color: "#0054A6", radius: "0px", font: "Neo Sans" },
    { id: "dohabank", name: "Doha Bank", nameAr: "بنك الدوحة", logo: "/assets/branding/logo-dohabank.png", color: "#004B8D", radius: "0px", font: "Neo Sans" },
    { id: "dukhan", name: "Dukhan Bank", nameAr: "بنك دخان", logo: "/assets/branding/logo-dukhanbank.png", color: "#512D6D", radius: "0px", font: "Neo Sans" },
    { id: "alrayan", name: "Masraf Al Rayan", nameAr: "مصرف الريان", logo: "/assets/branding/logo-alrayan.png", color: "#4D0011", radius: "0px", font: "Neo Sans" },
    { id: "qiib", name: "Qatar International Islamic Bank (QIIB)", nameAr: "بنك قطر الدولي الإسلامي", logo: "/assets/branding/logo-qiib-com-qa.png", color: "#004B8D", radius: "0px", font: "Neo Sans" }
  ],
  BH: [
    { id: "nbb", name: "National Bank of Bahrain (NBB)", nameAr: "بنك البحرين الوطني", logo: "/assets/branding/logo-nbbonline.png", color: "#003153", radius: "0px", font: "Neo Sans" },
    { id: "bbk", name: "Bank of Bahrain and Kuwait (BBK)", nameAr: "بنك البحرين والكويت", logo: "/assets/branding/logo-bbkonline.png", color: "#004B8D", radius: "0px", font: "Neo Sans" },
    { id: "aub", name: "Ahli United Bank (AUB)", nameAr: "البنك الأهلي المتحد", logo: "/assets/branding/logo-aub.png", color: "#C11B17", radius: "0px", font: "Neo Sans" },
    { id: "bisb", name: "Bahrain Islamic Bank (BisB)", nameAr: "بنك البحرين الإسلامي", logo: "/assets/branding/logo-bisb.png", color: "#006747", radius: "0px", font: "Neo Sans" },
    { id: "alsalam", name: "Al Salam Bank", nameAr: "بنك السلام", logo: "/assets/branding/logo-alsalambank.png", color: "#004B8D", radius: "0px", font: "Neo Sans" },
    { id: "khaleeji", name: "Khaleeji Bank", nameAr: "بنك خليجي", logo: "/assets/branding/logo-khaleeji-bank.png", color: "#512D6D", radius: "0px", font: "Neo Sans" },
    { id: "ila", name: "ila Bank", nameAr: "بنك إيـلا", logo: "/assets/branding/logo-ilabank.png", color: "#00A9E0", radius: "50px", font: "Inter" }
  ],
  OM: [
    { id: "bankmuscat", name: "Bank Muscat", nameAr: "بنك مسقط", logo: "/assets/branding/logo-bankmuscat.png", color: "#ED1C24", radius: "4px", font: "Neo Sans" },
    { id: "nbo", name: "National Bank of Oman (NBO)", nameAr: "البنك الوطني العماني", logo: "/assets/branding/logo-nbo-om.png", color: "#00467F", radius: "4px", font: "Neo Sans" },
    { id: "bankdhofar", name: "Bank Dhofar", nameAr: "بنك ظفار", logo: "/assets/branding/logo-bankdhofar.png", color: "#0054A6", radius: "8px", font: "Neo Sans" },
    { id: "oab", name: "Oman Arab Bank (OAB)", nameAr: "البنك العربي العماني", logo: "/assets/branding/logo-oman-arabbank.png", color: "#003A70", radius: "4px", font: "Neo Sans" },
    { id: "sohar", name: "Sohar International", nameAr: "بنك صحار الدولي", logo: "/assets/branding/logo-soharinternational.png", color: "#C5A059", radius: "50px", font: "Neo Sans" },
    { id: "banknizwa", name: "Bank Nizwa", nameAr: "بنك نزوى", logo: "/assets/branding/logo-banknizwa-om.png", color: "#9B2C39", radius: "4px", font: "Neo Sans" }
  ]
};

export const getBanksByCountry = (countryCode: string): Bank[] => {
  return BANKS_BY_COUNTRY[countryCode] || [];
};

export const getBankById = (bankId: string): Bank | undefined => {
  return Object.values(BANKS_BY_COUNTRY).flat().find(b => b.id === bankId);
};
