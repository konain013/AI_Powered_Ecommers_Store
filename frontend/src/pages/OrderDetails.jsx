
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/orders/${id}`);

        setOrder(response.data.order);
      } catch (error) {
        console.error("Fetch order error:", error);

        toast.error(
          error.response?.data?.message ||
          "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold mb-3">Order Not Found</h3>
        <p className="text-muted mb-4">
          Unable to find this order.
        </p>
        <button
          className="btn btn-dark px-4"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Order Details</h2>
        <p className="text-muted mb-0">
          Your order has been placed successfully.
        </p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">Order ID</p>
              <p className="fw-semibold mb-0">{order._id}</p>
            </div>

            <div className="col-md-6">
              <p className="text-muted mb-1">Order Date</p>
              <p className="fw-semibold mb-0">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="col-md-6">
              <p className="text-muted mb-1">Order Status</p>
              <span className="badge bg-warning text-dark text-capitalize">
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Ordered Products</h5>

          {order.items.map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="row align-items-center g-3 mb-3"
            >
              <div className="col-3 col-md-2 text-center">
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  className="img-fluid"
                  style={{
                    height: "90px",
                    width: "90px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="col-9 col-md-6">
                <h6 className="fw-semibold mb-2">
                  {item.productName}
                </h6>
                <p className="text-muted mb-0">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="col-12 col-md-4 text-md-end">
                <p className="fw-bold mb-0">
                  ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                </p>
                <small className="text-muted">
                  ${item.priceAtPurchase.toFixed(2)} each
                </small>
              </div>

              {index !== order.items.length - 1 && (
                <div className="col-12">
                  <hr />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Order Summary</h5>

          <div className="d-flex justify-content-between mb-3">
            <span>Total Items</span>
            <span className="fw-semibold">
              {order.items.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <span className="fw-bold">Total Amount</span>
            <span className="fw-bold fs-5">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-dark px-4 py-2"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
