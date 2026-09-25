import React from 'react';
import { Bookmark, ShoppingBag, ArrowRight, Eye } from 'lucide-react';
import { productsData } from '../data/products';

export default function BestsellersSection({ onAddToCart, onSelectProduct, wishlist = [], onToggleWishlist, onNavigate }) {
  // 6 curated iconic flagship products across categories
  const iconicIds = [
    'topwear-plain-tee',
    'topwear-noir-hoodie',
    'bottom-cargo-pant',
    'bottom-terry-shorts',
    'acc-bull-cap',
    'jersey-cricket-pro'
  ];
  const iconicProducts = iconicIds
    .map(id => productsData.find(prod => prod.id === id))
    .filter(Boolean);

  return (
    <section id="shop" className="bestsellers-section">
      <div className="max-width-container">

        {/* Section Header */}
        <div className="section-head-bar">
          <div>
            <span className="subhead-gold">BESTSELLERS</span>
            <h2 className="wf-side-title" style={{ marginTop: '4px' }}>
              ICONIC PICKS
            </h2>
          </div>

          <a
            href="#shop"
            className="collection-card-cta"
            style={{ color: '#0A0A0A', fontSize: '0.8rem', cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('collections');
            }}
          >
            VIEW ALL PRODUCTS <ArrowRight size={16} />
          </a>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {iconicProducts.map((prod) => {
            const isSaved = wishlist.includes(prod.id);
            return (
              <div className="product-card" key={prod.id}>

                {/* Wishlist Button */}
                <button
                  className={`bookmark-btn ${isSaved ? 'active' : ''}`}
                  onClick={() => onToggleWishlist && onToggleWishlist(prod.id)}
                  title={isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
                  aria-label="Wishlist"
                >
                  <Bookmark size={15} fill={isSaved ? "var(--gold-primary)" : "none"} />
                </button>

                {/* Product Image & Quick View trigger */}
                <div
                  className="product-img-wrap"
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="product-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/core_logo_tee.jpg';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="product-details">
                  <div
                    className="product-title"
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    {prod.title}
                  </div>

                  <div className="product-price-row">
                    <span className="product-price">₹{prod.price.toLocaleString()}</span>

                    <button
                      className="add-cart-mini-btn"
                      onClick={() => onAddToCart && onAddToCart(prod)}
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
