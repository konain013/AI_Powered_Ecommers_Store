
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes")

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart",cartRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

module.exports = app;
