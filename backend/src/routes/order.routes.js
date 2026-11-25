
const express = require("express");

const { createOrder } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Protected purchase route
router.post("/", protect, createOrder);

module.exports = router;
