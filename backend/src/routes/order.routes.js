
const express = require("express");

const { createOrder,getOrderById,getMyOrders } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Protected purchase route
router.post("/", protect, createOrder);
router.get("/my-orders",protect,getMyOrders)
router.get("/:id",protect,getOrderById)

module.exports = router;
