import React from 'react';
import { Globe, Award, ShieldCheck, RotateCcw } from 'lucide-react';

export default function ShippingStrip() {
  const items = [
    {
      icon: <Globe size={22} className="shipping-icon" />,
      title: 'WORLDWIDE SHIPPING',
      sub: 'Fast & reliable delivery'
    },
    {
      icon: <Award size={22} className="shipping-icon" />,
      title: 'PREMIUM QUALITY',
      sub: 'Finest fabrics & craftsmanship'
    },
    {
      icon: <ShieldCheck size={22} className="shipping-icon" />,
      title: 'SECURE PAYMENTS',
      sub: '100% safe & secure'
    },
    {
      icon: <RotateCcw size={22} className="shipping-icon" />,
      title: 'EASY RETURNS',
      sub: 'Hassle-free returns'
    }
  ];

  return (
    <section className="shipping-strip">
      <div className="max-width-container">
        <div className="shipping-grid">
          {items.map((item, index) => (
            <div className="shipping-item" key={index}>
              {item.icon}
              <div>
                <div className="shipping-title">{item.title}</div>
                <div className="shipping-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
