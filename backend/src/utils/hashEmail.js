const crypto = require("crypto");

const hashEmail = (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  return crypto
    .createHmac("sha256", process.env.RATE_LIMIT_KEY_SECRET)
    .update(normalizedEmail)
    .digest("hex");
};

module.exports = hashEmail;