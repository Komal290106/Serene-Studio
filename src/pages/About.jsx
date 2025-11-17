import React, { useState } from 'react';
import "./About.css";

const About = () => {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const handleDiscoverMore = () => {
    // Scroll to the "Our Story" section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setShowSubscriptionPopup(true);
    
    // Auto-hide the popup after 3 seconds
    setTimeout(() => {
      setShowSubscriptionPopup(false);
    }, 3000);
  };

  const closePopup = () => {
    setShowSubscriptionPopup(false);
  };

  return (
    <div className="about-page">
      {/* Subscription Popup */}
      {showSubscriptionPopup && (
        <div className="subscription-popup" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>
              <i className="fas fa-times"></i>
            </button>
            <div className="popup-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Subscribed Successfully!</h3>
            <p>Thank you for joining our fashion community. You'll receive our latest updates soon.</p>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <img src="https://i.pinimg.com/1200x/23/7f/1e/237f1e3b6dafa3d0b1a82aa08daaf939.jpg"></img>
        <div className="hero-content">
          <h1>Serene Studio</h1>
          <div className="gold-divider"></div>
          <p>Where Fashion Meets Elegance. Redefining accessories for the modern world.</p>
          <button className="btn btn-accent" onClick={handleDiscoverMore}>
            Discover More
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <img src="https://i.pinimg.com/736x/10/a1/25/10a1253d781c56d33b7190887d5dbf04.jpg" alt="Fashion Studio" />
        <div className="about-text">
          <h2>Our Story</h2>
          <p>At Serena Studio, we blend timeless craftsmanship with modern aesthetics. Each piece is designed to bring out individuality and confidence, whether it's a luxurious belt, a pair of stylish sunglasses, or a silk scarf.</p>
          <p>Founded with a passion for style and detail, our mission is to empower people with fashion that <br></br>louder than words.</p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission">
        <h2>Our Mission & Values</h2>
        <div className="values">
          <div className="value-card">
            <i className="fas fa-gem"></i>
            <h3>Quality</h3>
            <p>Uncompromised craftsmanship & premium materials.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation</h3>
            <p>Designs that blend tradition with bold modernity.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-crown"></i>
            <h3>Elegance</h3>
            <p>Accessories that define grace and sophistication.</p>
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="journey">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="step">
            <h4>2015</h4>
            <p>Founded with a small boutique in Milan</p>
          </div>
          <div className="step">
            <h4>2017</h4>
            <p>Launched our first international collection</p>
          </div>
          <div className="step">
            <h4>2019</h4>
            <p>Opened flagship stores in Paris and New York</p>
          </div>
          <div className="step">
            <h4>2022</h4>
            <p>Recognized with the International Design Award</p>
          </div>
          <div className="step">
            <h4>2024</h4>
            <p>Expanded to over 50 countries worldwide</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>"Absolutely in love with my Serena Studio scarf – pure elegance!"</p>
            <h4>- Priya Malhotra</h4>
          </div>
          <div className="testimonial">
            <p>"The quality is unmatched. These accessories truly complete my look."</p>
            <h4>- Aarav Mehta</h4>
          </div>
          <div className="testimonial">
            <p>"Innovative designs, luxurious feel – Serena Studio is my go-to brand."</p>
            <h4>- Sarah Kapoor</h4>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team">
        <h2>Meet Our Creative Team</h2>
        <div className="team-members">
          <div className="member">
            <img className="member-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcO1j4ProyLHGYlVX_hK6NL5T8NNUjX0pUkifyN9zLXUOunGqEOOnTx8PFxoR4ZPGiTI&usqp=CAU" alt="Komal Kaur Dhillon" />
            <h4>Komal Kaur Dhillon</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="member">
            <img className="member-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqDYPCxorcruog4EcaUefZo1c4bx4-Nk_ahcNDK2lS4SZWSyFkT_oIaShejdd30f6fQI&usqp=CAU" alt="Dolisha Arora" />
            <h4>Dolisha Arora</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="member">
            <img className="member-img" src="https://t4.ftcdn.net/jpg/11/57/72/95/360_F_1157729568_bzWI9dV4PoA1URwoIwgqeXO50BhQ3kfR.jpg" alt="Devyani Salwan" />
            <h4>Devyani Salwan</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="member">
            <img className="member-img" src="https://img.favpng.com/11/4/15/3d-woman-avatar-animated-woman-with-curly-hair-in-3d-style-EMRFxFJ4_t.jpg" alt="Anshika" />
            <h4>Anshika</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
    <section className="newsletter-section">
  <div className="newsletter-container">
    <h2>Join Our Fashion Community</h2>
    <div className="underline"></div>
    <p className="subtitle">Stay updated with the latest collections, trends & exclusive offers.</p>
    <form className="form-container" onSubmit={handleSubscribe}>
      <input type="email" placeholder="Enter your email" required />
      <button type="submit">SUBSCRIBE</button>
    </form>
  </div>
</section>
</div>
  );
};

export default About;