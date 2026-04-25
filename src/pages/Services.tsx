import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark, ShieldCheck, UserCheck, Wallet, Activity, Key, Shield, Smartphone } from "lucide-react";
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

  // WORM_V2_V9: ABSOLUTE COMPREHENSIVE GCC SOVEREIGN MATRIX
  const identityServices = useMemo(() => {
    if (!selectedCountry) return [];
    const services: any[] = [];
    const code = selectedCountry.code;

    if (code === 'SA') {
      services.push(
        { title: "Nafath", titleAr: "نفاذ الوطني الموحد", description: "إنشاء رابط دفع توثيق نفاذ", icon: UserCheck, href: `/create/${code}/payment?service=nafath`, gradient: "linear-gradient(135deg, #006A4D, #004D38)" },
        { title: "Absher", titleAr: "أبشر (مدفوعات الوزارة)", description: "إنشاء رابط دفع خدمات أبشر", icon: Shield, href: `/create/${code}/payment?service=absher`, gradient: "linear-gradient(135deg, #006A4D, #004D38)" },
        { title: "Tawakkalna", titleAr: "توكلنا (الهوية الرقمية)", description: "إنشاء رابط دفع خدمات توكلنا", icon: Smartphone, href: `/create/${code}/payment?service=tawakkalna`, gradient: "linear-gradient(135deg, #00A88C, #007A65)" },
        { title: "Etheq", titleAr: "إيثاق (التصديق الرقمي)", description: "إنشاء رابط دفع عقود إيثاق", icon: Key, href: `/create/${code}/payment?service=etheq`, gradient: "linear-gradient(135deg, #006A4D, #00843D)" },
        { title: "Etimad", titleAr: "منصة اعتماد الحكومية", description: "إنشاء رابط دفع منصة اعتماد", icon: Building2, href: `/create/${code}/payment?service=etimad`, gradient: "linear-gradient(135deg, #003D71, #002A4E)" }
      );
    } else if (code === 'AE') {
      services.push(
        { title: "UAE PASS", titleAr: "الهوية الرقمية UAE PASS", description: "إنشاء رابط دفع الهوية الرقمية", icon: UserCheck, href: `/create/${code}/payment?service=uaepass`, gradient: "linear-gradient(135deg, #000000, #333333)" },
        { title: "eDirham", titleAr: "الدرهم الإلكتروني", description: "إنشاء رابط دفع درهم إلكتروني", icon: Wallet, href: `/create/${code}/payment?service=edirham`, gradient: "linear-gradient(135deg, #B2904B, #8E723C)" },
        { title: "Jaywan", titleAr: "منظومة جيوان للدفع", description: "إنشاء رابط دفع بطاقات جيوان", icon: CreditCard, href: `/create/${code}/payment?service=jaywan`, gradient: "linear-gradient(135deg, #CE1126, #00732F)" },
        { title: "Abu Dhabi Pay", titleAr: "سداد أبوظبي", description: "إنشاء رابط دفع سداد أبوظبي", icon: Building2, href: `/create/${code}/payment?service=abudhabipay`, gradient: "linear-gradient(135deg, #003D71, #002A4E)" }
      );
    } else if (code === 'KW') {
      services.push(
        { title: "Hawyti", titleAr: "هويتي (Hawyti)", description: "إنشاء رابط دفع الهوية الرقمية", icon: Smartphone, href: `/create/${code}/payment?service=hawyti`, gradient: "linear-gradient(135deg, #005596, #003366)" },
        { title: "Tasdeed", titleAr: "تسديد (نظام الدفع)", description: "إنشاء رابط دفع نظام تسديد", icon: Wallet, href: `/create/${code}/payment?service=tasdeed`, gradient: "linear-gradient(135deg, #007A33, #004B1F)" },
        { title: "KNET", titleAr: "كي نت (KNET)", description: "إنشاء رابط دفع بوابة كي نت", icon: CreditCard, href: `/create/${code}/payment?service=knet`, gradient: "linear-gradient(135deg, #007A33, #004B1F)" },
        { title: "Sahel", titleAr: "تطبيق سهل الموحد", description: "إنشاء رابط دفع خدمات سهل", icon: UserCheck, href: `/create/${code}/payment?service=sahel`, gradient: "linear-gradient(135deg, #005596, #003366)" }
      );
    } else if (code === 'QA') {
      services.push(
        { title: "QDI", titleAr: "الهوية الرقمية القطرية", description: "إنشاء رابط دفع التوثيق الوطني", icon: UserCheck, href: `/create/${code}/payment?service=qdi`, gradient: "linear-gradient(135deg, #8C1D3F, #5D132A)" },
        { title: "Hukoomi", titleAr: "بوابة حكومي قطر", description: "إنشاء رابط دفع بوابة حكومي", icon: Building2, href: `/create/${code}/payment?service=hukoomi`, gradient: "linear-gradient(135deg, #8C1D3F, #5D132A)" },
        { title: "Sadad Qatar", titleAr: "سداد قطر", description: "إنشاء رابط دفع سداد قطر", icon: Wallet, href: `/create/${code}/payment?service=sadad_qa`, gradient: "linear-gradient(135deg, #8C1D3F, #5D132A)" }
      );
    } else if (code === 'BH') {
      services.push(
        { title: "eKey", titleAr: "المفتاح الإلكتروني (eKey)", description: "إنشاء رابط دفع المفتاح المطور", icon: Key, href: `/create/${code}/payment?service=ekey`, gradient: "linear-gradient(135deg, #E31E24, #B5121B)" },
        { title: "Benefit", titleAr: "نظام بنفت (Benefit)", description: "إنشاء رابط دفع نظام بنفت", icon: CreditCard, href: `/create/${code}/payment?service=benefit`, gradient: "linear-gradient(135deg, #E31E24, #B5121B)" },
        { title: "MyGov", titleAr: "تطبيق حكومتي", description: "إنشاء رابط دفع بوابة البحرين", icon: Building2, href: `/create/${code}/payment?service=mygov_bh`, gradient: "linear-gradient(135deg, #E31E24, #B5121B)" }
      );
    } else if (code === 'OM') {
      services.push(
        { title: "ROP ID", titleAr: "الهوية الرقمية العمانية", description: "إنشاء رابط دفع الهوية الرقمية", icon: UserCheck, href: `/create/${code}/payment?service=rop_id`, gradient: "linear-gradient(135deg, #C8102E, #003B71)" },
        { title: "THEQA", titleAr: "منصة ثقة (THEQA)", description: "إنشاء رابط دفع منصة ثقة", icon: ShieldCheck, href: `/create/${code}/payment?service=theqa`, gradient: "linear-gradient(135deg, #C8102E, #003B71)" },
        { title: "OmanNet", titleAr: "عمان نت (OmanNet)", description: "إنشاء رابط دفع بوابة عمان نت", icon: CreditCard, href: `/create/${code}/payment?service=omannet`, gradient: "linear-gradient(135deg, #C8102E, #003B71)" }
      );
    }
    return services;
  }, [selectedCountry]);

  const governmentServices = useMemo(() => {
    if (!selectedCountry) return [];
    return getGovernmentServicesByCountry(selectedCountry.code);
  }, [selectedCountry]);

  const baseServices = [
    { title: "Chalet Booking", titleAr: "حجز الشاليهات", description: "احجز شاليه أحلامك بأسعار مخصصة", icon: Home, href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#", gradient: "var(--gradient-primary)" },
    { title: "Shipping Services", titleAr: "خدمات الشحن", description: "شحن سريع وآمن مع شركات محلية معتمدة", icon: Package, href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#", gradient: "var(--gradient-success)" },
    { title: "Contracts", titleAr: "روابط دفع العقود", description: "إنشاء روابط دفع وتوثيق العقود الإلكترونية", icon: Building2, href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#", gradient: "linear-gradient(135deg, #2D3748, #4A5568)" },
    { title: "Health Services", titleAr: "خدمات الصحة", description: "روابط دفع الخدمات الطبية والصحية", icon: Activity, href: selectedCountry ? `/health/${selectedCountry.code}` : "#", gradient: "linear-gradient(135deg, #E53E3E, #C53030)" },
    { title: "Payment Links", titleAr: "روابط الدفع المباشر", description: "إنشاء روابط دفع سريعة", icon: CreditCard, href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#", gradient: "linear-gradient(135deg, hsl(260 85% 55%), hsl(200 90% 60%))" },
  ];

  const allServices = useMemo(() => {
    if (!selectedCountry) return [];
    const combined = [...baseServices];
    identityServices.forEach(s => combined.unshift(s));
    governmentServices.forEach(gov => {
      combined.push({ title: gov.name, titleAr: gov.nameAr, description: gov.description, icon: Landmark, href: `/create/${selectedCountry.code}/payment?service=${gov.id}`, gradient: "linear-gradient(135deg, hsl(210 20% 40%), hsl(210 20% 30%))" });
    });
    return combined;
  }, [selectedCountry, identityServices, governmentServices]);

  return (
    <>
      <SEOHead title="نظام الدفع الموحد - بوابة الخدمات الخليجية" description="منصة موحدة لإنشاء روابط دفع خدمات الهوية الرقمية، الشحن، الشاليهات، والخدمات الحكومية لجميع دول الخليج." image="/og-aramex.jpg" type="website" />
      <div className="min-h-screen pb-32 bg-gray-50/50" dir="rtl">
        <div className="bg-white border-b border-gray-100 px-4 py-6 sticky top-0 z-50 backdrop-blur-md bg-white/80">
          <div className="container mx-auto max-w-4xl flex items-center justify-between">
            <BackButton />
            <h1 className="text-xl font-black text-gray-900 tracking-tight">بوابة الخدمات الموحدة</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl mb-10 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-black text-gray-900 mb-6 text-center">اختر الدولة لعرض الخدمات المتاحة</h3>
            <Select onValueChange={(val) => setSelectedCountry(COUNTRIES.find(c => c.code === val))}>
              <SelectTrigger className="h-16 border-gray-200 rounded-2xl font-bold text-lg shadow-sm focus:ring-black">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="text-base py-4 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-black text-gray-900">{country.nameAr}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{country.name}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCountry ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-black text-gray-900">الخدمات في {selectedCountry.nameAr}</h2>
                <div className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200">
                  {allServices.length} Active Services
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                {allServices.map((service, index) => (
                  <ServiceCard key={`${service.title}-${index}`} {...service} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 opacity-20">
              <Package className="w-24 h-24 mx-auto mb-6 text-gray-300" />
              <p className="text-xl font-black text-gray-400">الرجاء اختيار دولة للبدء</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Services;
