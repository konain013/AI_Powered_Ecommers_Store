
const LoginAttempt = require("../models/LoginAttempts");
const hashEmail = require("../utils/hashEmail");

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const RECORD_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Check whether this email is currently locked
const isAccountLocked = async (email) => {
  const key = hashEmail(email);
  const now = new Date();

  const record = await LoginAttempt.findOne({ key }).lean();

  return Boolean(record?.lockedUntil && record.lockedUntil > now);
};

// Record a failed login attempt atomically
const recordFailedAttempt = async (email) => {
  const key = hashEmail(email);
  const now = new Date();

  const pipeline = [
    {
      $set: {
        _isCurrentlyLocked: {
          $gt: [
            { $ifNull: ["$lockedUntil", new Date(0)] },
            now,
          ],
        },

        _shouldReset: {
          $or: [
            {
              $eq: [
                { $ifNull: ["$windowStartedAt", null] },
                null,
              ],
            },
            {
              $lte: [
                "$windowStartedAt",
                new Date(now.getTime() - WINDOW_MS),
              ],
            },
            {
              $and: [
                { $ne: [{ $ifNull: ["$lockedUntil", null] }, null] },
                { $lte: ["$lockedUntil", now] },
              ],
            },
          ],
        },
      },
    },
    {
      $set: {
        count: {
          $cond: [
            "$_isCurrentlyLocked",
            { $ifNull: ["$count", 0] },
            {
              $cond: [
                "$_shouldReset",
                1,
                { $add: [{ $ifNull: ["$count", 0] }, 1] },
              ],
            },
          ],
        },

        windowStartedAt: {
          $cond: [
            "$_isCurrentlyLocked",
            "$windowStartedAt",
            {
              $cond: [
                "$_shouldReset",
                now,
                "$windowStartedAt",
              ],
            },
          ],
        },

        lockedUntil: {
          $cond: [
            "$_isCurrentlyLocked",
            "$lockedUntil",
            {
              $cond: [
                "$_shouldReset",
                null,
                {
                  $cond: [
                    {
                      $gte: [
                        { $add: [{ $ifNull: ["$count", 0] }, 1] },
                        MAX_ATTEMPTS,
                      ],
                    },
                    new Date(now.getTime() + LOCK_DURATION_MS),
                    "$lockedUntil",
                  ],
                },
              ],
            },
          ],
        },

        expiresAt: new Date(now.getTime() + RECORD_TTL_MS),
      },
    },
    {
      $unset: ["_isCurrentlyLocked", "_shouldReset"],
    },
  ];

  let record;

  try {
    record = await LoginAttempt.findOneAndUpdate(
      { key },
      pipeline,
      {
         returnDocument: "after",
        upsert: true,
        updatePipeline: true,
      }
    );
  } catch (error) {
    // Handle simultaneous first-time upserts for the same email
    if (error.code !== 11000) {
      throw error;
    }

    record = await LoginAttempt.findOneAndUpdate(
      { key },
      pipeline,
      {
  returnDocument: "after",
  updatePipeline: true,
}
    );
  }

  return {
    locked: Boolean(record?.lockedUntil && record.lockedUntil > now),
  };
};

// Reset attempts after successful login
const resetFailedAttempts = async (email) => {
  const key = hashEmail(email);

  const result = await LoginAttempt.deleteOne({ key });

  //console.log("Account attempts reset:", result.deletedCount);

  return result.deletedCount;
};

module.exports = {
  isAccountLocked,
  recordFailedAttempt,
  resetFailedAttempts,
};
