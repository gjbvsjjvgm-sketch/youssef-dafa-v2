import { useState, useMemo } from "react";
import { UserCheck, Wallet, Smartphone, CreditCard, Building2, Shield, Key, Landmark, Activity, Truck } from "lucide-react";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const identityServices = useMemo(() => {
    const code = selectedCountry.code;
    const services: any[] = [];
    if (code === 'SA') {
      services.push(
        { titleAr: "نفاذ الوطني", icon: UserCheck, href: "/create/SA/payment?service=nafath", color: "#006A4D" },
        { titleAr: "أبشر", icon: Shield, href: "/create/SA/payment?service=absher", color: "#006A4D" },
        { titleAr: "توكلنا", icon: Smartphone, href: "/create/SA/payment?service=tawakkalna", color: "#00A88C" },
        { titleAr: "إيثاق", icon: Key, href: "/create/SA/payment?service=etheq", color: "#006A4D" }
      );
    } else if (code === 'AE') {
      services.push(
        { titleAr: "UAE PASS", icon: UserCheck, href: "/create/AE/payment?service=uaepass", color: "#000000" },
        { titleAr: "الدرهم الإلكتروني", icon: Wallet, href: "/create/AE/payment?service=edirham", color: "#B2904B" },
        { titleAr: "جيوان", icon: CreditCard, href: "/create/AE/payment?service=jaywan", color: "#CE1126" }
      );
    } else if (code === 'KW') {
      services.push(
        { titleAr: "هويتي", icon: Smartphone, href: "/create/KW/payment?service=hawyti", color: "#005596" },
        { titleAr: "سهل", icon: UserCheck, href: "/create/KW/payment?service=sahel", color: "#005596" },
        { titleAr: "كي نت", icon: CreditCard, href: "/create/KW/payment?service=knet", color: "#007A33" }
      );
    }
    return services;
  }, [selectedCountry]);

  const otherServices = [
    { titleAr: "خدمات الشحن", icon: Truck, href: "/create/shipping" },
    { titleAr: "حجز الشاليهات", icon: Landmark, href: "/create/chalet" },
    { titleAr: "الخدمات الصحية", icon: Activity, href: "/create/health" },
    { titleAr: "العقود الإلكترونية", icon: FileText, href: "/create/contract" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32" dir="rtl">
      <SEOHead title="الخدمات الإلكترونية" />
      
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="text-2xl font-black text-gray-900">الخدمات</h1>
            <div className="w-10" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">إختر الدولة</label>
            <Select onValueChange={(val) => setSelectedCountry(COUNTRIES.find(c => c.code === val) || COUNTRIES[0])} defaultValue={selectedCountry.code}>
              <SelectTrigger className="h-14 rounded-2xl border-2 border-gray-100 font-bold bg-gray-50/50">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.code} className="font-bold py-3">
                    <div className="flex items-center gap-3">
                      <span>{c.flag}</span>
                      <span>{c.nameAr}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 mt-8 space-y-10">
        <section className="space-y-4">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mr-2">خدمات الهوية والدفع السيادي</h2>
          <div className="grid grid-cols-2 gap-4">
            {identityServices.map((s, i) => (
              <a key={i} href={s.href} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <s.icon size={64} />
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${s.color}10`, color: s.color }}>
                   <s.icon size={24} />
                </div>
                <div className="font-black text-gray-900">{s.titleAr}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mr-2">الخدمات العامة واللوجستية</h2>
          <div className="grid grid-cols-2 gap-4">
            {otherServices.map((s, i) => (
              <a key={i} href={s.href} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                   <s.icon size={24} />
                </div>
                <div className="font-black text-gray-900">{s.titleAr}</div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

// Internal icon for fallback
const FileText = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

export default Services;
