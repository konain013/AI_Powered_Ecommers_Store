
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders");
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);

        toast.error(
          error.response?.data?.message ||
          "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="text-muted mt-3">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">No Orders Yet</h2>
        <p className="text-muted mb-4">
          You haven't placed any orders yet.
        </p>
        <Link to="/" className="btn btn-dark px-4">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="card border-0 shadow-sm mb-4"
        >
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
              <div>
                <p className="text-muted mb-1">Order ID</p>
                <p className="fw-semibold mb-0">{order._id}</p>
              </div>

              <div>
                <p className="text-muted mb-1">Order Date</p>
                <p className="fw-semibold mb-0">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-muted mb-1">Status</p>
                <span className="badge bg-warning text-dark text-capitalize">
                  {order.status}
                </span>
              </div>
            </div>

            <hr />

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
                      height: "75px",
                      width: "75px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="col-9 col-md-7">
                  <h6 className="fw-semibold mb-1">
                    {item.productName}
                  </h6>
                  <p className="text-muted mb-0">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="col-12 col-md-3 text-md-end">
                  <p className="fw-bold mb-0">
                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <hr />

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <h5 className="fw-bold mb-0">
                Total: ${order.totalAmount.toFixed(2)}
              </h5>

              <button
                className="btn btn-dark px-4"
                onClick={() =>
                  navigate(`/order-details/${order._id}`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
