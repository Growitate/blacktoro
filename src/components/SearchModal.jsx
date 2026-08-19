import React, { useState } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { productsData } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = productsData.filter((p) => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.collection.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="drawer-backdrop" style={{ alignItems: 'flex-start', paddingTop: '80px' }} onClick={onClose}>
      <div 
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '680px',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: 'var(--shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Bar Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid var(--gold-primary)', paddingBottom: '12px', marginBottom: '20px' }}>
          <Search size={22} color="var(--gold-primary)" />
          <input 
            type="text" 
            placeholder="Search collections, tees, hoodies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-body)',
              width: '100%',
              background: 'transparent'
            }}
          />
          <button className="icon-btn" onClick={onClose} aria-label="Close search">
            <X size={22} />
          </button>
        </div>

        {/* Popular Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', alignSelf: 'center' }}>POPULAR:</span>
          {['MYTHOS', 'CHRONICLES', 'NOIR', 'HOODIES', 'SIGNATURE'].map((tag) => (
            <button 
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                background: '#F4F1EA',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '30px 0', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
              No products found matching "{query}"
            </div>
          ) : (
            filtered.map((prod) => (
              <div 
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F6F2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img src={prod.image} alt={prod.title} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 800 }}>{prod.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold-primary)' }}>₹{prod.price.toLocaleString()}</div>
                </div>
                <ShoppingBag size={16} color="#999" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
