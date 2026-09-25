import { ShieldCheck, Gem, Sparkles } from 'lucide-react';

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
              A modern clothing brand inspired by the world around us, created to bring thoughtful design, quality and individuality into everyday wear.
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
              <p className="manifesto-text">
                BLACKTORO is a contemporary clothing brand focused on thoughtful design, quality and individuality. We create everyday pieces that balance comfort with a distinct sense of style.
              </p>
              <p className="manifesto-text">
                Inspired by people, culture, nature, architecture and everyday life, our designs are shaped by the world around us and the things we connect with.
              </p>
              <p className="manifesto-text">
                For us, it comes down to the details — the fabric, fit, construction and finish. We believe good clothing should feel as good as it looks.
              </p>
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
            <span className="gold-subhead">THE THREE THINGS WE CARE ABOUT</span>
            <h2 className="pillars-title">MADE WITH INTENTION</h2>
          </div>

          <div className="pillars-grid">
            
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <Gem size={28} className="pillar-icon text-gold" />
              <h3>QUALITY</h3>
              <p>
                We focus on good fabrics, comfortable fits and materials made to last. Our T-shirts are crafted using 240 GSM French Terry cotton, giving them a substantial feel, structure and everyday comfort.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <Sparkles size={28} className="pillar-icon text-gold" />
              <h3>DESIGN</h3>
              <p>
                From minimal essentials and bold graphics to carefully crafted embroidery, we explore different techniques to bring each idea to life.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <ShieldCheck size={28} className="pillar-icon text-gold" />
              <h3>THE DETAILS</h3>
              <p>
                We believe the small things matter — from the way a garment is constructed to the finishing touches that complete it.
              </p>
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
          </div>
        </div>
      </section>

    </div>
  );
}
