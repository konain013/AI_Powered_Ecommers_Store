
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto text-white"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold mb-3">E.stoRe</h4>

            <p className="text-white-50 mb-0">
              A modern e-commerce experience built with React,
              Node.js, Express and MongoDB.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Shop</h6>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a
                  href="/"
                  className="text-white-50 text-decoration-none"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/cart"
                  className="text-white-50 text-decoration-none"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Company</h6>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a
                  href="/about"
                  className="text-white-50 text-decoration-none"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-white-50 text-decoration-none"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Connect</h6>

            <div className="d-flex gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-none"
                aria-label="GitHub"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-none"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-white-50">
          <small>
            © {year} E.stoRe. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
