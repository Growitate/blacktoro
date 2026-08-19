import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({ activePage = 'home', onNavigate, cartCount, onOpenCart, onOpenSearch, onOpenAccount, onOpenStory }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId, sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
    if (pageId === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        COMPLIMENTARY EXPRESS SHIPPING ON ALL ORDERS OVER ₹2,500 &nbsp;|&nbsp; EXCLUSIVE LIMITED DROPS
      </div>

      {/* Main Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-width-container">
          <div className="navbar-inner">
            
            {/* Mobile Menu Button */}
            <button 
              className="icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Left Nav Links */}
            <nav className="nav-menu">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home', 'home'); }} 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              >
                HOME
              </a>
              <a 
                href="#collections" 
                onClick={(e) => { e.preventDefault(); handleNavClick('collections'); }} 
                className={`nav-link ${activePage === 'collections' ? 'active' : ''}`}
              >
                COLLECTIONS
              </a>
              <a 
                href="#shop" 
                onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }} 
                className={`nav-link ${activePage === 'shop' ? 'active' : ''}`}
              >
                SHOP
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} 
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              >
                ABOUT US
              </a>
            </nav>

            {/* Center Brand Logo */}
            <a 
              href="#home" 
              className="brand-logo-container" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home', 'home'); }}
            >
              <img 
                src="/assets/logo_transparent.png" 
                alt="BLACKTORO" 
                className="brand-logo-img"
              />
            </a>

            {/* Right Actions */}
            <div className="nav-actions">
              <button 
                className="icon-btn" 
                onClick={onOpenSearch} 
                title="Search"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button 
                className="icon-btn" 
                onClick={onOpenCart} 
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#FAFAFA',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-medium)',
            zIndex: 99
          }}>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="nav-link">HOME</a>
            <a href="#collections" onClick={(e) => { e.preventDefault(); handleNavClick('collections'); }} className="nav-link">COLLECTIONS</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }} className="nav-link">SHOP</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="nav-link">ABOUT US</a>
          </div>
        )}
      </header>
    </>
  );
}
