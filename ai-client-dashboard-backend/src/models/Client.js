const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    contactInfo: String,
    assignedManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dedicatedResources: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        allocationType: {
          type: String,
          enum: ["full-time", "partial"],
          default: "full-time",
        },

        hoursPerDay: {
          type: Number,
          default: 8,
        },

        monthlyCost: Number,

        allocatedHours: Number,
      },
    ],
    billingModel: {
      type: String,
      enum: ["standard", "dedicated", "bucket"],
      default: "standard",
    },
    bucketHours: {
      total: {
        type: Number,
        default: 0,
      },
      used: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Client", clientSchema);
