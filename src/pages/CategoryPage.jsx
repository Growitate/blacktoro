import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Eye, Heart, Layers, Sparkles } from 'lucide-react';
import { productsData } from '../data/products';

const categoryData = {
  topwear: {
    id: 'topwear',
    name: 'TOPWEAR',
    tagline: 'T-Shirt • Hoodies • Sweatshirt',
    badge: '240 – 420 GSM French Terry',
    color: '#C5A059',
    description:
      'The foundation of BLACKTORO. Clean silhouettes, heavyweight 240+ GSM French Terry t-shirts, architectural oversized hoodies, and drop-shoulder crewneck sweatshirts.',
    highlights: ['240+ GSM French Terry', 'Oversized Boxy Silhouette', 'Double-Lined Seamless Hoods', 'Pre-Shrunk & Colour-Fast'],
    subcategories: ['ALL', 'T-Shirt', 'Hoodies', 'Sweatshirt'],
    productIds: ['topwear-plain-tee', 'topwear-logo-tee', 'topwear-mythos-tee', 'topwear-noir-hoodie', 'topwear-arch-hoodie', 'topwear-crewneck-sweatshirt']
  },
  bottom: {
    id: 'bottom',
    name: 'BOTTOM',
    tagline: 'Half Pant • Full Pant',
    badge: '320 – 380 GSM Heavy Twill & Loopback',
    color: '#C5A059',
    description:
      'Engineered street silhouettes built for structure and mobility — from heavyweight French Terry lounge half pants (shorts) to 6-pocket utility cargo full pants and tailored joggers.',
    highlights: ['340 GSM Heavy Cotton Twill', 'Tactical 6-Pocket Design', 'Gold Metal Drawstring Hardware', 'Custom Cinch Ankles'],
    subcategories: ['ALL', 'Half Pant', 'Full Pant'],
    productIds: ['bottom-terry-shorts', 'bottom-mesh-half-pant', 'bottom-cargo-pant', 'bottom-terry-joggers']
  },
  accessories: {
    id: 'accessories',
    name: 'ACCESSORIES',
    tagline: 'Caps • Socks • Bags • Essentials',
    badge: 'Bespoke Hardware & Craft',
    color: '#C5A059',
    description:
      'Curated luxury streetwear essentials. Raised 3D bullion embroidered structured caps, ballistic weatherproof crossbody bags, dense cushioned ribbed crew socks, and collector accessories.',
    highlights: ['3D Raised Gold Bullion', 'Weatherproof 1680D Ballistic Nylon', 'Dense Terry Loop Cushioning', 'Collector Edition Gift Box'],
    subcategories: ['ALL', 'Caps', 'Socks', 'Bags'],
    productIds: ['acc-bull-cap', 'acc-crossbody-bag', 'acc-heavy-socks']
  },
  jersey: {
    id: 'jersey',
    name: 'JERSEY',
    tagline: 'Cricket • Football • Hockey • Basketball & more',
    badge: '220 – 360 GSM Pro Aero-Knit',
    color: '#C5A059',
    description:
      'Pro-athletic performance meets high-fashion streetwear. Featuring aero-knit cricket jerseys, football match kits, hardwood basketball mesh jerseys, and heavy ice hockey sweaters.',
    highlights: ['Pro-Grade Moisture-Wicking Aero-Knit', 'Laser-Cut Ventilation', 'Lace-Up Hockey Silhouette', 'Gold Foil Bullion Accents'],
    subcategories: ['ALL', 'Cricket', 'Football', 'Basketball', 'Hockey'],
    productIds: ['jersey-cricket-pro', 'jersey-football-noir', 'jersey-basketball-tank', 'jersey-hockey-sweater']
  },
};

export default function CategoryPage({ categoryId, initialSubcategory = 'ALL', onBack, onAddToCart, onSelectProduct, wishlist = [], onToggleWishlist }) {
  const cat = categoryData[categoryId?.toLowerCase()] || categoryData.topwear;
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeClick = (e, prodId, size) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [prodId]: size }));
  };

  // Find products matching this category and optional subcategory
  const categoryProducts = productsData.filter(p => {
    const isCatMatch = p.category?.toLowerCase() === cat.id.toLowerCase() || p.collection?.toLowerCase() === cat.id.toLowerCase();
    if (!isCatMatch) return false;
    if (selectedSubcategory && selectedSubcategory !== 'ALL') {
      return p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
    }
    return true;
  });

  return (
    <div style={{ background: '#0A0A0B', minHeight: '100vh', color: '#FFFFFF' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(180deg, #070708 0%, #0E0E10 100%)',
        padding: '52px 0 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(197, 160, 89, 0.15)',
      }}>
        {/* Subtle Ambient Radial Gold Glow */}
        <div style={{
          position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom Gold Gradient Line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px', background: 'linear-gradient(90deg, transparent, #C5A059 20%, #E8C87A 50%, #C5A059 80%, transparent)'
        }} />

        <div className="max-width-container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Top Bar with Back Button & Breadcrumbs */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '32px', flexWrap: 'wrap', gap: '16px'
          }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(197, 160, 89, 0.05)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                color: '#C5A059', padding: '10px 20px', borderRadius: '30px',
                fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
                cursor: 'pointer', textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.95)';
                e.currentTarget.style.color = '#0A0A0A';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(197, 160, 89, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.05)';
                e.currentTarget.style.color = '#C5A059';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
            >
              <ArrowLeft size={14} /> BACK TO COLLECTIONS
            </button>

            <div style={{
              fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.25em',
              color: '#888888', textTransform: 'uppercase'
            }}>
              BLACKTORO / {cat.name} {selectedSubcategory !== 'ALL' ? `/ ${selectedSubcategory.toUpperCase()}` : ''}
            </div>
          </div>

          {/* Category Header Info */}
          <div style={{ maxWidth: '720px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(197, 160, 89, 0.1)',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              color: '#C5A059', fontSize: '0.62rem', fontWeight: 800,
              letterSpacing: '0.22em', padding: '6px 14px', borderRadius: '20px',
              marginBottom: '14px', textTransform: 'uppercase',
            }}>
              ✨ {cat.badge}
            </div>

            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: '12px',
              textShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}>
              {cat.name} <span style={{
                background: 'linear-gradient(135deg, #C5A059 0%, #F5E0A3 50%, #C5A059 100%)',
                WebkitBackgroundClip: 'text',
                WebkitFillColor: 'transparent',
                color: 'transparent'
              }}>COLLECTION</span>
            </h1>

            {/* Subcategories Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#888888', letterSpacing: '0.15em', marginRight: '4px' }}>
                FILTER BY:
              </span>
              {(cat.subcategories || []).map((sub) => {
                const isActive = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #C5A059, #E8C87A)' : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#0A0A0A' : '#CCCCCC',
                      border: isActive ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.12)',
                      padding: '8px 18px',
                      borderRadius: '30px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textTransform: 'uppercase',
                      boxShadow: isActive ? '0 4px 15px rgba(197,160,89,0.3)' : 'none'
                    }}
                  >
                    {sub === 'ALL' ? `ALL ${cat.name}` : sub}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="max-width-container" style={{ padding: '48px 16px 80px' }}>
        
        {/* Count Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#A0A0A0', fontWeight: 600, letterSpacing: '0.05em' }}>
            Showing <strong style={{ color: '#C5A059' }}>{categoryProducts.length}</strong> items in {cat.name} {selectedSubcategory !== 'ALL' ? `• ${selectedSubcategory}` : ''}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 340px))',
          justifyContent: 'center',
          gap: '28px',
          margin: '0 auto',
        }}>
          {categoryProducts.map((prod) => {
            const isSaved = wishlist.includes(prod.id);
            const currentSize = selectedSizes[prod.id] || (prod.sizes ? prod.sizes[0] : 'L');

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                style={{
                  background: '#121214',
                  border: '1px solid rgba(197, 160, 89, 0.15)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                  transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.15)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)';
                }}
              >
                {/* Image area */}
                <div style={{ position: 'relative', overflow: 'hidden', background: '#0D0D0E' }}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    style={{
                      width: '100%',
                      height: '320px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  {/* Top-left category & subcategory chip */}
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    display: 'flex', gap: '6px', flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: 'rgba(197,160,89,0.95)', backdropFilter: 'blur(8px)',
                      color: '#0A0A0A', fontSize: '0.6rem', fontWeight: 900,
                      letterSpacing: '0.14em', padding: '4px 10px', borderRadius: '16px',
                    }}>
                      {prod.subcategory || prod.category}
                    </span>
                    {prod.badge && (
                      <span style={{
                        background: 'rgba(10,10,10,0.85)', border: '1px solid rgba(197,160,89,0.4)',
                        color: '#C5A059', fontSize: '0.58rem', fontWeight: 800,
                        letterSpacing: '0.12em', padding: '4px 8px', borderRadius: '16px',
                      }}>
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  {/* Top-right wishlist */}
                  <button
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: 'rgba(20,20,20,0.75)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#FFFFFF', fontSize: '12px',
                      transition: 'all 0.2s ease',
                      zIndex: 3
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(prod.id);
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.9)'; e.currentTarget.style.color = '#0A0A0A'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(20,20,20,0.75)'; e.currentTarget.style.color = '#FFFFFF'; }}
                  >
                    <Heart size={15} fill={isSaved ? '#C5A059' : 'none'} color={isSaved ? '#C5A059' : '#FFFFFF'} />
                  </button>

                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                    background: 'linear-gradient(to top, #111111 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Card body */}
                <div style={{ padding: '18px 20px 22px', background: '#111111', flex: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Category / GSM line */}
                  <div style={{
                    fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.18em',
                    color: '#C5A059', textTransform: 'uppercase', marginBottom: '6px',
                  }}>
                    {prod.gsm || cat.badge}
                  </div>

                  {/* Name + price row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{
                      fontFamily: 'Cinzel, serif', fontSize: '1.05rem',
                      fontWeight: 900, letterSpacing: '0.03em', color: '#FFFFFF',
                      lineHeight: 1.15,
                    }}>
                      {prod.title}
                    </div>
                    <div style={{
                      fontFamily: 'Cinzel, serif', fontSize: '1rem',
                      fontWeight: 800, color: '#C5A059', whiteSpace: 'nowrap',
                      marginLeft: '8px',
                    }}>
                      ₹{prod.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Sub-label */}
                  <div style={{
                    fontSize: '0.75rem', color: '#888888', marginBottom: '14px', lineHeight: 1.4,
                  }}>
                    {prod.tagline || prod.description?.slice(0, 70) + '...'}
                  </div>

                  {/* Size pills */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {(prod.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map(size => (
                      <button
                        key={size}
                        style={{
                          background: currentSize === size ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
                          color: currentSize === size ? '#C5A059' : '#888888',
                          border: currentSize === size ? '1px solid #C5A059' : '1px solid #2E2E2E',
                          borderRadius: '4px',
                          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em',
                          padding: '4px 9px', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                        onClick={(e) => handleSizeClick(e, prod.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: '#1E1E1E', marginBottom: '14px', marginTop: 'auto' }} />

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                      }} />
                      <span style={{ fontSize: '0.68rem', color: '#777777', letterSpacing: '0.08em', fontWeight: 600 }}>
                        {prod.stockStatus ? 'IN STOCK' : 'AVAILABLE'}
                      </span>
                    </div>

                    <button
                      style={{
                        background: 'linear-gradient(135deg, #C5A059, #E8C87A)',
                        color: '#0A0A0A', border: 'none',
                        padding: '10px 18px', fontSize: '0.68rem', fontWeight: 900,
                        letterSpacing: '0.14em', borderRadius: '6px', cursor: 'pointer',
                        textTransform: 'uppercase', transition: 'all 0.2s ease',
                        boxShadow: '0 3px 12px rgba(197,160,89,0.25)',
                        display: 'inline-flex', alignItems: 'center', gap: '6px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart && onAddToCart({
                          ...prod,
                          selectedSize: currentSize,
                          qty: 1
                        });
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <ShoppingBag size={13} /> ADD TO BAG
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
