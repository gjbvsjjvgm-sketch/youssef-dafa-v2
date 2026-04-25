import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark, ShieldCheck, UserCheck, Wallet, Activity } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getGovernmentServicesByCountry } from "@/lib/governmentPaymentServices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // WORM_V2: Comprehensive Sovereign Service Matrix for each country
  const identityServices = useMemo(() => {
    if (!selectedCountry) return [];
    
    const services: any[] = [];
    
    if (selectedCountry.code === 'SA') {
      services.push({
        title: "Nafath",
        titleAr: "نظام نفاذ الوطني",
        description: "إنشاء روابط دفع توثيق نفاذ الموحد",
        icon: UserCheck,
        href: `/create/${selectedCountry.code}/payment?service=nafath`,
        gradient: "linear-gradient(135deg, #006A4D, #004D38)",
      });
      services.push({
        title: "Madmoun",
        titleAr: "منصة مضمون",
        description: "إنشاء روابط دفع منصة مضمون",
        icon: ShieldCheck,
        href: `/create/${selectedCountry.code}/payment?service=madmoun`,
        gradient: "linear-gradient(135deg, #006A4D, #00843D)",
      });
    } else if (selectedCountry.code === 'AE') {
      services.push({
        title: "UAE PASS",
        titleAr: "الهوية الرقمية UAE PASS",
        description: "إنشاء روابط دفع الهوية الرقمية الموحدة",
        icon: UserCheck,
        href: `/create/${selectedCountry.code}/payment?service=digital_id`,
        gradient: "linear-gradient(135deg, #000000, #333333)",
      });
      services.push({
        title: "Dirham",
        titleAr: "منصة درهم الرقمية",
        description: "إنشاء روابط دفع منصة درهم الإماراتية",
        icon: Wallet,
        href: `/create/${selectedCountry.code}/payment?service=dirham`,
        gradient: "linear-gradient(135deg, #B2904B, #8E723C)",
      });
    } else if (selectedCountry.code === 'KW') {
      services.push({
        title: "Sahel",
        titleAr: "تطبيق سهل الكويتي",
        description: "إنشاء روابط دفع تطبيق سهل الموحد",
        icon: UserCheck,
        href: `/create/${selectedCountry.code}/payment?service=sahel`,
        gradient: "linear-gradient(135deg, #005596, #003366)",
      });
    } else if (selectedCountry.code === 'BH') {
      services.push({
        title: "Benefit",
        titleAr: "نظام بنفت البحريني",
        description: "إنشاء روابط دفع نظام بنفت الموحد",
        icon: Wallet,
        href: `/create/${selectedCountry.code}/payment?service=benefit`,
        gradient: "linear-gradient(135deg, #E31E24, #B5121B)",
      });
    } else if (selectedCountry.code === 'QA') {
      services.push({
        title: "NAS",
        titleAr: "التوثيق الوطني (قطر)",
        description: "إنشاء روابط دفع نظام التوثيق الوطني",
        icon: UserCheck,
        href: `/create/${selectedCountry.code}/payment?service=nas`,
        gradient: "linear-gradient(135deg, #8C1D3F, #5D132A)",
      });
    }
    
    return services;
  }, [selectedCountry]);

  const governmentServices = useMemo(() => {
    if (!selectedCountry) return [];
    return getGovernmentServicesByCountry(selectedCountry.code);
  }, [selectedCountry]);

  const baseServices = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
    },
    {
      title: "Contracts",
      titleAr: "روابط دفع العقود",
      description: "إنشاء روابط دفع وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, #2D3748, #4A5568)",
    },
    {
      title: "Health Services",
      titleAr: "خدمات الصحة",
      description: "روابط دفع الخدمات الطبية والصحية",
      icon: Activity,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, #E53E3E, #C53030)",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(210 95% 50%), hsl(220 90% 60%))",
    },
    {
      title: "Payment Links",
      titleAr: "روابط الدفع المفتوحة",
      description: "إنشاء روابط دفع متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "linear-gradient(135deg, hsl(260 85% 55%), hsl(200 90% 60%))",
    },
  ];

  // Merge all services into a single grid
  const allServices = useMemo(() => {
    if (!selectedCountry) return [];
    
    const combined = [...baseServices];
    
    // Add Identity/New services at the top
    identityServices.forEach(s => combined.unshift(s));
    
    // Add original government services
    governmentServices.forEach(gov => {
      combined.push({
        title: gov.name,
        titleAr: gov.nameAr,
        description: gov.description,
        icon: Landmark,
        href: `/create/${selectedCountry.code}/government/${gov.key}`,
        gradient: "linear-gradient(135deg, #F58220, #E67317)",
      });
    });
    
    return combined;
  }, [baseServices, identityServices, governmentServices, selectedCountry]);

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead 
        title="مركز خدمات الدفع والتوثيق - الخليج"
        description="منصة موحدة لإنشاء روابط دفع نفاذ، الهوية الرقمية، العقود، الخدمات الصحية، وشركات الشحن."
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen py-6 bg-gradient-to-br from-background via-background to-muted/20" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            الخدمات المتاحة
          </h1>
          <p className="text-base text-muted-foreground">
            حدد الدولة للوصول إلى كافة روابط الدفع والتوثيق
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-bold mb-3 text-center">
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-14 text-lg bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-all shadow-lg">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-base py-3 cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-base">{country.nameAr}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              كافة الخدمات في {selectedCountry.nameAr}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {allServices.map((service, index) => (
                <ServiceCard key={`${service.title}-${index}`} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Package className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-base text-muted-foreground">
              الرجاء اختيار دولة لعرض روابط الدفع المتاحة (نفاذ، عقود، صحة، شحن...)
            </p>
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Services;
