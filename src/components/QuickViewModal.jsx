import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart, onViewDetails }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] || 'L' : 'L');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({ ...product, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="drawer-backdrop qv-modal-backdrop" onClick={onClose}>
      <div 
        className="qv-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          className="qv-modal-close-btn" 
          onClick={onClose}
          aria-label="Close product modal"
        >
          <X size={18} />
        </button>

        {/* Product Image Column */}
        <div className="qv-modal-image-col">
          <img 
            src={product.image} 
            alt={product.title} 
            className="qv-modal-img"
          />
          {product.gsm && (
            <div className="qv-modal-gsm-badge">{product.gsm}</div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="qv-modal-info-col">
          <div className="qv-modal-eyebrow">
            BLACKTORO • {product.collection || 'CORE'}
          </div>

          <h2 className="qv-modal-title">
            {product.title}
          </h2>

          <div className="qv-modal-price-row">
            <span className="qv-modal-price">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="qv-modal-orig-price">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.originalPrice && (
              <span className="qv-modal-discount-tag">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="qv-modal-desc">
            {product.description || 'Premium heavyweight oversized silhouette crafted with high-density gold emblem embroidery and custom vintage wash.'}
          </p>

          {/* Size Selector */}
          <div className="qv-modal-size-section">
            <div className="qv-modal-size-header">
              <span>SELECT SIZE</span>
              <span className="qv-modal-size-guide-tag">{product.gsm || '240 GSM'}</span>
            </div>
            <div className="qv-modal-size-options">
              {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`qv-modal-size-btn ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Spec Note */}
          <div className="qv-modal-craft-note">
            <ShieldCheck size={16} color="#C5A059" />
            <div>
              <strong>Craftsmanship:</strong> {product.fabric || '240 GSM Heavyweight French Terry'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="qv-modal-actions">
            <button 
              className={`btn-primary qv-modal-add-btn ${added ? 'btn-gold-solid' : ''}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <Check size={18} /> ADDED TO BAG
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> ADD TO BAG • ₹{product.price.toLocaleString()}
                </>
              )}
            </button>

            {onViewDetails && (
              <button
                className="qv-modal-details-btn"
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
              >
                VIEW FULL PRODUCT DETAILS <ArrowRight size={14} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
