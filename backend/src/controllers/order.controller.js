
const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Validate order items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product",
      });
    }

    // Validate product IDs and quantities
    for (const item of items) {
      if (
        !Number.isInteger(item.productId) ||
        item.productId <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID or quantity",
        });
      }
    }

    // Fetch and verify products from DummyJSON
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const response = await fetch(
          `https://dummyjson.com/products/${item.productId}`
        );

        if (!response.ok) {
          throw new Error("Invalid product ID");
        }

        const product = await response.json();

        return {
          productId: product.id,
          productName: product.title,
          thumbnail: product.thumbnail,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        };
      })
    );

    // Calculate total on backend
    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + item.priceAtPurchase * item.quantity,
      0
    );

    // Save order in MongoDB
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to place order",
    });
  }
};

module.exports = {
  createOrder,
};
