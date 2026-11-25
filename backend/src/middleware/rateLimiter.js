
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



const accountAttempts = new Map();

const accountRateLimiter = (req, res, next) => {
  const email = req.body.email?.trim().toLowerCase();

  if (!email) {
    return next();
  }

  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 5;

  const account = accountAttempts.get(email);

  // Create or reset the account window
  if (!account || now - account.startTime >= windowMs) {
    accountAttempts.set(email, {
      count: 1,
      startTime: now,
    });

    return next();
  }

  // Block if limit is reached
  if (account.count >= limit) {
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again later.",
    });
  }

  account.count++;
  next();
};


module.exports = {
  forgotPasswordRateLimiter,
  loginRateLimiter,
  accountRateLimiter,
};
