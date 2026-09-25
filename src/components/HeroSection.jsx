import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onExploreClick, onSelectProduct }) {
  const handleSignatureProductClick = () => {
    if (onSelectProduct) {
      onSelectProduct({
        id: 'prod-3',
        title: 'MYTHOS BACKPRINT OVERSIZED TEE',
        price: 1659,
        image: '/assets/WhatsApp Image 2026-09-08 at 12.21.09 PM.jpeg',
        category: 'Signature Drops',
        badge: 'LIMITED EDITION',
        fabric: '240 GSM Heavyweight French Terry',
        description: 'Featuring "NOBODY IS THINKING ABOUT YOU. WE ARE. BLACKTORO" iconic back typography, drop shoulders, and luxury gold stamp insignia.'
      });
    }
  };

  return (
    <section id="home" className="hero-section hero-fullwidth-section">
      {/* Full-Bleed Edge-to-Edge Hero Banner */}
      <div className="hero-banner-fullbleed-wrap" onClick={handleSignatureProductClick}>
        <img 
          src="/assets/WhatsApp Image 2026-09-08 at 12.21.09 PM.jpeg" 
          alt="BLACKTORO Power Needs No Permission - Signature Backprint Oversized Tee Banner" 
          className="hero-banner-fullbleed-img"
        />
      </div>

      {/* Hero Bottom Actions & Highlights Bar */}
      <div className="hero-bottom-bar-wrap">
        <div className="max-width-container">
          <div className="hero-bottom-action-bar">
            
            {/* CTA Action Buttons */}
            <div className="hero-cta-group">
              <button className="btn-enter-house-luxe" onClick={onExploreClick}>
                <span>ENTER THE HOUSE</span>
                <ArrowRight size={12} />
              </button>

              <button className="btn-explore-collections-luxe" onClick={onExploreClick}>
                EXPLORE COLLECTIONS
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


