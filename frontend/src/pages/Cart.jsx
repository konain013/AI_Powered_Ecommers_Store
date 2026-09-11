import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    items,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Your Cart is Empty</h2>

        <p className="text-muted mb-4">
          You haven't added any products yet.
        </p>

        <Link to="/" className="btn btn-dark px-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Shopping Cart</h2>

        <button
          className="btn btn-outline-danger"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="card border-0 shadow-sm mb-3"
            >
              <div className="card-body">
                <div className="row align-items-center g-3">
                  <div className="col-3 col-md-2 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        height: "90px",
                        width: "90px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-9 col-md-4">
                    <h6 className="fw-semibold mb-1">
                      {item.title}
                    </h6>

                    <p className="text-muted mb-0">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="col-7 col-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span className="fw-semibold px-2">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-5 col-md-3 text-md-end">
                    <p className="fw-bold mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span className="fw-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                className="btn btn-dark w-100 py-2"
                disabled
              >
                Checkout — Coming Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;