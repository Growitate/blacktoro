import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Gem, ShoppingBag, Eye, Heart, Bookmark, Layers, Activity } from 'lucide-react';
import { productsData as products, collectionsData } from '../data/products';
import CategoryPage from './CategoryPage';

export default function CollectionsPage({ onAddToCart, onSelectProduct, onNavigate, wishlist = [], onToggleWishlist }) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState('ALL');

  // If a category is selected, render its dedicated page
  if (activeCategory) {
    return (
      <CategoryPage
        categoryId={activeCategory}
        initialSubcategory={activeSubcategory}
        onBack={() => {
          setActiveCategory(null);
          setActiveSubcategory('ALL');
        }}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />
    );
  }

  // Handle clicking a subcategory pill on the showcase card
  const handleShowcaseSubcatClick = (e, catId, subcat) => {
    e.stopPropagation();
    setActiveCategory(catId);
    setActiveSubcategory(subcat);
  };

  // Curated 6 flagship pieces shown in the default ALL drops view
  const curatedHeroDropIds = [
    'topwear-plain-tee',
    'topwear-noir-hoodie',
    'bottom-cargo-pant',
    'bottom-terry-shorts',
    'acc-bull-cap',
    'jersey-cricket-pro'
  ];

  // Filter products by category and subcategory
  const filteredProducts = selectedCategoryFilter === 'ALL'
    ? curatedHeroDropIds.map(id => products.find(p => p.id === id)).filter(Boolean)
    : products.filter(p => {
      const matchesCategory =
        p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
        p.collection?.toLowerCase() === selectedCategoryFilter.toLowerCase();

      if (!matchesCategory) return false;

      if (selectedSubcategoryFilter !== 'ALL') {
        return p.subcategory?.toLowerCase() === selectedSubcategoryFilter.toLowerCase();
      }

      return true;
    });

  // Get active subcategories for current filter
  const currentCategoryObj = collectionsData.find(c => c.name.toLowerCase() === selectedCategoryFilter.toLowerCase());
  const activeSubcategoriesList = currentCategoryObj ? ['ALL', ...currentCategoryObj.subcategories] : [];

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
              Explore the four core pillars of BLACKTORO streetwear — from heavyweight Topwear and engineered Bottoms to pro-cut Jerseys and bespoke Accessories.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Categories Showcase */}
      <section className="collections-showcase-section">
        <div className="max-width-container">
          <div className="collections-showcase-grid">
            {collectionsData.map((col) => (
              <div key={col.id} className="collection-card-luxe">
                <div
                  className="col-card-image-wrap"
                  onClick={() => {
                    setActiveCategory(col.id);
                    setActiveSubcategory('ALL');
                  }}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveCategory(col.id);
                      setActiveSubcategory('ALL');
                    }
                  }}
                  aria-label={`View ${col.name} collection`}
                >
                  <picture className="col-card-picture">
                    {col.desktopImage && (
                      <source media="(min-width: 769px)" srcSet={col.desktopImage} />
                    )}
                    <img src={col.image} alt={col.name} className="col-card-img" />
                  </picture>
                  <div className="col-card-badge">{col.gsm}</div>
                </div>

                <div className="col-card-info">
                  <div className="col-card-top-row">
                    <h3
                      className="col-card-title"
                      onClick={() => {
                        setActiveCategory(col.id);
                        setActiveSubcategory('ALL');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {col.name}
                    </h3>
                  </div>

                  <p className="col-card-tagline">{col.tagline}</p>

                  {/* Visible Subcategories Pill Row */}
                  <div className="col-card-subcategories-section">
                    <span className="col-subcat-label">SUBCATEGORIES:</span>
                    <div className="col-subcat-pills-row">
                      {col.subcategories.map((sub) => (
                        <button
                          key={sub}
                          className="col-subcat-chip"
                          onClick={(e) => handleShowcaseSubcatClick(e, col.id, sub)}
                          title={`Explore ${sub} in ${col.name}`}
                        >
                          <span>{sub}</span>
                          <ArrowRight size={11} className="col-subcat-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn-explore-col"
                    onClick={() => {
                      setActiveCategory(col.id);
                      setActiveSubcategory('ALL');
                    }}
                  >
                    VIEW {col.name} <ArrowRight size={14} />
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
              <span className="catalog-gold-tag">
                {selectedCategoryFilter === 'ALL' ? 'CURATED ATELIER CAPSULE' : `${selectedCategoryFilter} SELECTION`}
              </span>
              <h2 className="catalog-title">AVAILABLE DROPS</h2>
              <p className="catalog-sub">
                {selectedCategoryFilter === 'ALL'
                  ? 'Showing 6 curated flagship silhouettes from current season drops'
                  : `Showing ${filteredProducts.length} pieces in ${selectedCategoryFilter}${selectedSubcategoryFilter !== 'ALL' ? ` • ${selectedSubcategoryFilter}` : ''}`}
              </p>
            </div>

            {/* Main Category Filter Buttons */}
            <div className="filter-buttons-row">
              {['ALL', 'TOPWEAR', 'BOTTOM', 'ACCESSORIES', 'JERSEY'].map((cat) => (
                <button
                  key={cat}
                  className={`btn-filter-tab ${selectedCategoryFilter === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategoryFilter(cat);
                    setSelectedSubcategoryFilter('ALL');
                  }}
                >
                  {cat === 'ALL' ? 'ALL CATEGORIES' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Subcategory Filter Pills (Visible when category is selected) */}
          {selectedCategoryFilter !== 'ALL' && activeSubcategoriesList.length > 0 && (
            <div className="subcategory-filter-bar">
              <span className="subcat-bar-label">SUBCATEGORY:</span>
              <div className="subcat-bar-chips">
                {activeSubcategoriesList.map((sub) => (
                  <button
                    key={sub}
                    className={`btn-subcat-pill ${selectedSubcategoryFilter === sub ? 'active' : ''}`}
                    onClick={() => setSelectedSubcategoryFilter(sub)}
                  >
                    {sub === 'ALL' ? `All ${selectedCategoryFilter}` : sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="products-grid">
            {filteredProducts.map((prod) => {
              const isSaved = wishlist.includes(prod.id);
              return (
                <div className="product-card" key={prod.id}>

                  {/* Wishlist Button */}
                  <button
                    className={`bookmark-btn ${isSaved ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(prod.id);
                    }}
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
                    {prod.badge && <span className="product-badge">{prod.badge}</span>}
                    <div className="product-subcat-tag">
                      {prod.subcategory || prod.category}
                    </div>
                  </div>

                  {/* Product Details */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart && onAddToCart(prod);
                        }}
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

      {/* Craftsmanship Banner */}
      <section className="craftsmanship-banner">
        <div className="max-width-container">
          <div className="craftsmanship-grid">
            <div className="craft-item">
              <Gem className="text-gold" size={24} />
              <h4>TOPWEAR — 240+ GSM</h4>
              <p>Heavyweight French Terry tees, drop-shoulder fleece hoodies, and crewneck sweatshirts.</p>
            </div>
            <div className="craft-item">
              <Layers className="text-gold" size={24} />
              <h4>BOTTOM — TAILORED & LOUNGE</h4>
              <p>Heavyweight French Terry half pants and 6-pocket utility cargo full pants.</p>
            </div>
            <div className="craft-item">
              <Activity className="text-gold" size={24} />
              <h4>JERSEY — PRO ATHLETIC</h4>
              <p>Moisture-wicking aero-knit cricket, football match kits, basketball & hockey jerseys.</p>
            </div>
            <div className="craft-item">
              <ShieldCheck className="text-gold" size={24} />
              <h4>ACCESSORIES — BESPOKE</h4>
              <p>3D raised bullion caps, weatherproof ballistic crossbody bags, and ribbed cushion socks.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
