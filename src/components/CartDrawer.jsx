import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const freeShippingThreshold = 2500;
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert('Thank you for choosing BLACKTORO! Your luxury order has been placed successfully.');
    onClearCart();
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>YOUR BAG</h3>
            <span style={{ fontSize: '0.75rem', color: '#777' }}>({cart.reduce((a, b) => a + b.qty, 0)} items)</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart drawer">
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '14px 24px', background: '#F8F6F2', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '6px', color: '#444' }}>
            {shippingRemaining === 0 
              ? '✓ YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!' 
              : `ADD ₹${shippingRemaining.toLocaleString()} MORE FOR FREE EXPRESS SHIPPING`}
          </div>
          <div style={{ height: '4px', background: '#E0DDD5', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${shippingProgress}%`, 
              background: 'var(--gold-gradient)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#333' }}>
                YOUR BAG IS EMPTY
              </div>
              <p style={{ fontSize: '0.8rem', marginTop: '6px' }}>Explore iconic picks and add your legacy pieces.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.selectedSize}`}>
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#777' }}>Size: {item.selectedSize || 'L'}</div>
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                  
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty - 1)}>-</button>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                  </div>
                </div>

                <button 
                  className="icon-btn" 
                  onClick={() => onRemoveItem(item.id, item.selectedSize)}
                  style={{ color: '#999' }}
                  title="Remove"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-drawer-foot">
            <div className="cart-total-row">
              <span>SUBTOTAL</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <button 
              className="btn-primary btn-gold-solid" 
              style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
