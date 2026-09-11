import React, { useState } from "react";

const Contact = () => {
  // form data store karne k liye
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // success message state
  const [submitted, setSubmitted] = useState(false);

  // input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);
    // form reset karo
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>

      {/* ======================== */}
      {/* HERO SECTION              */}
      {/* ======================== */}
      <div style={{ backgroundColor: "#1a1a2e" }} className="py-5">
        <div className="container text-center py-4">
          <h1 className="fw-bold display-5 text-white mb-3">
            Contact <span style={{ color: "black" }}>Us</span>
          </h1>
          <p className="lead mb-0" style={{ color: "#aaa" }}>
            Have a question? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">

          {/* ======================== */}
          {/* LEFT — Contact Info       */}
          {/* ======================== */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-4">Get In Touch</h4>
            {[
              { icon: "📍", title: "Address", info: "123 Shop Street, GB, Pakistan" },
              { icon: "📞", title: "Phone", info: "+92 300 0000000" },
              { icon: "📧", title: "Email", info: "support@shopEstore.com" },
              { icon: "🕐", title: "Working Hours", info: "Mon - Sat: 9AM - 6PM" },
            ].map((item) => (
              <div key={item.title} className="d-flex gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: "48px", height: "48px", backgroundColor: "#1a1a2e", fontSize: "1.2rem" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ======================== */}
          {/* RIGHT — Contact Form      */}
          {/* ======================== */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: "16px" }}>

              {/* success message */}
              {submitted && (
                <div className="alert alert-success" role="alert">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control py-2"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control py-2"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold text-white"
                      style={{ backgroundColor: "black", border: "none", borderRadius: "8px" }}
                    >
                      Send Message 📨
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;