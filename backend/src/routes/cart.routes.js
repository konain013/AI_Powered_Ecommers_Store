
const express = require("express");

const { addToCart,getCart } = require("../controllers/cart.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/",protect , getCart)

module.exports = router;
