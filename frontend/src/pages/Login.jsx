
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(response.data.message || "Login successful!");

      navigate("/");
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        backendErrors.forEach((item) => {
          toast.error(`${item.field}: ${item.message}`);
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Welcome Back</h2>
          <p className="text-muted mb-0">
            Login to continue shopping at E.stoRe
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mb-4">
            <Link
              to="/forgot-password"
              className="text-dark text-decoration-none fw-semibold small"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted mb-0">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="fw-semibold text-dark text-decoration-none"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
