import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] || 'L' : 'L');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({ ...product, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="drawer-backdrop" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }} onClick={onClose}>
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
          boxShadow: 'var(--shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          className="icon-btn" 
          onClick={onClose}
          aria-label="Close product modal"
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#FFFFFF', borderRadius: '50%' }}
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div style={{ background: '#F0ECE6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>

        {/* Product Details */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
            BLACKTORO • {product.collection || 'SIGNATURE'}
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px' }}>
            {product.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A0A0A' }}>
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.95rem', color: '#999', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            {product.description || 'Premium heavyweight oversized silhouette crafted with high-density gold emblem embroidery and custom vintage wash.'}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px' }}>
              <span>SELECT SIZE</span>
              <span style={{ color: 'var(--gold-primary)', cursor: 'pointer' }}>Size Guide</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    border: selectedSize === size ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: selectedSize === size ? '#0A0A0A' : '#FFFFFF',
                    color: selectedSize === size ? 'var(--gold-primary)' : '#0A0A0A',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Spec Note */}
          <div style={{ background: '#F8F6F2', padding: '12px 16px', borderRadius: '6px', fontSize: '0.75rem', color: '#555', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <ShieldCheck size={18} color="var(--gold-primary)" />
            <div>
              <strong>Craftsmanship:</strong> {product.fabric || '240 GSM Heavyweight Cotton'}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
            <button 
              className={`btn-primary ${added ? 'btn-gold-solid' : ''}`}
              style={{ flexGrow: 1, justifyContent: 'center' }}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <Check size={18} /> ADDED TO BAG
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> ADD TO BAG
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
