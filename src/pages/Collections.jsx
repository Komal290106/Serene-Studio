import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Collections.css';

const Collections = () => {
  useEffect(() => {
    // Color stories carousel navigation
    const dots = document.querySelectorAll('.nav-dot');
    const cards = document.querySelectorAll('.color-card');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        cards.forEach(c => c.classList.remove('active'));
        
        dot.classList.add('active');
        if (cards[index]) {
          cards[index].classList.add('active');
          cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      });
    });

    // Add subtle animation to mood cards on scroll
    const moodCards = document.querySelectorAll('.mood-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    moodCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="collections-page">
      {/* Font Awesome & Google Fonts */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      
      {/* Hero Section */}
      <section className="collections-hero">
        <div className="hero-background-pattern"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Curated Elegance, Defined by You.</h1>
            <div className="gold-divider"></div>
            <p className="hero-subtitle">Discover timeless edits and mood-based collections crafted to elevate every moment.</p>
            <button className="hero-btn">
              <span>Explore Collections</span>
            </button>
          </div>
        </div>
        <div className="luxury-ornament ornament-1">
          <svg viewBox="0 0 100 100" className="ornament-svg">
            <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.6"/>
            <circle cx="30" cy="50" r="1" fill="currentColor" opacity="0.4"/>
            <circle cx="70" cy="50" r="1" fill="currentColor" opacity="0.4"/>
            <circle cx="50" cy="30" r="1" fill="currentColor" opacity="0.4"/>
            <circle cx="50" cy="70" r="1" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        <div className="luxury-ornament ornament-2">
          <svg viewBox="0 0 100 100" className="ornament-svg">
            <polygon points="50,10 60,40 90,40 70,60 80,90 50,75 20,90 30,60 10,40 40,40" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
      </section>

      {/* Featured Moods Grid */}
      <section className="moods-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-ornament">
              <div className="ornament-line left"></div>
              <div className="ornament-center">
                <i className="fas fa-gem"></i>
              </div>
              <div className="ornament-line right"></div>
            </div>
            <h2>Discover Your Mood</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">Each collection captures a feeling, a moment, a story waiting to be lived</p>
          </div>

          <div className="moods-grid">
            {/* The Dreamer */}
            <div className="mood-card" data-mood="dreamer">
              <div className="mood-image dreamer-bg">
                <div className="mood-texture"></div>
                <div className="mood-overlay"></div>
                <div className="mood-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="card-shimmer"></div>
              </div>
              <div className="mood-content">
                <h3 className="mood-title">The Dreamer</h3>
                <p className="mood-description">Soft pastels, airy scarves & dainty jewelry for whimsical souls.</p>
                <Link to="/products/scarves" className="mood-btn">
                  <span>Explore Dreamer</span>
                </Link>
              </div>
            </div>

            {/* The Minimalist */}
            <div className="mood-card" data-mood="minimalist">
              <div className="mood-image minimalist-bg">
                <div className="mood-texture"></div>
                <div className="mood-overlay"></div>
                <div className="mood-icon">
                  <i className="fas fa-circle"></i>
                </div>
                <div className="card-shimmer"></div>
              </div>
              <div className="mood-content">
                <h3 className="mood-title">The Minimalist</h3>
                <p className="mood-description">Subtle, clean fragrances with airy notes that define effortless elegance.</p>
                <Link to="/products/perfumes" className="mood-btn">
                  <span>Explore Minimalist</span>
                </Link>
              </div>
            </div>

            {/* The Power Dresser */}
            <div className="mood-card" data-mood="power">
              <div className="mood-image power-bg">
                <div className="mood-texture"></div>
                <div className="mood-overlay"></div>
                <div className="mood-icon">
                  <i className="fas fa-crown"></i>
                </div>
                <div className="card-shimmer"></div>
              </div>
              <div className="mood-content">
                <h3 className="mood-title">The Power Dresser</h3>
                <p className="mood-description">Bold silhouettes & statement accents for your confident days.</p>
                <Link to="/products/watches" className="mood-btn">
                  <span>Explore Power</span>
                </Link>
              </div>
            </div>

            {/* The Wanderer */}
            <div className="mood-card" data-mood="wanderer">
              <div className="mood-image wanderer-bg">
                <div className="mood-texture"></div>
                <div className="mood-overlay"></div>
                <div className="mood-icon">
                  <i className="fas fa-compass"></i>
                </div>
                <div className="card-shimmer"></div>
              </div>
              <div className="mood-content">
                <h3 className="mood-title">The Wanderer</h3>
                <p className="mood-description">Stylish travel bags, versatile carry-ons & adventure-ready essentials.</p>
                <Link to="/products/handbags" className="mood-btn">
                  <span>Explore Wanderer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Moodboard Section */}
      <section className="lifestyle-moodboard">
        <div className="moodboard-container">
          <div className="moodboard-images">
            <div className="moodboard-image img-1">
              <div className="image-overlay"></div>
            </div>
            <div className="moodboard-image img-2">
              <div className="image-overlay"></div>
            </div>
            <div className="moodboard-image img-3">
              <div className="image-overlay"></div>
            </div>
          </div>
          <div className="moodboard-overlay">
            <div className="moodboard-content">
              <div className="quote-ornament">
                <div className="quote-mark">"</div>
              </div>
              <h3 className="moodboard-quote" style={{color: 'white'}}>
                Every collection is a story.<br />Every accessory, a chapter.
              </h3>
              <a href="/handbags" className="moodboard-btn">
                <span style={{color: 'white'}}>Shop the Look</span>
                <i className="fas fa-arrow-right" style={{color: 'white'}}></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Color Story Showcase */}
      <section className="color-stories section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-ornament">
              <div className="ornament-line left"></div>
              <div className="ornament-center">
                <i className="fas fa-palette"></i>
              </div>
              <div className="ornament-line right"></div>
            </div>
            <h2>Color Stories</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">Curated palettes that speak to your soul and complement your unique essence</p>
          </div>

          <div className="color-carousel">
            {/* Golden Hour Glow */}
            <Link to="/products/jewelry" className="color-card active" data-color="golden">
              <div className="color-card active" data-color="golden">
                <div className="color-preview">
                  <img src="data:image/jpeg;base64,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" 
                       alt="Golden Hour Glow" 
                       className="color-preview-img"/>
                  <div className="color-icon">
                    <i className="fas fa-sun"></i>
                  </div>
                </div>
                <div className="color-info">
                  <h4 className="color-name">Golden Hour Glow</h4>
                  <p className="color-desc">Luminous gold pieces for radiant evenings.</p>
                  <div className="color-palette">
                    <span className="color-dot" style={{backgroundColor: '#FFD700'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#FFA500'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#DAA520'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#B8860B'}}></span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Pastel Daydreams */}
            <Link to="/products/handbags" className="color-card active" data-color="pastel">
              <div className="color-card active" data-color="pastel">
                <div className="color-preview">
                  <img src="https://i.pinimg.com/736x/cb/ac/ec/cbacec78ecbd6c6cc47f1dd1f2a7f31b.jpg" 
                       alt="Pastel Daydreams" 
                       className="color-preview-img"/>
                  <div className="color-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                </div>
                <div className="color-info">
                  <h4 className="color-name">Pastel Daydreams</h4>
                  <p className="color-desc">Soft tones that speak serenity.</p>
                  <div className="color-palette">
                    <span className="color-dot" style={{backgroundColor: '#FFB6C1'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#E6E6FA'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#F0F8FF'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#F5F5DC'}}></span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Midnight Noir */}
            <Link to="/products/sunglasses" className="color-card active" data-color="noir">
              <div className="color-card active" data-color="noir">
                <div className="color-preview">
                  <img src="https://cdn.luxe.digital/media/20220221165101/best-men-sunglasses-randolph-engineering-luxe-digital.jpg" 
                       alt="Midnight Noir" 
                       className="color-preview-img"/>
                  <div className="color-icon">
                    <i className="fas fa-moon"></i>
                  </div>
                </div>
                <div className="color-info">
                  <h4 className="color-name">Midnight Noir</h4>
                  <p className="color-desc">Dark, bold, and endlessly elegant.</p>
                  <div className="color-palette">
                    <span className="color-dot" style={{backgroundColor: '#000000'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#2F2F2F'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#4A4A4A'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#696969'}}></span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Ocean Blues */}
            <Link to="/products/perfumes" className="color-card active" data-color="ocean">
              <div className="color-card active" data-color="ocean">
                <div className="color-preview">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXOuxdQjXAt4GfbZOlYSco9kQSrGPf12CZBg&s" 
                       alt="Ocean Blues" 
                       className="color-preview-img"/>
                  <div className="color-icon">
                    <i className="fas fa-water"></i>
                  </div>
                </div>
                <div className="color-info">
                  <h4 className="color-name">Ocean Blues</h4>
                  <p className="color-desc">Deep blue tones inspired by the sea.</p>
                  <div className="color-palette">
                    <span className="color-dot" style={{backgroundColor: '#1E90FF'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#4169E1'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#000080'}}></span>
                    <span className="color-dot" style={{backgroundColor: '#00BFFF'}}></span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="carousel-nav">
            <button className="nav-dot active" data-slide="0"></button>
            <button className="nav-dot" data-slide="1"></button>
            <button className="nav-dot" data-slide="2"></button>
            <button className="nav-dot" data-slide="3"></button>
          </div>
        </div>
      </section>

      {/* Enhanced Closing CTA Section */}
      <section className="enhanced-cta">
        <i className="fas fa-gem floating-element floating-1"></i>
        <i className="fas fa-star floating-element floating-2"></i>
        <i className="fas fa-crown floating-element floating-3"></i>
        
        <div className="cta-content">
          <h2 className="cta-title" style={{color: '#F0F8FF'}}>Create Your Signature Style</h2>
          <div className="gold-divider"></div>
          <p className="cta-subtitle" style={{color: 'beige'}}>
            Join our exclusive community and receive personalized styling advice, early access to new collections, and special members-only events.
          </p>
          <button className="cta-btn">
            <span>Become a Member</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collections;