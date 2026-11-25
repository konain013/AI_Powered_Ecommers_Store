
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  const hasMaxLength = password.length <= 15;

  const showBackendErrors = (error) => {
    const errors = error.response?.data?.errors;

    if (Array.isArray(errors) && errors.length > 0) {
      errors.forEach((item) => {
        toast.error(`${item.field}: ${item.message}`);
      });
      return;
    }

    toast.error(
      error.response?.data?.message ||
        "Unable to create account. Please try again."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (name.trim().length < 2 || name.trim().length > 20) {
      toast.error("Name must be between 2 and 20 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (email.trim().length > 25) {
      toast.error("Email cannot exceed 25 characters.");
      return;
    }

    if (password.length < 8 || password.length > 15) {
      toast.error("Password must be between 8 and 15 characters.");
      return;
    }

    if (
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialCharacter
    ) {
      toast.error("Please fulfil all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
      });

      toast.success(
        response.data.message || "Account created successfully!"
      );

      navigate("/login");
    } catch (error) {
      showBackendErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const Requirement = ({ valid, children }) => (
    <span className={valid ? "text-success" : "text-danger"}>
      {valid ? "✓" : "✗"} {children}
    </span>
  );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Create Account</h2>
          <p className="text-muted mb-0">
            Join E.stoRe and start shopping today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              maxLength={20}
              required
            />
          </div>

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
              maxLength={25}
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={15}
              required
            />

            {password.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-2 small">
                <Requirement valid={hasUppercase}>(A-Z)</Requirement>
                <Requirement valid={hasLowercase}>(a-z)</Requirement>
                <Requirement valid={hasNumber}>(0-9)</Requirement>
                <Requirement valid={hasSpecialCharacter}>
                  (@,#,$,%)
                </Requirement>
                <Requirement valid={hasMinLength}>Min 8 length</Requirement>
                {/* <Requirement valid={hasMaxLength}>Max 15 characters</Requirement> */}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="form-label fw-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-semibold text-dark text-decoration-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
