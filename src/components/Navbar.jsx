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
            
            {/* Left Section: Mobile Toggle (Mobile) / Brand Logo (Desktop) */}
            <div className="nav-left">
              {/* Mobile Menu Button */}
              <button 
                className="icon-btn mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Desktop Brand Logo */}
              <a 
                href="#home" 
                className="brand-logo-container desktop-only-logo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home', 'home'); }}
              >
                <img 
                  src="/assets/logo_transparent.png" 
                  alt="BLACKTORO" 
                  className="brand-logo-img"
                />
              </a>
            </div>

            {/* Center Section: Desktop Nav Links (Desktop) / Centered Logo (Mobile) */}
            <div className="nav-center">
              {/* Mobile Centered Brand Logo */}
              <a 
                href="#home" 
                className="brand-logo-container mobile-only-logo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home', 'home'); }}
              >
                <img 
                  src="/assets/logo_transparent.png" 
                  alt="BLACKTORO" 
                  className="brand-logo-img"
                />
              </a>

              {/* Desktop Navigation Links */}
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
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} 
                  className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                >
                  ABOUT US
                </a>
              </nav>
            </div>

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
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              zIndex: 98,
              animation: 'fadeIn 0.2s ease'
            }}
          />
          {/* Drawer */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '80%',
            maxWidth: '320px',
            height: '100dvh',
            background: '#FAFAFA',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 99,
            boxShadow: '8px 0 40px rgba(0,0,0,0.18)',
            animation: 'slideInLeft 0.28s cubic-bezier(0.16,1,0.3,1)'
          }}>
            {/* Drawer Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <img src="/assets/logo_transparent.png" alt="BLACKTORO" style={{ height: '44px', width: 'auto' }} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-main)', padding: '8px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '16px 0', flex: 1 }}>
              {[
                { label: 'HOME', page: 'home' },
                { label: 'COLLECTIONS', page: 'collections' },
                { label: 'ABOUT US', page: 'about' },
              ].map(({ label, page }) => (
                <a
                  key={page}
                  href={`#${page}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(page); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '18px 28px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: activePage === page ? 'var(--gold-primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    borderLeft: activePage === page ? '3px solid var(--gold-primary)' : '3px solid transparent',
                    background: activePage === page ? 'rgba(197,160,89,0.06)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Bottom */}
            <div style={{
              padding: '20px 28px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.68rem',
              color: '#999999',
              letterSpacing: '0.1em'
            }}>
              THE HOUSE OF MODERN LEGACY
            </div>
          </div>
        </>
      )}
    </>
  );
}

