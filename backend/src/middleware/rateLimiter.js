
const rateLimit = require("express-rate-limit");

// Forgot Password Rate Limiter
const forgotPasswordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Maximum 5 requests per IP

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many password reset requests. Please try again later.",
  },
});

// Login Rate Limiter
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 8, // Maximum 10 requests per IP

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

module.exports = {
  forgotPasswordRateLimiter,
  loginRateLimiter,
};
