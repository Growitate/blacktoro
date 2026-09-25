import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  Eye,
  Zap,
  Maximize2,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { productsData } from '../data/products';

export default function ProductDetailPage({
  productId,
  product: initialProduct,
  onBack,
  onAddToCart,
  onNavigate,
  onSelectProduct,
  wishlist = [],
  onToggleWishlist
}) {
  // Find product from props or by ID
  const product = initialProduct || productsData.find(p => p.id === productId) || productsData[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : 'Obsidian Black');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('fabric');
  const [unitMode, setUnitMode] = useState('in'); // 'in' or 'cm'

  // Touch Swipe Gesture State
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Zoom magnifier state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ name: '', rating: 5, size: 'L', title: '', comment: '' });
  const [userReviews, setUserReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyButtonRef = useRef(null);

  const isSaved = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    setSelectedSize(product.sizes ? product.sizes[1] || product.sizes[0] : 'L');
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product.id]);

  // Observer for sticky buy bar on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Touch Swipes for mobile image gallery
  const minSwipeDistance = 40;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && selectedImageIndex < images.length - 1) {
      // Swiped Left -> Next Image
      setSelectedImageIndex(prev => prev + 1);
    }
    if (distance < -minSwipeDistance && selectedImageIndex > 0) {
      // Swiped Right -> Prev Image
      setSelectedImageIndex(prev => prev - 1);
    }
  };

  // Handle Zoom lens (Desktop only)
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Add to Bag handler
  const handleAddToCartClick = () => {
    onAddToCart && onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      qty: quantity
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  // Instant Checkout / Buy It Now
  const handleBuyNow = () => {
    onAddToCart && onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      qty: quantity
    });
  };

  // Pincode validation
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 3);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const formattedDate = deliveryDate.toLocaleDateString('en-US', options);

      setPincodeStatus({
        valid: true,
        message: `Express Delivery by ${formattedDate} to ${pincode.trim()} | Free Shipping & COD Available`
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
    }
  };

  // Submit Review Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewFormData.name || !reviewFormData.comment) return;
    const newRev = {
      id: `rev-user-${Date.now()}`,
      author: reviewFormData.name,
      rating: Number(reviewFormData.rating),
      date: 'Just now',
      verified: true,
      sizePurchased: `Size ${reviewFormData.size}`,
      title: reviewFormData.title || 'Verified House Review',
      comment: reviewFormData.comment
    };
    setUserReviews([newRev, ...userReviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewFormData({ name: '', rating: 5, size: 'L', title: '', comment: '' });
    }, 1500);
  };

  // All reviews merged
  const allReviews = [...userReviews, ...(product.reviews || [])];

  // Related products
  const relatedProducts = productsData
    .filter(p => p.id !== product.id && (p.collection === product.collection || p.category === product.category))
    .slice(0, 4);

  // Complete the look product
  const completeLookProduct = productsData.find(p => p.id !== product.id) || productsData[1];

  return (
    <div className="product-detail-page">

      {/* Top Breadcrumb Navigation Bar */}
      <div className="pdp-top-bar">
        <div className="max-width-container">
          <div className="pdp-top-bar-inner">
            <button className="pdp-back-btn" onClick={onBack}>
              <ArrowLeft size={15} /> <span>BACK</span>
            </button>

            <nav className="pdp-breadcrumbs">
              <span onClick={() => onNavigate && onNavigate('home')}>HOME</span>
              <span className="sep">/</span>
              <span onClick={() => onNavigate && onNavigate('collections')}>COLLECTIONS</span>
              <span className="sep">/</span>
              <span className="current">{product.collection || 'CORE'}</span>
              <span className="sep">/</span>
              <span className="current active">{product.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <section className="pdp-main-section">
        <div className="max-width-container">
          <div className="pdp-layout-grid">

            {/* LEFT COLUMN: Multi-Angle Interactive Gallery */}
            <div className="pdp-gallery-col">
              
              {/* Desktop Thumbnail Strip */}
              <div className="pdp-thumbnails-strip">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`pdp-thumb-item ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>

              {/* Main Image Stage with Touch Swipe & Zoom */}
              <div
                className="pdp-main-image-stage"
                ref={imageContainerRef}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={images[selectedImageIndex] || product.image}
                  alt={product.title}
                  className="pdp-featured-img"
                  draggable={false}
                />

                {/* Overlays */}
                <div className="pdp-img-badge-top-left">
                  <span className="pdp-collection-chip">{product.collection || 'CORE'}</span>
                  {product.gsm && <span className="pdp-gsm-chip">{product.gsm}</span>}
                </div>

                <div className="pdp-img-actions-top-right">
                  <button
                    className={`pdp-wishlist-icon-btn ${isSaved ? 'active' : ''}`}
                    onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                    title={isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
                    aria-label="Wishlist"
                  >
                    <Heart size={18} fill={isSaved ? '#C5A059' : 'none'} color={isSaved ? '#C5A059' : '#FFFFFF'} />
                  </button>
                  <button
                    className="pdp-expand-icon-btn"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Fullscreen Preview"
                    aria-label="Fullscreen Preview"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>

                {/* Mobile Navigation Chevrons */}
                {images.length > 1 && (
                  <>
                    <button
                      className="pdp-gallery-nav-btn prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => Math.max(0, prev - 1));
                      }}
                      disabled={selectedImageIndex === 0}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      className="pdp-gallery-nav-btn next"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => Math.min(images.length - 1, prev + 1));
                      }}
                      disabled={selectedImageIndex === images.length - 1}
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Mobile Pagination Dots & Slide Counter */}
                <div className="pdp-mobile-pagination-bar">
                  <span className="pdp-mobile-counter">{selectedImageIndex + 1} / {images.length}</span>
                  <div className="pdp-mobile-dots">
                    {images.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        className={`pdp-mobile-dot ${selectedImageIndex === dotIdx ? 'active' : ''}`}
                        onClick={() => setSelectedImageIndex(dotIdx)}
                        aria-label={`Slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Magnifier Hover Lens Overlay (Desktop) */}
                {isZooming && (
                  <div
                    className="pdp-zoom-magnifier"
                    style={{
                      backgroundImage: `url(${images[selectedImageIndex] || product.image})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '250%'
                    }}
                  />
                )}

                <div className="pdp-zoom-hint">
                  <Eye size={13} /> Swipe or hover to zoom fabric
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Product Information & Purchase Controls */}
            <div className="pdp-info-col">

              {/* Badges & Live Activity */}
              <div className="pdp-header-meta">
                <div className="pdp-meta-tags">
                  <span className="pdp-badge-gold">{product.badge || 'CORE ESSENTIAL'}</span>
                  <span className="pdp-fabric-spec-tag">✨ {product.gsm || '240 GSM French Terry'}</span>
                </div>

                <div className="pdp-live-viewers">
                  <span className="pdp-pulse-dot" />
                  <span className="pdp-viewers-text"><strong>24 people</strong> viewing this drop</span>
                </div>
              </div>

              {/* Product Title & Subtitle */}
              <h1 className="pdp-product-title">{product.title}</h1>
              {product.tagline && <p className="pdp-product-tagline">{product.tagline}</p>}

              {/* Star Rating summary */}
              <div className="pdp-rating-row" onClick={() => {
                const el = document.getElementById('reviews-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                <div className="pdp-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#C5A059" color="#C5A059" />
                  ))}
                </div>
                <span className="pdp-rating-num">{product.rating || 4.9}</span>
                <span className="pdp-review-count">({allReviews.length || product.reviewsCount || 120} House Reviews)</span>
              </div>

              {/* Price Row with Discount Calculation */}
              <div className="pdp-price-container">
                <div className="pdp-price-main">
                  <span className="pdp-curr-price">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="pdp-orig-price">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  {product.originalPrice && (
                    <span className="pdp-discount-badge">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="pdp-tax-note">Inclusive of all taxes & complimentary luxury unboxing box</div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="pdp-option-group">
                  <div className="pdp-option-label-row">
                    <span className="pdp-option-title">COLORWAY</span>
                    <span className="pdp-option-val">{selectedColor}</span>
                  </div>
                  <div className="pdp-color-swatches">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        className={`pdp-color-swatch-btn ${selectedColor === c.name ? 'active' : ''}`}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                      >
                        <span className="pdp-color-circle" style={{ backgroundColor: c.hex }} />
                        <span className="pdp-color-name">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector & Size Guide */}
              <div className="pdp-option-group">
                <div className="pdp-option-label-row">
                  <span className="pdp-option-title">SELECT SIZE</span>
                  <button className="pdp-size-guide-trigger" onClick={() => setIsSizeGuideOpen(true)}>
                    <Ruler size={14} /> Size Guide & Measurements
                  </button>
                </div>

                <div className="pdp-size-pills-row">
                  {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                    <button
                      key={size}
                      className={`pdp-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="size-label">{size}</span>
                      {selectedSize === size && <span className="size-check"><Check size={12} /></span>}
                    </button>
                  ))}
                </div>

                {/* Fit Guide Note */}
                <div className="pdp-fit-note">
                  <Zap size={14} className="text-gold" />
                  <span><strong>Fit Profile:</strong> {product.fit || 'Oversized boxy drop-shoulder cut. Order true size.'}</span>
                </div>
              </div>

              {/* Stock Urgency Indicator */}
              <div className="pdp-stock-status">
                <span className="pdp-stock-pulse" />
                <span className="pdp-stock-msg">
                  {product.stockStatus || 'IN STOCK — Dispatches in 24h from House Atelier'}
                </span>
              </div>

              {/* Tiered Volume Discount Banner */}
              <div className="pdp-bundle-offer-card">
                <div className="pdp-bundle-head">
                  <Sparkles size={15} className="text-gold" />
                  <span>HOUSE CURATED DROPS BUNDLE</span>
                </div>
                <div className="pdp-bundle-tiers">
                  <div className="pdp-tier-pill active">
                    <strong>BUY 1</strong>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="pdp-tier-pill">
                    <strong>BUY 2</strong>
                    <span className="gold-text">₹2,999 (SAVE 10%)</span>
                  </div>
                  <div className="pdp-tier-pill">
                    <strong>BUY 3</strong>
                    <span className="gold-text">₹4,199 (SAVE 15%)</span>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Buy Actions */}
              <div className="pdp-actions-row" ref={buyButtonRef}>
                <div className="pdp-qty-stepper">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="pdp-qty-num">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  className={`pdp-add-bag-btn ${addedAnimation ? 'added' : ''}`}
                  onClick={handleAddToCartClick}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} /> ADDED TO BAG ({quantity})
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> ADD TO BAG • ₹{(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>

                <button
                  className="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                >
                  <Zap size={15} /> BUY IT NOW
                </button>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="pdp-pincode-card">
                <div className="pdp-pincode-title">
                  <Truck size={16} className="text-gold" />
                  <span>ESTIMATE EXPRESS DELIVERY</span>
                </div>
                <form className="pdp-pincode-form" onSubmit={handleCheckPincode}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="pdp-pincode-input"
                  />
                  <button type="submit" className="pdp-pincode-submit">
                    CHECK
                  </button>
                </form>
                {pincodeStatus && (
                  <div className={`pdp-pincode-result ${pincodeStatus.valid ? 'success' : 'error'}`}>
                    {pincodeStatus.valid ? <Check size={14} /> : <X size={14} />}
                    <span>{pincodeStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Value Props Strip */}
              <div className="pdp-trust-grid">
                <div className="pdp-trust-item">
                  <ShieldCheck size={18} className="text-gold" />
                  <div>
                    <h4>100% FRENCH TERRY</h4>
                    <p>Heavy combed cotton loopback</p>
                  </div>
                </div>
                <div className="pdp-trust-item">
                  <Truck size={18} className="text-gold" />
                  <div>
                    <h4>EXPRESS DISPATCH</h4>
                    <p>Within 24 hours nationwide</p>
                  </div>
                </div>
                <div className="pdp-trust-item">
                  <RotateCcw size={18} className="text-gold" />
                  <div>
                    <h4>7-DAY EXCHANGES</h4>
                    <p>Hassle-free size replacement</p>
                  </div>
                </div>
              </div>

              {/* Luxury Accordion Tabs */}
              <div className="pdp-accordions">

                {/* Tab 1: Fabric & Craftsmanship */}
                <div className={`pdp-accordion-item ${activeTab === 'fabric' ? 'open' : ''}`}>
                  <button
                    className="pdp-accordion-header"
                    onClick={() => setActiveTab(activeTab === 'fabric' ? '' : 'fabric')}
                  >
                    <span className="pdp-acc-title">FABRIC & CRAFTSMANSHIP</span>
                    {activeTab === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeTab === 'fabric' && (
                    <div className="pdp-accordion-body">
                      <p className="pdp-acc-desc">{product.description}</p>
                      <ul className="pdp-acc-list">
                        {(product.details || [
                          '240 GSM 100% Combed Compact Cotton',
                          'Heavyweight French Terry loopback interior',
                          'Signature high-density Bull logo execution',
                          'Pre-shrunk and bio-washed for superior handfeel',
                          '1.25" thick reinforced ribbed collar'
                        ]).map((item, idx) => (
                          <li key={idx}>
                            <span className="pdp-list-bullet">✦</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tab 2: Fit & Silhouette */}
                <div className={`pdp-accordion-item ${activeTab === 'fit' ? 'open' : ''}`}>
                  <button
                    className="pdp-accordion-header"
                    onClick={() => setActiveTab(activeTab === 'fit' ? '' : 'fit')}
                  >
                    <span className="pdp-acc-title">FIT & SILHOUETTE GUIDE</span>
                    {activeTab === 'fit' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeTab === 'fit' && (
                    <div className="pdp-accordion-body">
                      <p>
                        Engineered with drop shoulder seams and an elongated body proportion that creates a clean, structured fall without cling.
                      </p>
                      <div className="pdp-model-stat-box">
                        <strong>Model Reference:</strong> 6'1" (185 cm) / 78 kg wearing <strong>Size L</strong> for relaxed oversized drape.
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab 3: Care Instructions */}
                <div className={`pdp-accordion-item ${activeTab === 'care' ? 'open' : ''}`}>
                  <button
                    className="pdp-accordion-header"
                    onClick={() => setActiveTab(activeTab === 'care' ? '' : 'care')}
                  >
                    <span className="pdp-acc-title">CARE & PRESERVATION</span>
                    {activeTab === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeTab === 'care' && (
                    <div className="pdp-accordion-body">
                      <ul className="pdp-acc-list">
                        {(product.care || [
                          'Machine wash cold (30°C) inside out with dark colors',
                          'Use mild eco-friendly liquid detergent',
                          'Hang dry in shade — strictly do not tumble dry',
                          'Warm iron inside-out; do not iron over bull crest'
                        ]).map((c, idx) => (
                          <li key={idx}><span className="pdp-list-bullet">✦</span> {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tab 4: Shipping & Returns */}
                <div className={`pdp-accordion-item ${activeTab === 'shipping' ? 'open' : ''}`}>
                  <button
                    className="pdp-accordion-header"
                    onClick={() => setActiveTab(activeTab === 'shipping' ? '' : 'shipping')}
                  >
                    <span className="pdp-acc-title">SHIPPING & HOUSE GUARANTEE</span>
                    {activeTab === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeTab === 'shipping' && (
                    <div className="pdp-accordion-body">
                      <p>
                        All BLACKTORO drops are hand-inspected in our atelier and packaged in our luxury unboxing box with authenticity certificate.
                      </p>
                      <ul className="pdp-acc-list">
                        <li><span className="pdp-list-bullet">✦</span> Dispatched within 24 hours via Express Air</li>
                        <li><span className="pdp-list-bullet">✦</span> Free Delivery across all Indian states</li>
                        <li><span className="pdp-list-bullet">✦</span> 7-Day Doorstep Size Exchange & Return Policy</li>
                      </ul>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* House Craftsmanship Feature Banner */}
      <section className="pdp-craftsmanship-banner">
        <div className="max-width-container">
          <div className="pdp-craft-heading">
            <span className="gold-subhead">THE HOUSE STANDARD</span>
            <h2 className="pdp-craft-title">METICULOUS LUXURY CRAFT</h2>
          </div>

          <div className="pdp-craft-cards-grid">
            <div className="pdp-craft-card">
              <div className="pdp-craft-card-icon">
                <ShieldCheck size={28} color="#C5A059" />
              </div>
              <h3 className="pdp-craft-card-title">240 GSM FRENCH TERRY</h3>
              <p className="pdp-craft-card-desc">
                Proprietary heavyweight 100% combed cotton weave with dense loopback structure. Substantial drape that stays structured wash after wash.
              </p>
            </div>

            <div className="pdp-craft-card">
              <div className="pdp-craft-card-icon">
                <Sparkles size={28} color="#C5A059" />
              </div>
              <h3 className="pdp-craft-card-title">HIGH-DENSITY BULL CREST</h3>
              <p className="pdp-craft-card-desc">
                Stamped or embroidered with micro-tensile precision. Distinct metallic reflection that catches the ambient room light with subtle poise.
              </p>
            </div>

            <div className="pdp-craft-card">
              <div className="pdp-craft-card-icon">
                <RotateCcw size={28} color="#C5A059" />
              </div>
              <h3 className="pdp-craft-card-title">PRE-SHRUNK & BIO-WASHED</h3>
              <p className="pdp-craft-card-desc">
                Undergoes dual-phase heat stabilizing and enzyme bio-washing. Zero shrinkage, anti-pilling, and ultra-soft against the skin from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete The Look Cross-Sell Card */}
      {completeLookProduct && (
        <section className="pdp-complete-look-section">
          <div className="max-width-container">
            <div className="pdp-complete-look-box">
              <div className="pdp-complete-look-left">
                <span className="gold-subhead">STYLED BY THE HOUSE</span>
                <h3 className="pdp-complete-title">COMPLETE THE DROP</h3>
                <p className="pdp-complete-desc">
                  Pair your {product.title} with the companion {completeLookProduct.title} for the definitive BLACKTORO silhouette.
                </p>
                <div className="pdp-complete-price-row">
                  <span className="pdp-complete-price">₹{completeLookProduct.price.toLocaleString()}</span>
                  <button
                    className="pdp-complete-add-btn"
                    onClick={() => {
                      onAddToCart && onAddToCart({
                        ...completeLookProduct,
                        selectedSize: 'L',
                        qty: 1
                      });
                    }}
                  >
                    <ShoppingBag size={14} /> ADD COMPANION PIECE
                  </button>
                </div>
              </div>
              <div className="pdp-complete-look-right" onClick={() => onSelectProduct && onSelectProduct(completeLookProduct)}>
                <img src={completeLookProduct.image} alt={completeLookProduct.title} loading="lazy" />
                <div className="pdp-complete-badge">{completeLookProduct.title}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="pdp-reviews-section" id="reviews-section">
        <div className="max-width-container">
          <div className="pdp-reviews-header">
            <div>
              <span className="gold-subhead">VERIFIED REVIEWS</span>
              <h2 className="pdp-reviews-title">WHAT COLLECTORS SAY</h2>
            </div>
            <button
              className="pdp-write-review-btn"
              onClick={() => setIsReviewModalOpen(true)}
            >
              WRITE A HOUSE REVIEW
            </button>
          </div>

          {/* Rating Breakdown Summary Box */}
          <div className="pdp-ratings-overview-card">
            <div className="pdp-rating-big-score">
              <div className="pdp-score-val">{product.rating || 4.9}</div>
              <div className="pdp-score-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="#C5A059" color="#C5A059" />
                ))}
              </div>
              <div className="pdp-score-sub">Based on {allReviews.length || product.reviewsCount || 120} verified purchases</div>
            </div>

            <div className="pdp-rating-bars">
              {[
                { stars: '5 Star', pct: 92 },
                { stars: '4 Star', pct: 7 },
                { stars: '3 Star', pct: 1 },
                { stars: '2 Star', pct: 0 },
                { stars: '1 Star', pct: 0 }
              ].map((b) => (
                <div key={b.stars} className="pdp-bar-row">
                  <span className="pdp-bar-label">{b.stars}</span>
                  <div className="pdp-bar-track">
                    <div className="pdp-bar-fill" style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="pdp-bar-pct">{b.pct}%</span>
                </div>
              ))}
            </div>

            <div className="pdp-fit-verdict-card">
              <div className="pdp-verdict-title">SIZING VERDICT</div>
              <div className="pdp-verdict-pct">89%</div>
              <div className="pdp-verdict-desc">Voted True to Oversized Streetwear Fit</div>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="pdp-reviews-grid">
            {allReviews.map((rev) => (
              <div key={rev.id} className="pdp-review-card">
                <div className="pdp-rev-top">
                  <div className="pdp-rev-author">
                    <strong>{rev.author}</strong>
                    {rev.verified && <span className="pdp-verified-chip"><ShieldCheck size={12} /> Verified Collector</span>}
                  </div>
                  <div className="pdp-rev-date">{rev.date}</div>
                </div>

                <div className="pdp-rev-stars-row">
                  <div className="pdp-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill={s <= rev.rating ? '#C5A059' : '#333'} color={s <= rev.rating ? '#C5A059' : '#333'} />
                    ))}
                  </div>
                  {rev.sizePurchased && <span className="pdp-size-tag">{rev.sizePurchased}</span>}
                </div>

                <h4 className="pdp-rev-heading">{rev.title}</h4>
                <p className="pdp-rev-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products / More Drops */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related-section">
          <div className="max-width-container">
            <div className="pdp-related-head">
              <div>
                <span className="gold-subhead">MORE FROM THE ARCHIVE</span>
                <h2 className="pdp-related-title">COMPANION PIECES</h2>
              </div>
              <button className="pdp-view-all-btn" onClick={() => onNavigate && onNavigate('collections')}>
                VIEW ALL ARCHIVES →
              </button>
            </div>

            <div className="pdp-related-grid">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="product-card"
                  onClick={() => onSelectProduct && onSelectProduct(rel)}
                >
                  <div className="product-img-wrap">
                    <img src={rel.image} alt={rel.title} className="product-img" loading="lazy" />
                    {rel.badge && <span className="product-badge">{rel.badge}</span>}
                  </div>
                  <div className="product-info">
                    <span className="product-cat">{rel.gsm || rel.category || '240 GSM'}</span>
                    <h3 className="product-title">{rel.title}</h3>
                    <div className="product-footer-row">
                      <div className="product-price">₹{rel.price.toLocaleString()}</div>
                      <button
                        className="btn-add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart && onAddToCart(rel);
                        }}
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
      )}

      {/* SIZE GUIDE MODAL (Responsive Bottom-Sheet on Mobile) */}
      {isSizeGuideOpen && (
        <div className="pdp-modal-backdrop" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="pdp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="pdp-modal-drag-handle" />
            <button className="pdp-modal-close" onClick={() => setIsSizeGuideOpen(false)} aria-label="Close size guide">
              <X size={20} />
            </button>

            <div className="pdp-modal-head">
              <span className="gold-subhead">HOUSE SPECIFICATIONS</span>
              <h3 className="pdp-modal-title">SIZE & FIT CHART</h3>
              <p className="pdp-modal-desc">
                All BLACKTORO tees feature an oversized drop-shoulder fit.
              </p>
            </div>

            {/* Metric / Imperial Toggle */}
            <div className="pdp-unit-toggle-row">
              <span>UNITS:</span>
              <button
                className={`pdp-unit-btn ${unitMode === 'in' ? 'active' : ''}`}
                onClick={() => setUnitMode('in')}
              >
                INCHES (IN)
              </button>
              <button
                className={`pdp-unit-btn ${unitMode === 'cm' ? 'active' : ''}`}
                onClick={() => setUnitMode('cm')}
              >
                CENTIMETERS (CM)
              </button>
            </div>

            {/* Measurement Table */}
            <div className="pdp-table-wrap">
              <table className="pdp-size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST</th>
                    <th>LENGTH</th>
                    <th>SHOULDER</th>
                    <th>SLEEVE</th>
                  </tr>
                </thead>
                <tbody>
                  {(product.sizeChart || [
                    { size: 'S', chest: unitMode === 'in' ? '42 in' : '107 cm', length: unitMode === 'in' ? '28 in' : '71 cm', shoulder: unitMode === 'in' ? '21 in' : '53 cm', sleeve: unitMode === 'in' ? '24 in' : '61 cm' },
                    { size: 'M', chest: unitMode === 'in' ? '44 in' : '112 cm', length: unitMode === 'in' ? '29 in' : '74 cm', shoulder: unitMode === 'in' ? '22 in' : '56 cm', sleeve: unitMode === 'in' ? '24.5 in' : '62 cm' },
                    { size: 'L', chest: unitMode === 'in' ? '46 in' : '117 cm', length: unitMode === 'in' ? '30 in' : '76 cm', shoulder: unitMode === 'in' ? '23 in' : '58 cm', sleeve: unitMode === 'in' ? '25 in' : '64 cm' },
                    { size: 'XL', chest: unitMode === 'in' ? '48 in' : '122 cm', length: unitMode === 'in' ? '31 in' : '79 cm', shoulder: unitMode === 'in' ? '24 in' : '61 cm', sleeve: unitMode === 'in' ? '25.5 in' : '65 cm' },
                    { size: 'XXL', chest: unitMode === 'in' ? '50 in' : '127 cm', length: unitMode === 'in' ? '32 in' : '81 cm', shoulder: unitMode === 'in' ? '25 in' : '64 cm', sleeve: unitMode === 'in' ? '26 in' : '66 cm' }
                  ]).map((row) => (
                    <tr key={row.size} className={selectedSize === row.size ? 'active-row' : ''}>
                      <td><strong>{row.size}</strong></td>
                      <td>{unitMode === 'in' ? row.chest.split('(')[0] : (row.chest.includes('(') ? row.chest.split('(')[1].replace(')', '') : row.chest)}</td>
                      <td>{unitMode === 'in' ? row.length.split('(')[0] : (row.length.includes('(') ? row.length.split('(')[1].replace(')', '') : row.length)}</td>
                      <td>{unitMode === 'in' ? row.shoulder.split('(')[0] : (row.shoulder.includes('(') ? row.shoulder.split('(')[1].replace(')', '') : row.shoulder)}</td>
                      <td>{unitMode === 'in' ? row.sleeve.split('(')[0] : (row.sleeve.includes('(') ? row.sleeve.split('(')[1].replace(')', '') : row.sleeve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pdp-modal-fit-tips">
              <h4>✦ FIT RECOMMENDATION</h4>
              <p>
                <strong>Regular Fit:</strong> Size down 1 size for tailored cut.<br />
                <strong>Streetwear Oversized:</strong> Choose true size for intended drape.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="pdp-lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <button className="pdp-lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            <X size={24} />
          </button>
          <div className="pdp-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <img src={images[selectedImageIndex] || product.image} alt={product.title} />
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL (Responsive Bottom-Sheet on Mobile) */}
      {isReviewModalOpen && (
        <div className="pdp-modal-backdrop" onClick={() => setIsReviewModalOpen(false)}>
          <div className="pdp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="pdp-modal-drag-handle" />
            <button className="pdp-modal-close" onClick={() => setIsReviewModalOpen(false)} aria-label="Close review modal">
              <X size={20} />
            </button>

            <div className="pdp-modal-head">
              <span className="gold-subhead">COLLECTOR FEEDBACK</span>
              <h3 className="pdp-modal-title">WRITE A HOUSE REVIEW</h3>
              <p className="pdp-modal-desc">Share your experience with {product.title}.</p>
            </div>

            {reviewSubmitted ? (
              <div className="pdp-review-success">
                <Check size={36} color="#C5A059" />
                <h4>Thank you!</h4>
                <p>Your review has been verified and added to the House Archives.</p>
              </div>
            ) : (
              <form className="pdp-review-form" onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label>YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun M."
                    value={reviewFormData.name}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>RATING</label>
                  <div className="pdp-star-selector">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setReviewFormData({ ...reviewFormData, rating: st })}
                      >
                        <Star
                          size={24}
                          fill={st <= reviewFormData.rating ? '#C5A059' : 'none'}
                          color="#C5A059"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>SIZE ORDERED</label>
                  <select
                    value={reviewFormData.size}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, size: e.target.value })}
                  >
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                    <option value="XL">Size XL</option>
                    <option value="XXL">Size XXL</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>REVIEW TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Incredible fabric weight & drape"
                    value={reviewFormData.title}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>YOUR REVIEW</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the fabric feel, collar structure, fit and overall impression..."
                    value={reviewFormData.comment}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                  />
                </div>

                <button type="submit" className="pdp-submit-review-btn">
                  SUBMIT HOUSE REVIEW
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STICKY MOBILE BUY BAR */}
      <div className={`pdp-sticky-mobile-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="pdp-sticky-inner">
          <div className="pdp-sticky-info">
            <img src={images[0] || product.image} alt={product.title} />
            <div className="pdp-sticky-text-wrap">
              <div className="sticky-title">{product.title}</div>
              <div className="sticky-price">₹{product.price.toLocaleString()} <span className="sticky-size">({selectedSize})</span></div>
            </div>
          </div>

          <button className="pdp-sticky-btn" onClick={handleAddToCartClick}>
            <ShoppingBag size={15} /> <span>ADD TO BAG</span>
          </button>
        </div>
      </div>

    </div>
  );
}
