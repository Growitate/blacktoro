import React from 'react';
import { Star, ShieldCheck, Users } from 'lucide-react';

export default function CredibilityBar() {
  return (
    <section className="credibility-bar credibility-bar-mockup">
      <div className="max-width-container">
        <div className="credibility-inner-mockup">
          
          {/* Press / Media Logos */}
          <div className="press-logos-row">
            <span className="press-logo-item font-gq">GQ</span>
            <span className="press-logo-item font-hypebeast">HYPEBEAST</span>
            <span className="press-logo-item font-fashion">FASHION INSIDER</span>
            <span className="press-logo-item font-highsnobiety">HIGH SNOBIETY</span>
            <span className="press-logo-item font-designboom">DESIGNBOOM</span>
          </div>

          <div className="credibility-vertical-divider"></div>

          {/* Social Proof & Trust Stats */}
          <div className="trust-stats-row">
            
            <div className="trust-stat-item">
              <Star size={16} className="trust-star-icon" fill="#C5A059" color="#C5A059" />
              <div className="trust-stat-content">
                <div className="trust-stat-val">4.8/5</div>
                <div className="trust-stat-lbl">Ratings</div>
              </div>
            </div>

            <div className="trust-stat-item">
              <ShieldCheck size={18} className="trust-shield-icon" />
              <div className="trust-stat-content">
                <div className="trust-stat-val">Premium Quality</div>
                <div className="trust-stat-lbl">Crafted to last</div>
              </div>
            </div>

            <div className="trust-stat-item">
              <Users size={18} className="trust-user-icon" />
              <div className="trust-stat-content">
                <div className="trust-stat-val">10K+</div>
                <div className="trust-stat-lbl">Happy Customers</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
