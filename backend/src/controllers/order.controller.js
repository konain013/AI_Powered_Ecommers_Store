
const mongoose = require("mongoose");
const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product",
      });
    }

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

    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + item.priceAtPurchase * item.quantity,
      0
    );

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

// Get specific order
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch order",
    });
  }
};

// Get logged-in user's all orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders
};
