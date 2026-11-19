const express = require("express");

const { 
    signup,
    login,
    forgotPassword,
    resetPassword,
    getMe
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const {
  forgotPasswordRateLimiter,
  loginRateLimiter,
} = require("../middleware/rateLimiter");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginRateLimiter, login);
router.post("/forgot-password", forgotPasswordRateLimiter, forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;