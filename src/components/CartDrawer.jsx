import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onClearCart }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [orderId, setOrderId] = useState('');
  
  // Checkout form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi' // 'upi' | 'card' | 'cod'
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const freeShippingThreshold = 2500;
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) newErrors.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.pincode.trim() || formData.pincode.trim().length < 6) newErrors.pincode = 'Valid 6-digit pincode required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate reference Order ID
    const randomId = 'BT-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setStep('success');

    // Fire celebration confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#C5A059', '#E5C158', '#FFFFFF', '#0A0A0C']
    });
  };

  const handleFinish = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  const handleClose = () => {
    if (step === 'success') {
      onClearCart();
      setStep('cart');
    }
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={handleClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {step === 'checkout' ? (
              <button 
                type="button" 
                className="icon-btn" 
                onClick={() => setStep('cart')}
                style={{ padding: '4px', marginRight: '4px' }}
                aria-label="Back to Cart"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <ShoppingBag size={20} color="var(--gold-primary)" />
            )}
            
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800 }}>
              {step === 'cart' && `YOUR BAG (${cart.reduce((a, b) => a + b.qty, 0)})`}
              {step === 'checkout' && 'EXPRESS CHECKOUT'}
              {step === 'success' && 'ORDER CONFIRMED'}
            </h3>
          </div>

          <button className="icon-btn" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {step === 'cart' && (
          <>
            {/* Free Shipping Progress Bar */}
            <div style={{ padding: '12px 20px', background: '#141418', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '6px', color: '#D4AF37' }}>
                {shippingRemaining === 0 
                  ? '✓ UNLOCKED: COMPLIMENTARY EXPRESS SHIPPING' 
                  : `ADD ₹${shippingRemaining.toLocaleString()} MORE FOR FREE EXPRESS SHIPPING`}
              </div>
              <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${shippingProgress}%`, 
                  background: 'linear-gradient(90deg, #C5A059 0%, #E5C158 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Items List */}
            <div className="cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                    YOUR BAG IS EMPTY
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '6px', color: '#888' }}>
                    Explore iconic picks and add your legacy pieces.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={`${item.id}-${item.selectedSize}-${item.selectedColor || ''}`}>
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#8E8E98' }}>Size: {item.selectedSize || 'L'}</div>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                      
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty - 1)}>-</button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>{item.qty}</span>
                        <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                      </div>
                    </div>

                    <button 
                      className="icon-btn" 
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      style={{ color: '#666' }}
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
                  <span style={{ fontSize: '0.85rem', letterSpacing: '0.08em', color: '#B2B2BC' }}>SUBTOTAL</span>
                  <span style={{ color: '#FFFFFF' }}>₹{subtotal.toLocaleString()}</span>
                </div>

                <button 
                  className="btn-primary btn-gold-solid checkout-action-btn" 
                  onClick={handleProceedToCheckout}
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: LUXURY CHECKOUT FORM VIEW */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="checkout-step-container">
            <div className="checkout-drawer-scroll">
              {/* Order Summary Pill */}
              <div className="checkout-summary-box">
                <div className="checkout-items-preview">
                  <div className="checkout-thumbnails">
                    {cart.slice(0, 3).map((item, idx) => (
                      <img key={idx} src={item.image} alt={item.title} className="checkout-mini-thumb" />
                    ))}
                    {cart.length > 3 && (
                      <div className="checkout-more-count">+{cart.length - 3}</div>
                    )}
                  </div>
                  <div className="checkout-items-count-text">
                    {cart.reduce((a, b) => a + b.qty, 0)} {cart.reduce((a, b) => a + b.qty, 0) === 1 ? 'Piece' : 'Pieces'} in Order
                  </div>
                </div>

                <div className="checkout-summary-divider" />

                <div className="checkout-summary-row">
                  <span>Bag Value</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>Express Luxury Delivery</span>
                  <span className="free-shipping-tag">FREE</span>
                </div>
                <div className="checkout-summary-row total">
                  <span>Total Payable</span>
                  <span className="gold-amount">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Section 1: Delivery Details */}
              <div className="checkout-section-header">
                <div className="section-num-badge">01</div>
                <span className="section-title-text">DELIVERY ADDRESS</span>
              </div>

              <div className="checkout-fields-wrap">
                <div className="checkout-input-group">
                  <label className="checkout-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={`checkout-input ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && <span className="checkout-error-text">{errors.fullName}</span>}
                </div>

                <div className="checkout-input-group">
                  <label className="checkout-label">Mobile Number *</label>
                  <div className="phone-input-wrap">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`checkout-input phone-field ${errors.phone ? 'error' : ''}`}
                    />
                  </div>
                  {errors.phone && <span className="checkout-error-text">{errors.phone}</span>}
                </div>

                <div className="checkout-input-group">
                  <label className="checkout-label">Complete Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat / House No., Building, Street, Area"
                    className={`checkout-input ${errors.address ? 'error' : ''}`}
                  />
                  {errors.address && <span className="checkout-error-text">{errors.address}</span>}
                </div>

                <div className="checkout-grid-2">
                  <div className="checkout-input-group">
                    <label className="checkout-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="checkout-input"
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label className="checkout-label">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      maxLength={6}
                      className={`checkout-input ${errors.pincode ? 'error' : ''}`}
                    />
                    {errors.pincode && <span className="checkout-error-text">{errors.pincode}</span>}
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className="checkout-section-header" style={{ marginTop: '22px' }}>
                <div className="section-num-badge">02</div>
                <span className="section-title-text">PAYMENT METHOD</span>
              </div>

              <div className="payment-options-wrap">
                <label className={`payment-pill-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <div className="payment-radio-circle">
                    {formData.paymentMethod === 'upi' && <div className="payment-radio-dot" />}
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="upi" 
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                  />
                  <div className="payment-opt-icon-box">
                    <Smartphone size={17} color="#B8860B" />
                  </div>
                  <div className="payment-opt-text">
                    <div className="payment-opt-title-row">
                      <span className="payment-opt-name">UPI / Instant QR</span>
                      <span className="payment-badge-recom">RECOMMENDED</span>
                    </div>
                    <span className="payment-opt-sub">Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </label>

                <label className={`payment-pill-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <div className="payment-radio-circle">
                    {formData.paymentMethod === 'cod' && <div className="payment-radio-dot" />}
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                  />
                  <div className="payment-opt-icon-box">
                    <Banknote size={17} color="#B8860B" />
                  </div>
                  <div className="payment-opt-text">
                    <span className="payment-opt-name">Cash on Delivery (COD)</span>
                    <span className="payment-opt-sub">Pay safely upon doorstep delivery</span>
                  </div>
                </label>

                <label className={`payment-pill-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <div className="payment-radio-circle">
                    {formData.paymentMethod === 'card' && <div className="payment-radio-dot" />}
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                  />
                  <div className="payment-opt-icon-box">
                    <CreditCard size={17} color="#B8860B" />
                  </div>
                  <div className="payment-opt-text">
                    <span className="payment-opt-name">Card / Net Banking</span>
                    <span className="payment-opt-sub">Visa, Mastercard, RuPay, Netbanking</span>
                  </div>
                </label>
              </div>

              {/* Security Tag */}
              <div className="checkout-trust-badge">
                <ShieldCheck size={14} color="#B8860B" />
                <span>256-Bit SSL Encrypted • 100% Authentic Luxury Guarantee</span>
              </div>
            </div>

            {/* STICKY BOTTOM CHECKOUT ACTION FOOTER */}
            <div className="checkout-sticky-footer">
              <div className="checkout-footer-meta">
                <div className="footer-total-col">
                  <span className="footer-total-label">TOTAL PAYABLE</span>
                  <span className="footer-total-val">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="footer-delivery-tag">
                  <Truck size={12} color="#16A34A" />
                  <span>Free Express</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="checkout-place-order-btn"
                id="place-order-btn"
              >
                <span>PLACE ORDER</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER SUCCESS CONFIRMATION VIEW */}
        {step === 'success' && (
          <div className="order-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 size={40} color="#B8860B" />
            </div>

            <span className="success-pretitle">LUXURY ORDER CONFIRMED</span>
            <h2 className="success-title">THANK YOU FOR CHOOSING BLACKTORO</h2>
            
            <div className="success-order-box">
              <div className="success-order-row">
                <span className="label">Order Reference:</span>
                <span className="value gold">{orderId}</span>
              </div>
              <div className="success-order-row">
                <span className="label">Estimated Delivery:</span>
                <span className="value">3-5 Business Days (Express)</span>
              </div>
              <div className="success-order-row">
                <span className="label">Customer Name:</span>
                <span className="value">{formData.fullName || 'Valued Collector'}</span>
              </div>
              <div className="success-order-row">
                <span className="label">Payment Mode:</span>
                <span className="value">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Instant Online Paid'}</span>
              </div>
            </div>

            <p className="success-desc">
              Your garments have entered bespoke packaging and are queued for express courier dispatch. An SMS confirmation will be sent shortly.
            </p>

            <button 
              type="button" 
              className="btn-primary btn-gold-solid checkout-action-btn"
              onClick={handleFinish}
              style={{ marginTop: '24px' }}
            >
              <span>CONTINUE SHOPPING</span>
              <Sparkles size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
