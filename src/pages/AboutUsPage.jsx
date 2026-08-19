import React from 'react';
import { ShieldCheck, Gem, Sparkles, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage({ onNavigate }) {
  return (
    <div className="about-us-page">
      
      {/* About Hero Header */}
      <section className="about-hero-header">
        <div className="max-width-container">
          <div className="about-header-content">
            <span className="gold-subhead">OUR HERITAGE & PHILOSOPHY</span>
            <h1 className="about-page-title">
              THE HOUSE OF <span className="gold-gradient-text">BLACKTORO</span>
            </h1>
            <p className="about-page-desc">
              Ancient stories. Modern silhouettes. We craft luxury heavyweight streetwear for a generation carrying legacy forward.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Manifesto Section */}
      <section className="about-manifesto-section">
        <div className="max-width-container">
          <div className="manifesto-grid">
            <div className="manifesto-left">
              <span className="gold-tag">THE MANIFESTO</span>
              <h2 className="manifesto-title">WE DO NOT MAKE FASHION.<br />WE BUILD MODERN LEGACY.</h2>
              <p className="manifesto-text">
                BLACKTORO was born from a singular obsession: to revive ancient mythological power and forge it into contemporary luxury streetwear.
              </p>
              <p className="manifesto-text">
                Every tee we craft is built with heavyweight 240 GSM French Terry cotton, engineered with custom drop-shoulder silhouettes, and centered with high-density 3D metallic gold foil emblems.
              </p>
              
              <div className="manifesto-highlights">
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Strictly Limited to 500 Numbered Pieces Per Drop</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>High-Density 3D Metallic Gold Foil Stamping</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Pre-Shrunk 240 GSM French Terry Organic Cotton</span>
                </div>
              </div>
            </div>

            <div className="manifesto-right">
              <div className="about-img-frame">
                <img src="/assets/story_emboss.jpg" alt="BLACKTORO Gold Emboss Craft" className="about-frame-img" />
                <div className="about-img-badge">
                  <span className="badge-val">240 GSM</span>
                  <span className="badge-lbl">Luxury Terry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="about-pillars-section">
        <div className="max-width-container">
          <div className="pillars-header">
            <span className="gold-subhead">THE THREE PILLARS OF CRAFT</span>
            <h2 className="pillars-title">UNCOMPROMISING LUXURY</h2>
          </div>

          <div className="pillars-grid">
            
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <Gem size={28} className="pillar-icon text-gold" />
              <h3>240 GSM FRENCH TERRY</h3>
              <p>
                Spun from long-staple organic cotton fibers. High-density French Terry construct gives the garment a heavy, structured drape that maintains its boxy shape after endless wears.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <Sparkles size={28} className="pillar-icon text-gold" />
              <h3>3D GOLD FOIL EMBOSSING</h3>
              <p>
                Our signature charging bull emblem is stamped under 120 tons of thermal pressure, fusing custom metallic gold foil into the fabric weave for a 3D glistening finish.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <ShieldCheck size={28} className="pillar-icon text-gold" />
              <h3>500 NUMBERED EDITIONS</h3>
              <p>
                We do not mass produce. Each collection is capped at exactly 500 individually numbered pieces. When a drop sells out, it is archived forever.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Heritage Timeline */}
      <section className="about-timeline-section">
        <div className="max-width-container">
          <div className="timeline-header">
            <span className="gold-subhead">OUR JOURNEY</span>
            <h2 className="timeline-title">THE BLACKTORO CHRONICLES</h2>
          </div>

          <div className="timeline-trail">
            
            <div className="timeline-node">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h4>THE CONCEPTION</h4>
                <p>Initial sketches of the modern bull silhouette and research into ancient mythological insignia.</p>
              </div>
            </div>

            <div className="timeline-node">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h4>240 GSM PROTOTYPING</h4>
                <p>18 months of textile development engineering the perfect luxury French Terry weight and 3D foil stamping techniques.</p>
              </div>
            </div>

            <div className="timeline-node">
              <div className="timeline-year">2026</div>
              <div className="timeline-content">
                <h4>SEASON 01 WORLDWIDE DROP</h4>
                <p>Global launch of The House of Modern Legacy, shipping exclusive numbered editions worldwide.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="about-founder-section">
        <div className="max-width-container">
          <div className="founder-card">
            <div className="founder-quote-mark">“</div>
            <p className="founder-quote">
              “We built BLACKTORO for those who value permanence over fast fashion. A garment should carry weight—both in its physical drape and in the legacy it represents.”
            </p>
            <div className="founder-signature">
              <div className="founder-name">FOUNDER & CREATIVE DIRECTOR</div>
              <div className="founder-brand">THE HOUSE OF BLACKTORO</div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button className="btn-primary btn-gold-action" onClick={() => onNavigate && onNavigate('collections')}>
                EXPLORE SEASON 01 <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
