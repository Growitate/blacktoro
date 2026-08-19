import React from 'react';
import HeroSection from '../components/HeroSection';
import CredibilityBar from '../components/CredibilityBar';
import ValueGrid from '../components/ValueGrid';
import CollectionsSection from '../components/CollectionsSection';
import BestsellersSection from '../components/BestsellersSection';
import BrandStorySection from '../components/BrandStorySection';
import TieredPricingSection from '../components/TieredPricingSection';
import ShippingStrip from '../components/ShippingStrip';

export default function HomePage({ onAddToCart, onSelectProduct, onToggleWishlist, wishlist, onNavigate, onOpenStory }) {
  const scrollToShop = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      const el = document.getElementById('shop');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection 
        onExploreClick={scrollToShop}
        onSelectProduct={onSelectProduct}
      />

      {/* Press Marquee & Credibility */}
      <CredibilityBar />

      {/* Value Propositions */}
      <ValueGrid />

      {/* Collections Preview */}
      <CollectionsSection 
        onSelectCollection={() => onNavigate ? onNavigate('collections') : scrollToShop()}
      />

      {/* Bestsellers Section */}
      <BestsellersSection 
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* Brand Story Section */}
      <BrandStorySection 
        onOpenStory={() => onNavigate ? onNavigate('about') : onOpenStory()}
      />

      {/* Tiered Collections */}
      <TieredPricingSection 
        onShopTier={() => onNavigate ? onNavigate('collections') : scrollToShop()}
      />

      {/* Worldwide Shipping & Quality Bar */}
      <ShippingStrip />
    </div>
  );
}
