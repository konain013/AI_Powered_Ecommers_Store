
const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product ID and quantity
    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or quantity",
      });
    }

    // Fetch product from DummyJSON
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`
    );

    if (!response.ok) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = await response.json();

    // Find user's cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check if product already exists
    const existingItem = cart.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > 100) {
        return res.status(400).json({
          success: false,
          message: "Maximum quantity limit reached",
        });
      }

      existingItem.quantity += quantity;
      existingItem.price = product.price;
    } else {
      cart.items.push({
        productId: product.id,
        productName: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add product to cart",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      cart: cart || {
        items: [],
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch cart",
    });
  }
};


module.exports = {
  addToCart,
  getCart
};
