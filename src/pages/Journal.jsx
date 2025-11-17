import React from 'react';
import './Journal.css';
import { Link } from 'react-router-dom';

const Journal = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <img src="https://i.pinimg.com/736x/ec/17/5e/ec175e0b6e9f5f3b7876e57731433b4f.jpg" alt="Luxury Fashion Accessories" />
        <div className="hero-content">
          <div className="hero-overlay">
            <span className="hero-tag serif-font">Trending Now</span>
            <h1 className="hero-title">Luxury Accessories to Elevate Your Look</h1>
            <p className="hero-description sans-font">Discover timeless fashion accessories that redefine elegance and style for every occasion. From statement jewelry to luxury handbags.</p>
            <div className="hero-actions">
              <Link to="#categories" className="btn-primary">Explore Collection</Link>
              <Link to="#blogs" className="btn-secondary">Read Blog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories section-padding" id="categories">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="section-header text-center">
            <h2 className="section-title">Article Categories</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle sans-font">Explore our curated collection of luxury fashion accessories</p>
          </div>
          
          <div className="category-grid" style={{ justifyContent: 'center', width: '100%' }}>
            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/34/6c/62/346c62e1b5cf7919204a88e34aa246c4.jpg" alt="Jewelry Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-gem category-icon"></i>
                    <h3>Jewelry</h3>
                    <p className="sans-font">Trendy earrings, necklaces & bracelets that make a statement</p>
                    <Link to="/products/jewelry" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/d7/53/8b/d7538bebd8364836718f980f029988e7.jpg" alt="Fragrances Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-heart category-icon"></i>
                    <h3>Fragrances</h3>
                    <p className="sans-font">Perfumes to complete your personality and leave lasting impressions</p>
                    <Link to="/products/fragrances" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/01/1e/4c/011e4c417c5f45b336b43937cdb7ae5d.jpg" alt="Handbags Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-shopping-bag category-icon"></i>
                    <h3>Handbags</h3>
                    <p className="sans-font">Elegant handbags for every occasion and sophisticated lifestyle</p>
                    <Link to="/products/handbags" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/d0/4b/0d/d04b0d879bf337ffa70ff9bf3324b5f6.jpg" alt="Belts Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-belt category-icon"></i>
                    <h3>Belts</h3>
                    <p className="sans-font">Elevate your style with the timeless luxury of designer belts.</p>
                    <Link to="/products/belts" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/6c/d9/af/6cd9afde74fac4f765ba3b035f662826.jpg" alt="Sunglasses Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-sunglasses category-icon"></i>
                    <h3>Sunglasses</h3>
                    <p className="sans-font">Experience the perfect blend of elegance and luxury with designer sunglasses.</p>
                    <Link to="/products/sunglasses" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/a2/e4/11/a2e4112a1575929fdc74187c0fd62846.jpg" alt="Scarves Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-scarf category-icon"></i>
                    <h3>Scarves</h3>
                    <p className="sans-font">Wrap yourself in the effortless luxury of designer scarves.</p>
                    <Link to="/products/scarves" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="category-card">
              <div className="card-image">
                <img src="https://i.pinimg.com/736x/b3/8e/be/b38ebe9c4714eb6008eced29f906c7ee.jpg" alt="Watches Collection" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-clock category-icon"></i>
                    <h3>Watches</h3>
                    <p className="sans-font">Luxury watches to make a statement and define timeless elegance</p>
                    <Link to="/products/watches" className="category-btn">View Collection</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* Newsletter Section */}
      <section className="newsletter-section">
  <div className="newsletter-content">
    <div className="newsletter-text">
      <h2>Subscribe to our Newsletter</h2>
      <p className="sans-font">
        Get the latest updates on fashion trends, exclusive offers, and style tips directly to your inbox.
      </p>
    </div>

    <div className="newsletter-form-wrapper">
      <form className="form-container">
        <input type="email" placeholder="Enter your email address" required />
        <button type="submit">
          Subscribe <i className="fas fa-arrow-right"></i>
        </button>
      </form>

      <p className="subscribers-count sans-font">Join 10,000+ fashion enthusiasts</p>
    </div>
  </div>
</section>


      {/* Blog Section */}
      <section className="blogs section-padding" id="blogs">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="section-header text-center">
            <h2 className="section-title">Latest Blogs</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle sans-font">Stay updated with the latest fashion trends and styling tips</p>
          </div>
          
          <div className="blog-grid" style={{ justifyContent: 'center', width: '100%' }}>
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmh0Qdb7J3NI0VTRzco36gXKyEmhv7BfBs5g&s" alt="Jewelry Guide" />
                <div className="blog-category">Jewelry</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 15, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    5 min read
                  </span>
                </div>
                <h3 className="blog-title">10 Must-Have Jewelry Pieces</h3>
                <p className="blog-excerpt sans-font">Explore the most timeless jewelry items every woman should own in her collection for versatile styling.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCEaIKxhefUqsBpLCi296BF9uwjO9Pv2I9bQ&s" alt="Perfume Trends" />
                <div className="blog-category">Fragrances</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 12, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    7 min read
                  </span>
                </div>
                <h3 className="blog-title">Top Perfume Trends 2025</h3>
                <p className="blog-excerpt sans-font">From floral notes to bold fragrances, discover the scents making waves this year in the perfume world.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomt8SFuJ_R_94X3uBthGaceOhJdenn4bJr98uPt1NE_rYgVboW6thMqmOpAMf--zfg5M&usqp=CAU" alt="Handbag Guide" />
                <div className="blog-category">Handbags</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 10, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    6 min read
                  </span>
                </div>
                <h3 className="blog-title">Choosing the Perfect Handbag</h3>
                <p className="blog-excerpt sans-font">Find out how to pick handbags that complement your outfits and lifestyle perfectly every time.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxcO3wNktxvWN8xdeWR-EfTqNfhZreoOKH4A&s" alt="Luxury Watches" />
                <div className="blog-category">Watches</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 8, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    8 min read
                  </span>
                </div>
                <h3 className="blog-title">Luxury Watches for Women</h3>
                <p className="blog-excerpt sans-font">Explore the latest watch designs that are redefining elegance and sophistication in modern fashion.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx9homzBsD_zU15OvJt6n_TEI6oTRqf0wtJg&s" alt="Scarf Styling" />
                <div className="blog-category">Accessories</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 5, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    4 min read
                  </span>
                </div>
                <h3 className="blog-title">Styling with Scarves</h3>
                <p className="blog-excerpt sans-font">Learn creative ways to style scarves to instantly uplift your fashion game and add sophisticated touches.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="https://i.pinimg.com/736x/53/ab/6d/53ab6db29bb069cf6d85fea7e62efd2f.jpg" alt="Belt Styling" />
                <div className="blog-category">Belts</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 5, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    4 min read
                  </span>
                </div>
                <h3 className="blog-title">The Waist of Elegance</h3>
                <p className="blog-excerpt sans-font">Instantly refine your silhouette with belts that balance grace and edge.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>

            <article className="blog-card featured-post">
              <div className="blog-image">
                <img src="https://i.pinimg.com/736x/33/25/41/332541aaaf10ccc686995d84db19f3a5.jpg" alt="Fashion Trends 2025" />
                <div className="blog-category featured">Featured</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta sans-font">
                  <span className="blog-date">
                    <i className="fas fa-calendar"></i>
                    March 18, 2025
                  </span>
                  <span className="blog-read-time">
                    <i className="fas fa-clock"></i>
                    10 min read
                  </span>
                </div>
                <h3 className="blog-title">Fashion Forecast: What's Next in Luxury Accessories</h3>
                <p className="blog-excerpt sans-font">A comprehensive look at emerging trends that will define luxury fashion accessories in the coming seasons.</p>
                <a href="#" className="blog-link text-underline">Read More</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Journal;