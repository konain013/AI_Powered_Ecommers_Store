import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { itemCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          E.stoRe
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ecommerceNavbar"
          aria-controls="ecommerceNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="ecommerceNavbar">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link px-2" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              {" "}
              <NavLink className="nav-link px-2" to="/cart">
                {" "}
                Cart 🛒{" "}
                {itemCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {" "}
                    {itemCount}{" "}
                  </span>
                )}{" "}
              </NavLink>{" "}
            </li>

            <li className="nav-item">
              <Link to="/login" className="navbar-action-btn login-btn">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
