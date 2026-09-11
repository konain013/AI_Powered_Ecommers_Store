
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Create Account</h2>

          <p className="text-muted mb-0">
            Join E.stoRe today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label fw-semibold"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label fw-semibold"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label fw-semibold"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
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
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
          >
            Sign Up
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
