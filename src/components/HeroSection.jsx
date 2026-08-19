import React from 'react';
import { ArrowRight, ShieldCheck, Gem } from 'lucide-react';

export default function HeroSection({ onExploreClick, onSelectProduct }) {
  const handleSignatureProductClick = () => {
    if (onSelectProduct) {
      onSelectProduct({
        id: 'prod-3',
        title: 'MYTHOS OVERSIZED TEE',
        price: 1659,
        image: '/assets/model_nobg.png',
        description: 'Heavyweight French Terry in deep obsidian black, centered with high-density gold stamped bull insignia.'
      });
    }
  };

  return (
    <section id="home" className="hero-section hero-section-mockup">
      {/* Background Artistic Charging Bull Artwork (Right-Aligned) */}
      <div className="hero-artistic-bull-bg" aria-hidden="true">
        <img 
          src="/assets/hero_bull_bg.jpg" 
          alt="Artistic Gold Charging Bull Artwork" 
          className="artistic-bull-img"
        />
      </div>

      <div className="max-width-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid-mockup">
          
          {/* Left Hero Content */}
          <div className="hero-left">
            <div className="seasonal-pill-badge">
              <span className="pill-dot"></span>
              <span>LIMITED DROP • SEASON 01</span>
            </div>

            <h1 className="hero-title-mockup">
              THE HOUSE<br />
              OF<br />
              <span className="title-gold-accent">MODERN</span><br />
              <span className="title-gold-accent">LEGACY</span>
            </h1>

            <div className="hero-title-line"></div>

            <p className="hero-subtext-mockup">
              Ancient stories. Modern silhouettes.<br />
              Crafted for a generation that<br />
              carries legacy forward.
            </p>

            <div className="hero-btn-stack">
              <button className="btn-enter-house" onClick={onExploreClick}>
                ENTER THE HOUSE <ArrowRight size={15} />
              </button>

              <button className="btn-explore-collections" onClick={onExploreClick}>
                EXPLORE COLLECTIONS
              </button>
            </div>
          </div>

          {/* Center Hero Model Cutout */}
          <div className="hero-center-mockup">
            <div className="model-cutout-container">
              <img 
                src="/assets/model_nobg.png" 
                alt="BLACKTORO House Model wearing signature oversized tee" 
                className="hero-model-exact-cutout"
              />
            </div>
          </div>

          {/* Right Side: Signature Piece Card */}
          <div className="hero-right-mockup">
            <div className="signature-piece-card" onClick={handleSignatureProductClick}>
              
              <div className="sig-card-header">
                <span className="sig-tag-gold">SIGNATURE PIECE</span>
                <span className="sig-num-gray">NO. 001 / 500</span>
              </div>

              <div className="sig-card-body">
                <h3 className="sig-prod-title">MYTHOS OVERSIZED TEE</h3>
                <p className="sig-prod-desc">
                  Heavyweight French Terry in deep obsidian black, centered with high-density gold stamped bull insignia.
                </p>

                <div className="sig-feature-chips">
                  <div className="sig-chip">
                    <ShieldCheck size={14} className="chip-gold-icon" />
                    <span>AUTHENTICATED DROP</span>
                  </div>
                  <div className="sig-chip">
                    <Gem size={14} className="chip-gold-icon" />
                    <span>CUSTOM GOLD FOIL</span>
                  </div>
                </div>
              </div>

              <div className="sig-card-footer">
                <div className="sig-price-block">
                  <span className="sig-price-label">EXCLUSIVE PRICE</span>
                  <span className="sig-price-val">₹1,659</span>
                </div>
                <button className="btn-quickview-black">
                  QUICK VIEW <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
