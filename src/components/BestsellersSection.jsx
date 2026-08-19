import React from 'react';
import { Bookmark, ShoppingBag, ArrowRight, Eye } from 'lucide-react';
import { productsData } from '../data/products';

export default function BestsellersSection({ onAddToCart, onSelectProduct, wishlist, onToggleWishlist }) {
  return (
    <section id="shop" className="bestsellers-section">
      <div className="max-width-container">
        
        {/* Section Header */}
        <div className="section-head-bar">
          <div>
            <span className="subhead-gold">BESTSELLERS</span>
            <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: 0 }}>
              ICONIC PICKS
            </h2>
          </div>

          <a 
            href="#shop" 
            className="collection-card-cta" 
            style={{ color: '#0A0A0A', fontSize: '0.8rem' }}
            onClick={(e) => { e.preventDefault(); }}
          >
            VIEW ALL PRODUCTS <ArrowRight size={16} />
          </a>
        </div>

        {/* 6 Products Grid */}
        <div className="products-grid">
          {productsData.map((prod) => {
            const isSaved = wishlist.includes(prod.id);
            return (
              <div className="product-card" key={prod.id}>
                
                {/* Wishlist Button */}
                <button 
                  className={`bookmark-btn ${isSaved ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(prod.id)}
                  title={isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
                  aria-label="Wishlist"
                >
                  <Bookmark size={15} fill={isSaved ? "var(--gold-primary)" : "none"} />
                </button>

                {/* Product Image & Quick View trigger */}
                <div 
                  className="product-img-wrap"
                  onClick={() => onSelectProduct(prod)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="product-img"
                  />
                </div>

                {/* Product Info */}
                <div className="product-details">
                  <div 
                    className="product-title"
                    onClick={() => onSelectProduct(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    {prod.title}
                  </div>
                  
                  <div className="product-price-row">
                    <span className="product-price">₹{prod.price.toLocaleString()}</span>
                    
                    <button 
                      className="add-cart-mini-btn"
                      onClick={() => onAddToCart(prod)}
                      title="Add to Cart"
                      aria-label="Add to Cart"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
