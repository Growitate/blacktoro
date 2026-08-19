import React from 'react';
import { ArrowRight } from 'lucide-react';
import { collectionsData } from '../data/products';

export default function CollectionsSection({ onSelectCollection }) {
  return (
    <section id="collections" className="collections-section">
      <div className="max-width-container">
        <div className="collections-layout">
          
          {/* Header Intro */}
          <div className="collections-header">
            <span className="subhead-gold">COLLECTIONS</span>
            <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              EXPLORE OUR<br />
              LATEST WORLDS
            </h2>
            <p className="hero-subtext" style={{ marginBottom: '28px' }}>
              Different worlds.<br />
              One identity.
            </p>
            <button 
              className="btn-primary" 
              onClick={() => onSelectCollection && onSelectCollection('ALL')}
            >
              VIEW ALL COLLECTIONS <ArrowRight size={16} />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="collections-grid">
            {collectionsData.map((col) => (
              <div 
                className="collection-card" 
                key={col.id}
                onClick={() => onSelectCollection && onSelectCollection(col.title)}
              >
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="collection-card-img"
                />
                <div className="collection-card-overlay">
                  <div className="collection-card-title">{col.title}</div>
                  <div className="collection-card-sub">{col.subtitle}</div>
                  <div className="collection-card-cta">
                    {col.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
