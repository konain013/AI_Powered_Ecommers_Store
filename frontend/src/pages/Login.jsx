
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Login</h2>

          <p className="text-muted mb-0">
            Welcome back to E.stoRe
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
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
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted mb-0">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="fw-semibold text-dark text-decoration-none"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

