import React, { useState } from 'react';
import { ArrowRight, Filter, Sparkles, ShieldCheck, Gem, ShoppingBag, Eye } from 'lucide-react';
import { productsData as products } from '../data/products';

export default function CollectionsPage({ onAddToCart, onSelectProduct, onNavigate }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const collectionsData = [
    {
      id: 'mythos',
      name: 'MYTHOS SERIES',
      tagline: 'Ancient Mythological Gold Stamped Rear Insignia',
      image: '/assets/col_mythos.jpg',
      gsm: '240 GSM French Terry',
      pieces: '500 Pieces Worldwide',
      category: 'Heavyweight Drop',
      desc: 'Inspired by ancient power symbols. Every tee features an oversized drop-shoulder fit centered with high-density 3D gold foil emblem.'
    },
    {
      id: 'chronicles',
      name: 'CHRONICLES DROP',
      tagline: 'Minimalist Cream & Raw Linen Tones',
      image: '/assets/col_chronicles.jpg',
      gsm: '260 GSM Organic Cotton',
      pieces: '300 Pieces Worldwide',
      category: 'Minimal Luxury',
      desc: 'Subtle sophistication. Soft cream earth tones with discrete metallic gold bull crest on chest and back.'
    },
    {
      id: 'noir',
      name: 'NOIR MINIMAL',
      tagline: 'Obsidian Black Monochrome Luxury',
      image: '/assets/col_noir.jpg',
      gsm: '240 GSM Heavyweight Terry',
      pieces: '400 Pieces Worldwide',
      category: 'Obsidian Series',
      desc: 'Pure dark aesthetic. Deep obsidian black fabric paired with subtle matte-gold micro details for understated power.'
    },
    {
      id: 'legends',
      name: 'LEGENDS EDITION',
      tagline: 'Vintage Washed Black & Embossed Crest',
      image: '/assets/col_legends.jpg',
      gsm: '280 GSM Heavyweight Cotton',
      pieces: '250 Numbered Editions',
      category: 'Collector Edition',
      desc: 'Hand-finished vintage wash giving each tee a unique distressed character and heavy drape.'
    }
  ];

  const filteredProducts = selectedFilter === 'ALL' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || p.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="collections-page">
      {/* Collections Hero Header */}
      <section className="collections-hero-header">
        <div className="max-width-container">
          <div className="collections-header-content">
            <span className="gold-subhead">THE HOUSE ARCHIVES</span>
            <h1 className="collections-page-title">
              EXPLORE OUR <span className="gold-gradient-text">COLLECTIONS</span>
            </h1>
            <p className="collections-page-desc">
              Discover curated drops crafted with 240 GSM luxury French Terry cotton, bespoke gold foil emblems, and strict limited numbering.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Categories Showcase */}
      <section className="collections-showcase-section">
        <div className="max-width-container">
          <div className="collections-showcase-grid">
            {collectionsData.map((col) => (
              <div key={col.id} className="collection-card-luxe" onClick={() => setSelectedFilter(col.id.toUpperCase())}>
                <div className="col-card-image-wrap">
                  <img src={col.image} alt={col.name} className="col-card-img" />
                  <div className="col-card-badge">{col.gsm}</div>
                </div>
                <div className="col-card-info">
                  <span className="col-card-pieces">{col.pieces}</span>
                  <h3 className="col-card-title">{col.name}</h3>
                  <p className="col-card-tagline">{col.tagline}</p>
                  <p className="col-card-desc">{col.desc}</p>
                  <button className="btn-explore-col">
                    VIEW COLLECTION <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Products Catalog */}
      <section className="collections-catalog-section" id="catalog">
        <div className="max-width-container">
          <div className="catalog-header-bar">
            <div>
              <h2 className="catalog-title">AVAILABLE DROPS</h2>
              <p className="catalog-sub">Showing {filteredProducts.length} limited pieces</p>
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons-row">
              {['ALL', 'MYTHOS', 'CHRONICLES', 'NOIR', 'LEGENDS'].map((f) => (
                <button 
                  key={f}
                  className={`btn-filter-tab ${selectedFilter === f ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(f)}
                >
                  {f === 'ALL' ? 'ALL DROPS' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="products-grid">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-img-wrap" onClick={() => onSelectProduct(prod)}>
                  <img src={prod.image} alt={prod.title} className="product-img" />
                  {prod.badge && <span className="product-badge">{prod.badge}</span>}
                  
                  <div className="product-hover-actions">
                    <button 
                      className="quick-view-btn"
                      onClick={(e) => { e.stopPropagation(); onSelectProduct(prod); }}
                    >
                      <Eye size={16} /> QUICK VIEW
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <span className="product-cat">{prod.category || 'OVERSIZED TEE'}</span>
                  <h3 className="product-title" onClick={() => onSelectProduct(prod)}>{prod.title}</h3>
                  
                  <div className="product-footer-row">
                    <div className="product-price">₹{prod.price.toLocaleString()}</div>
                    <button 
                      className="btn-add-cart"
                      onClick={() => onAddToCart(prod)}
                    >
                      <ShoppingBag size={14} /> ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className="craftsmanship-banner">
        <div className="max-width-container">
          <div className="craftsmanship-grid">
            <div className="craft-item">
              <Gem className="text-gold" size={24} />
              <h4>240 GSM LUXURY TERRY</h4>
              <p>Heavyweight pre-shrunk cotton engineered for structured drape and comfort.</p>
            </div>
            <div className="craft-item">
              <Sparkles className="text-gold" size={24} />
              <h4>3D GOLD FOIL EMBOSSING</h4>
              <p>High-density metallic gold insignia stamped under high-precision pressure.</p>
            </div>
            <div className="craft-item">
              <ShieldCheck className="text-gold" size={24} />
              <h4>STRICT 500 NUMBERED RUNS</h4>
              <p>Every piece belongs to an exclusive limited batch. No restocks ever.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
