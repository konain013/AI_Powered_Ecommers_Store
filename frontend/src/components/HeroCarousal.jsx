import React from "react";

const HeroCarousel = () => {
  return (
    <div id="heroSlider" className="carousel slide" data-bs-ride="carousel">
      
      {/* Niche wale Indicators (Dots) */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Slides Content */}
      <div className="carousel-inner">
        
        {/* Slide 1 */}
        <div className="carousel-item active" style={{ height: "60vh", backgroundColor: "#f0f0f0" }}>
          <div className="d-flex align-items-center justify-content-center h-100 text-center px-4">
            <div>
              <span className="badge bg-dark mb-3">NEW ARRIVALS</span>
              <h1 className="fw-bold display-4 text-black">Premium Electronics Collection</h1>
              <p className="text-muted lead">Upgrade your lifestyle with our top-tier gadgets.</p>
              <button className="btn btn-dark px-4 py-2 mt-2 fw-semibold">Shop Electronics</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item" style={{ height: "60vh", backgroundColor: "#e9ecef" }}>
          <div className="d-flex align-items-center justify-content-center h-100 text-center px-4">
            <div>
              <span className="badge bg-dark mb-3">TRENDING</span>
              <h1 className="fw-bold display-4 text-black">Modern Fashion & Clothing</h1>
              <p className="text-muted lead">Discover styles that match your unique personality.</p>
              <button className="btn btn-dark px-4 py-2 mt-2 fw-semibold">Explore Styles</button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item" style={{ height: "60vh", backgroundColor: "#e2e8f0" }}>
          <div className="d-flex align-items-center justify-content-center h-100 text-center px-4">
            <div>
              <span className="badge bg-dark mb-3">EXCLUSIVE DEAL</span>
              <h1 className="fw-bold display-4 text-black">Exquisite Jewelery & Accessories</h1>
              <p className="text-muted lead">Elegant designs crafted just for your special moments.</p>
              <button className="btn btn-dark px-4 py-2 mt-2 fw-semibold">View Collection</button>
            </div>
          </div>
        </div>

      </div>

      {/* Left/Right Control Arrows */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  );
};

export default HeroCarousel;