import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import AboutUsPage from './pages/AboutUsPage';
import ProductDetailPage from './pages/ProductDetailPage';

import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import StoryModal from './components/StoryModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [cart, setCart] = useState([
    {
      id: 'core-plain-tee',
      title: 'PLAIN TEE',
      price: 1659,
      image: '/assets/core_plain_tee.jpg',
      selectedSize: 'L',
      selectedColor: 'Obsidian Black',
      qty: 1
    }
  ]);
  const [wishlist, setWishlist] = useState(['core-plain-tee', 'prod-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Navigate to full Product Detail Page
  const handleOpenProduct = (product) => {
    setPreviousPage(activePage);
    setSelectedProduct(product);
    setActivePage('product');
  };

  // Cart operations
  const handleAddToCart = (product) => {
    const size = product.selectedSize || 'L';
    const color = product.selectedColor || 'Obsidian Black';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += (product.qty || 1);
        return updated;
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, qty: product.qty || 1 }];
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
        onNavigate={(page) => {
          setSelectedProduct(null);
          setActivePage(page);
        }}
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
            onSelectProduct={handleOpenProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={setActivePage}
            onOpenStory={() => setActivePage('about')}
          />
        )}

        {(activePage === 'collections' || activePage === 'shop') && (
          <CollectionsPage
            onAddToCart={handleAddToCart}
            onSelectProduct={handleOpenProduct}
            onNavigate={setActivePage}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPage
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            productId={selectedProduct.id}
            onBack={() => setActivePage(previousPage || 'collections')}
            onAddToCart={handleAddToCart}
            onNavigate={setActivePage}
            onSelectProduct={handleOpenProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
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
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleOpenProduct}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          setIsSearchOpen(false);
          handleOpenProduct(prod);
        }}
      />

      {/* Story Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

    </div>
  );
}
