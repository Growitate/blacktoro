import React from 'react';

export default function TieredPricingSection({ onShopTier }) {
  const tiers = [
    {
      id: 'essential',
      name: 'ESSENTIAL COLLECTION',
      price: '₹1,299 – ₹1,699',
      features: ['Premium Fabric', 'Minimal Designs', 'Everyday Luxury'],
      featured: false,
    },
    {
      id: 'signature',
      name: 'SIGNATURE COLLECTION',
      badge: 'MOST LOVED',
      price: '₹1,699 – ₹2,499',
      features: ['Story Driven Designs', 'Limited Pieces', 'Premium Quality'],
      featured: true,
    },
    {
      id: 'premium',
      name: 'PREMIUM COLLECTION',
      price: '₹2,499 – ₹3,499',
      features: ['Exclusive Artwork', 'Premium Materials', 'Perfect Finishing'],
      featured: false,
    },
    {
      id: 'limited',
      name: 'LIMITED EDITION',
      price: '₹3,499 – ₹4,999',
      features: ['Ultra Limited Drops', "Collector's Pieces", 'Highest Quality'],
      featured: false,
    }
  ];

  return (
    <section className="tiered-pricing-section">
      <div className="max-width-container">
        <div className="tiered-layout">
          
          {/* Left Intro */}
          <div className="tiered-intro">
            <span className="subhead-gold">OUR COLLECTIONS</span>
            <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              WEAR THE<br />
              LEGACY
            </h2>
            <p className="hero-subtext">
              Premium pieces.<br />
              Honest prices.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="pricing-cards-grid">
            {tiers.map((t) => (
              <div 
                className={`tier-card ${t.featured ? 'featured' : ''}`} 
                key={t.id}
              >
                {t.badge && <div className="tier-badge">{t.badge}</div>}
                
                <h3 className="tier-name">{t.name}</h3>
                <div className="tier-price">{t.price}</div>

                <ul className="tier-features">
                  {t.features.map((f, i) => (
                    <li className="tier-feature-item" key={i}>{f}</li>
                  ))}
                </ul>

                <button 
                  className={`btn-outline ${t.featured ? 'btn-gold-solid' : ''}`}
                  onClick={() => onShopTier && onShopTier(t.name)}
                >
                  SHOP NOW
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
