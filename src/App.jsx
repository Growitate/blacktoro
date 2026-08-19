import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import AboutUsPage from './pages/AboutUsPage';

import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import StoryModal from './components/StoryModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([
    {
      id: 'prod-3',
      title: 'MYTHOS OVERSIZED TEE',
      price: 1659,
      image: '/assets/model_nobg.png',
      selectedSize: 'L',
      qty: 1
    }
  ]);
  const [wishlist, setWishlist] = useState(['prod-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Cart operations
  const handleAddToCart = (product) => {
    const size = product.selectedSize || 'L';
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      }
      return [...prev, { ...product, selectedSize: size, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, size, qty) => {
    if (qty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCart((prev) => prev.map((item) => 
      (item.id === id && item.selectedSize === size) ? { ...item, qty } : item
    ));
  };

  const handleRemoveItem = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operation
  const handleToggleWishlist = (id) => {
    setWishlist((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="app-main">
      
      {/* Top Navbar */}
      <Navbar 
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsStoryOpen(true)}
        onOpenStory={() => setActivePage('about')}
      />

      {/* Page Routing Views */}
      <main className="main-content-view">
        {activePage === 'home' && (
          <HomePage 
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={setActivePage}
            onOpenStory={() => setActivePage('about')}
          />
        )}

        {activePage === 'collections' && (
          <CollectionsPage 
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'shop' && (
          <CollectionsPage 
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPage 
            onNavigate={setActivePage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenStory={() => setActivePage('about')}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Story Modal */}
      <StoryModal 
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

    </div>
  );
}
