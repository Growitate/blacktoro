import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandStorySection({ onOpenStory }) {
  return (
    <section id="story" className="story-section">
      <div className="max-width-container">
        <div className="story-grid">
          
          {/* Left Dark Intro Card */}
          <div className="story-left-card">
            <span className="subhead-gold">OUR STORY</span>
            <h2 className="story-title">
              A LEGACY<br />
              REWRITTEN
            </h2>
            <p className="story-body">
              Born from a respect for history, symbolism, and timeless craftsmanship, Blacktoro creates pieces that connect heritage with evolution.
            </p>
            <button className="btn-outline" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={onOpenStory}>
              DISCOVER OUR STORY <ArrowRight size={16} />
            </button>
          </div>

          {/* 4 Moodboard Imagery Quad */}
          <div className="story-images-quad">
            <div className="story-quad-img-wrap">
              <img src="/assets/story_emboss.jpg" alt="Blacktoro Gold Bull Embossing" className="story-quad-img" />
            </div>

            <div className="story-quad-img-wrap">
              <img src="/assets/story_flag.jpg" alt="Blacktoro Heritage Flag" className="story-quad-img" />
            </div>

            <div className="story-quad-img-wrap">
              <img src="/assets/story_sketch.jpg" alt="Blacktoro Architectural Sketch" className="story-quad-img" />
            </div>

            <div className="story-quad-img-wrap">
              <img src="/assets/story_box.jpg" alt="Blacktoro Packaging" className="story-quad-img" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
