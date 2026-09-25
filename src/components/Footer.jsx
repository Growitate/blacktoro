import React, { useState } from 'react';
import { Send, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenStory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="max-width-container">
        
        {/* Footer Top Grid */}
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <img 
              src="/assets/logo_transparent.png" 
              alt="BLACKTORO" 
              style={{ height: '44px', width: 'auto' }}
            />
            <p className="footer-sub">
              A modern house of legacy where stories become symbols and symbols become timeless pieces.
            </p>
            
            {/* Social Links SVGs */}
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="X Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>

              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Youtube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="footer-col-title">STAY IN THE HOUSE</h4>
            <p style={{ fontSize: '0.78rem', color: '#888888', marginBottom: '14px' }}>
              Join for early access to drops, exclusive offers & stories.
            </p>
            
            {subscribed ? (
              <div style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                ✓ Welcome to the House of Blacktoro.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Submit newsletter">
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="#collections" className="footer-link-a">Collections</a></li>
              <li><a href="#shop" className="footer-link-a">Shop All</a></li>
              <li><a href="#story" className="footer-link-a" onClick={(e) => { e.preventDefault(); onOpenStory(); }}>Our Story</a></li>
              <li><a href="#contact" className="footer-link-a">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="footer-col-title">LEGAL</h4>
            <ul className="footer-links">
              <li><a href="#privacy" className="footer-link-a">Privacy Policy</a></li>
              <li><a href="#refund" className="footer-link-a">Refund Policy</a></li>
              <li><a href="#terms" className="footer-link-a">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-col-title">CONTACT</h4>
            <p style={{ fontSize: '0.78rem', color: '#888888', marginBottom: '8px' }}>
              BLACKTORO.OFFICIAL@GMAIL.COM
            </p>
            <p style={{ fontSize: '0.78rem', color: '#888888' }}>
              @blacktoroworld
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>© 2026 BLACKTORO. ALL RIGHTS RESERVED.</div>
          <div>CRAFTED FOR MODERN LEGACY</div>
          <a 
            href="https://growitate.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="built-by-growitate"
            title="Visit Growitate"
          >
            <span>BUILT BY</span> <span className="growitate-highlight">GROWITATE</span>
            <ArrowUpRight size={13} className="growitate-arrow" />
          </a>
        </div>

      </div>
    </footer>
  );
}
