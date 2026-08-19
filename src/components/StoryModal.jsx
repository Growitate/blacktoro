import React from 'react';
import { X, Award, Shield, Sparkles } from 'lucide-react';

export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }} onClick={onClose}>
      <div 
        style={{
          background: '#0D0D0E',
          color: '#FFFFFF',
          borderRadius: '12px',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '40px 36px',
          position: 'relative',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          boxShadow: 'var(--shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="icon-btn" 
          onClick={onClose}
          aria-label="Close story modal"
          style={{ position: 'absolute', top: '20px', right: '20px', color: '#FFFFFF' }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/assets/logo_transparent.png" alt="BLACKTORO" style={{ height: '54px', marginBottom: '16px' }} />
          <div className="subhead-gold">ABOUT THE HOUSE</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase' }}>
            A LEGACY REWRITTEN
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#CCCCCC', fontSize: '0.92rem', lineHeight: '1.7' }}>
          <p>
            BLACKTORO was born from a singular conviction: streetwear should not merely follow fleeting trends—it should embody enduring strength, mythic storytelling, and uncompromising luxury.
          </p>
          <p>
            The golden bull represents unrelenting resilience, ambition, and power. Every garment produced in our atelier undergoes meticulous crafting—from sourcing 240+ GSM French Terry cotton to custom metallic gold stamping and high-density embroidery.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
            <div style={{ background: '#18181B', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Award color="var(--gold-primary)" size={28} style={{ marginBottom: '12px' }} />
              <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginBottom: '6px' }}>ANCIENT MYTHOS</h4>
              <p style={{ fontSize: '0.8rem', color: '#999' }}>Designs rooted in historical symbolism and timeless architectural proportions.</p>
            </div>
            <div style={{ background: '#18181B', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Shield color="var(--gold-primary)" size={28} style={{ marginBottom: '12px' }} />
              <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginBottom: '6px' }}>MODERN SILHOUETTE</h4>
              <p style={{ fontSize: '0.8rem', color: '#999' }}>Precision oversized cuts engineered for supreme comfort and presence.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gold-primary)', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: '10px' }}>
            FOR THOSE WHO SEE BEYOND.
          </p>
        </div>

      </div>
    </div>
  );
}
