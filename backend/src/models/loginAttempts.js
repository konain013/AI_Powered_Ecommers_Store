const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },

  count: {
    type: Number,
    default: 0,
  },

  windowStartedAt: {
    type: Date,
    required: true,
  },

  lockedUntil: {
    type: Date,
    default: null,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

loginAttemptSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);