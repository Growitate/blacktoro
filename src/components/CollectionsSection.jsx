import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { productsData, collectionsData } from '../data/products';

export default function CollectionsSection({ onSelectCollection, onNavigate, onSelectProduct }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 4 curated showcase slides representing the core 4 categories (Optimized lightweight WebP for instant render)
  const slides = [
    {
      id: 'slide-1',
      badge: 'FEATURED ARCHIVE',
      title: 'TOPWEAR COLLECTION',
      image: '/assets/col_mob_topwear.webp',
      desktopImage: '/assets/col_desk_topwear.webp',
      collection: 'TOPWEAR',
      cta: 'Explore Topwear',
      imagePosition: 'center 25%',
      desktopImagePosition: 'center 35%'
    },
    {
      id: 'slide-2',
      badge: 'FEATURED ARCHIVE',
      title: 'BOTTOMWEAR DIVISION',
      image: '/assets/col_mob_bottom.webp',
      desktopImage: '/assets/col_desk_bottom.webp',
      collection: 'BOTTOM',
      cta: 'Explore Bottoms',
      imagePosition: 'center 30%',
      desktopImagePosition: 'center 40%'
    },
    {
      id: 'slide-3',
      badge: 'FEATURED ARCHIVE',
      title: 'PRO ATHLETIC JERSEY',
      image: '/assets/col_mob_jersey.webp',
      desktopImage: '/assets/col_desk_jersey.webp',
      collection: 'JERSEY',
      cta: 'Explore Jerseys',
      imagePosition: 'center 20%',
      desktopImagePosition: 'center 30%'
    },
    {
      id: 'slide-4',
      badge: 'FEATURED ARCHIVE',
      title: 'BESPOKE ACCESSORIES',
      image: '/assets/col_mob_accessories.webp',
      desktopImage: '/assets/col_desk_accessories.webp',
      collection: 'ACCESSORIES',
      cta: 'Explore Accessories',
      imagePosition: 'center 30%',
      desktopImagePosition: 'center 40%'
    }
  ];

  // Preload all slide images immediately for zero-delay instant switching
  useEffect(() => {
    slides.forEach((slide) => {
      const mob = new window.Image();
      mob.src = slide.image;
      if (slide.desktopImage) {
        const desk = new window.Image();
        desk.src = slide.desktopImage;
      }
    });
  }, []);

  // Next & Prev slide handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay slideshow with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleProductClick = (prod) => {
    const fullProd = productsData.find(p => p.id === prod.id) ||
      productsData.find(p => p.title.toLowerCase() === prod.name?.toLowerCase()) ||
      prod;
    if (onSelectProduct) {
      onSelectProduct(fullProd);
    } else if (onNavigate) {
      onNavigate('product');
    }
  };

  const handleShopNowClick = (colTarget) => {
    if (onNavigate) {
      onNavigate('collections');
    } else if (onSelectCollection) {
      onSelectCollection(colTarget || 'ALL');
    }
  };

  // 4 curated product items representing diverse categories
  const featuredProducts = [
    {
      id: 'topwear-plain-tee',
      name: 'PLAIN TEE',
      subtitle: '240 GSM French Terry • Topwear',
      price: '₹1,659',
      image: '/assets/core_plain_tee.jpg',
      badge: 'POPULAR'
    },
    {
      id: 'topwear-noir-hoodie',
      name: 'NOIR HOODIE',
      subtitle: '400 GSM French Fleece • Topwear',
      price: '₹2,499',
      image: '/assets/prod_noir.jpg',
      badge: 'LIMITED'
    },
    {
      id: 'bottom-cargo-pant',
      name: 'TACTICAL CARGO PANTS',
      subtitle: '340 GSM Heavy Twill • Bottom',
      price: '₹2,499',
      image: '/assets/cat_full_pant.jpg',
      badge: 'BESTSELLER'
    },
    {
      id: 'jersey-cricket-pro',
      name: 'CRICKET PRO JERSEY',
      subtitle: '220 GSM Aero-Knit • Jersey',
      price: '₹1,899',
      image: '/assets/prod_jersey_cricket.jpg',
      badge: 'PRO SERIES'
    }
  ];

  return (
    <section id="collections" className="wf-collections-section">
      {/* Top Header inside Container */}
      <div className="max-width-container">
        <div className="wf-side-header-wrap">
          <h2 className="wf-side-title">COLLECTIONS</h2>
        </div>
      </div>

      {/* Full Bleed Edge-to-Edge Poster Card Slideshow */}
      <div
        className="wf-poster-card wf-poster-slideshow wf-poster-fullbleed"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => handleShopNowClick(slides[currentSlide].collection)}
        role="region"
        aria-label="Featured Collection Slideshow"
      >
        {/* Background Slides */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`wf-poster-slide-bg ${idx === currentSlide ? 'active' : ''}`}
          >
            <picture className="wf-poster-picture">
              {slide.desktopImage && (
                <source media="(min-width: 769px)" srcSet={slide.desktopImage} />
              )}
              <img
                src={slide.image}
                alt={slide.title}
                className="wf-poster-slide-img"
                loading="eager"
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                style={{
                  objectPosition: slide.imagePosition || 'center 25%',
                  '--desktop-pos': slide.desktopImagePosition || 'center 35%'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/hero_bull_bg.jpg';
                }}
              />
            </picture>
            <div className="wf-poster-slide-overlay" />
          </div>
        ))}

        {/* Side Navigating Arrows */}
        <button
          className="wf-poster-nav-btn wf-poster-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          className="wf-poster-nav-btn wf-poster-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Foreground Content */}
        <div
          className="wf-poster-content"
          key={currentSlide}
        >
          <h2 className="wf-poster-title animate-slide-up">
            {slides[currentSlide].title}
          </h2>
          <button
            className="wf-poster-btn animate-fade-in"
            onClick={(e) => {
              e.stopPropagation();
              handleShopNowClick(slides[currentSlide].collection);
            }}
          >
            <span>{slides[currentSlide].cta}</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Lower Section Content inside Container */}
      <div className="max-width-container">
        <div className="wf-collections-wrapper">
          {/* Subheader Pill Action Bar */}
          <div className="wf-subbar-row">
            <div className="wf-pill-badge">
              <span>LATEST DROPS</span>
            </div>

            <button
              className="wf-pill-btn"
              onClick={() => onNavigate ? onNavigate('collections') : handleShopNowClick()}
            >
              <span>Discover all collections</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* 4 Arched Silhouette Product Cards Grid */}
          <div className="wf-arches-grid">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="wf-arch-card-container"
                onClick={() => handleProductClick(prod)}
                role="button"
                tabIndex={0}
                aria-label={`${prod.name} product`}
              >
                {/* Refined 3D Depth Shadow */}
                <div className="wf-arch-shadow-layer" />

                {/* Main Arched Card */}
                <div className="wf-arch-card">
                  {/* Full Bleed Arched Image Area */}
                  <div className="wf-arch-img-wrap">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="wf-arch-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/prod_mythos.jpg';
                      }}
                    />
                    {/* Top Minimal Badge */}
                    <div className="wf-arch-tag">{prod.badge}</div>

                    {/* Integrated Luxury Bottom Gradient Overlay */}
                    <div className="wf-arch-card-overlay">
                      <div className="wf-arch-info-top">
                        <span className="wf-arch-subhead">BLACKTORO</span>
                        <span className="wf-arch-cta-icon">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                      <h3 className="wf-arch-title">{prod.name}</h3>
                      <p className="wf-arch-sub">{prod.subtitle}</p>
                      <div className="wf-arch-footer-row">
                        <span className="wf-arch-gsm">{prod.price}</span>
                        <span className="wf-arch-explore-link">SHOP NOW →</span>
                      </div>
                    </div>
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
