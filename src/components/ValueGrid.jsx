import React from 'react';
import { Gem, Crown, BookOpen, Shirt } from 'lucide-react';

export default function ValueGrid() {
  const values = [
    {
      icon: <Gem size={24} />,
      title: 'PREMIUM APPAREL',
      desc: 'Crafted with luxury fabrics and timeless design.'
    },
    {
      icon: <Crown size={24} />,
      title: 'LIMITED EDITIONS',
      desc: 'Exclusive drops inspired by stories that last.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'STORY DRIVEN',
      desc: 'Every piece carries a meaning. Every collection, a world.'
    },
    {
      icon: <Shirt size={24} />,
      title: 'PREMIUM STREETWEAR',
      desc: 'Modern silhouettes for everyday legends.'
    }
  ];

  return (
    <section className="value-props-section">
      <div className="max-width-container">
        <div className="value-grid">
          {values.map((v, idx) => (
            <div className="value-card" key={idx}>
              <div className="value-icon-wrap">
                {v.icon}
              </div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
