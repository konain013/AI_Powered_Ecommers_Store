import React from "react";

const About = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>

      {/* ======================== */}
      {/* HERO SECTION              */}
      {/* ======================== */}
      <div
        style={{ backgroundColor: "#1a1a2e", color: "#fff" }}
        className="py-5"
      >
        <div className="container text-center py-4">
          <h1 className="fw-bold display-5 mb-3">
            About <span style={{ color: "black" }}>E.stoRe</span>
          </h1>
          <p className="lead mb-0" style={{ color: "#aaa", maxWidth: "600px", margin: "0 auto" }}>
            We believe shopping should be simple, fast, and enjoyable — for everyone.
          </p>
        </div>
      </div>

      {/* ======================== */}
      {/* OUR STORY                 */}
      {/* ======================== */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">
              Our <span style={{ color: "black" }}>Story</span>
            </h2>
            <p className="text-muted">
              E.store was founded with one simple goal — to make online shopping
              accessible, affordable, and enjoyable for everyone. We started small
              but grew quickly thanks to our amazing community of customers.
            </p>
            <p className="text-muted">
              Today, we offer thousands of products across multiple categories,
              all backed by our promise of quality and fast delivery.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <div
              className="rounded-4 p-5"
              style={{ backgroundColor: "#1a1a2e", color: "#fff", fontSize: "5rem" }}
            >
              🛍️
            </div>
          </div>
        </div>
      </div>

      {/* ======================== */}
      {/* STATS SECTION             */}
      {/* ======================== */}
      <div style={{ backgroundColor: "#1a1a2e" }} className="py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "50+", label: "Brands" },
              { number: "4.9⭐", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="col-6 col-md-3">
                <h2 className="fw-bold" style={{ color: "black" }}>
                  {stat.number}
                </h2>
                <p className="mb-0" style={{ color: "#aaa" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================== */}
      {/* WHY CHOOSE US             */}
      {/* ======================== */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5">
          Why Choose <span style={{ color: "black" }}>Us?</span>
        </h2>
        <div className="row g-4">
          {[
            { icon: "🚚", title: "Fast Delivery", desc: "Get your orders delivered to your doorstep within 2-3 business days." },
            { icon: "🔒", title: "Secure Payment", desc: "Your payment information is always safe and encrypted." },
            { icon: "↩️", title: "Easy Returns", desc: "Not satisfied? Return your order hassle-free within 30 days." },
            { icon: "🎧", title: "24/7 Support", desc: "Our support team is always here to help you anytime." },
          ].map((item) => (
            <div key={item.title} className="col-md-6 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100 text-center p-4"
                style={{ borderRadius: "16px" }}
              >
                <div style={{ fontSize: "2.5rem" }} className="mb-3">{item.icon}</div>
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     

      {/* ======================== */}
      {/* CTA SECTION               */}
      {/* ======================== */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Ready to Start Shopping?</h2>
        <p className="text-muted mb-4">
          Explore thousands of products at the best prices.
        </p>
        <a
          href="/"
          className="btn btn-lg px-5 py-2 text-white fw-semibold"
          style={{ backgroundColor: "black", border: "none", borderRadius: "30px" }}
        >
          Shop Now 🛍️
        </a>
      </div>

    </div>
  );
};

export default About;