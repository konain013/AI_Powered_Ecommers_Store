import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
      <div className="custom-store-card mt-4">
        <div className="custom-img-box">
          <img
            src={product?.image}
            alt={product?.title}
            className="custom-product-img"
            loading="lazy"
          />
        </div>

        <div className="custom-card-body">
          <h5
            className="custom-card-title"
            title={product?.title}
          >
            {product?.title}
          </h5>

          <p className="custom-card-price">
            ${Number(product?.price || 0).toFixed(2)}
          </p>

          <div className="custom-btn-wrapper">
            <Link
              to={`/products/${product?.id}`}
              className="custom-btn-primary"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;