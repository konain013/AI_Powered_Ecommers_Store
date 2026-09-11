
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToCart(product);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-3 text-muted">
          Loading product...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold mb-3">Something went wrong</h3>

        <p className="text-muted mb-4">
          {error}
        </p>

        <button
          className="btn btn-dark px-4"
          onClick={() => navigate("/")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              maxHeight: "450px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="col-lg-6">
          <p className="text-muted text-uppercase mb-2">
            {product.category}
          </p>

          <h1 className="fw-bold mb-3">
            {product.title}
          </h1>

          <h3 className="fw-bold mb-4">
            ${Number(product.price).toFixed(2)}
          </h3>

          <p className="text-muted lh-lg mb-4">
            {product.description}
          </p>

          {product.rating && (
            <p className="mb-4">
              <strong>Rating:</strong>{" "}
              {product.rating.rate} / 5{" "}
              <span className="text-muted">
                ({product.rating.count} reviews)
              </span>
            </p>
          )}

          <div className="d-flex flex-column flex-sm-row gap-3">
            <button
              className="btn btn-outline-dark px-4 py-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-dark px-4 py-2"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

