import React from 'react';
import HeroSection from '../components/HeroSection';
import CollectionsSection from '../components/CollectionsSection';
import BestsellersSection from '../components/BestsellersSection';
import BrandStorySection from '../components/BrandStorySection';

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

      {/* Collections Preview */}
      <CollectionsSection
        onSelectCollection={(colName) => onNavigate ? onNavigate('collections') : scrollToShop()}
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
      />

      {/* Bestsellers Section */}
      <BestsellersSection
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onNavigate={onNavigate}
      />

      {/* Brand Story Section */}
      <BrandStorySection
        onOpenStory={() => onNavigate ? onNavigate('about') : onOpenStory()}
      />



      {/* Worldwide Shipping & Quality Bar */}
      <ShippingStrip />
    </div>
  );
}
