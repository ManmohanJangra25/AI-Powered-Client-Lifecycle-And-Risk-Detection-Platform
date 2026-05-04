const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // EXISTING (KEEP)
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    name: String,
    description: String,

    status: {
      type: String,
      enum: [
        "active",
        "pending",
        "completed",
        "cancelled",
        "on-hold",
        "delayed",
        "under-development",
        "to-be-delivered",
        "awaiting-info",
        "design-phase",
        "pdc-in-progress",
      ],
      default: "pending",
    },

    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    deadline: Date,
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    // BILLING (KEEP)
    billingType: {
      type: String,
      enum: ["hourly", "fixed", "dedicated", "bucket"],
      default: "hourly",
    },

    hourlyRate: {
      type: Number,
      default: 25,
    },

    costPerHour: {
      type: Number,
      default: 10,
    },

    hoursWorked: {
      type: Number,
      default: 0,
    },

    customRate: Number,

    // FILES / LINKS (KEEP)
    projectLinks: [String],

    files: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],

    // =========================================
    // 🔥 NEW ENTERPRISE FIELDS (ADDED BELOW)
    // =========================================

    // IDs
    projectCode: String, // PRJ180326203358
    quoteId: String,

    // Classification (DYNAMIC DROPDOWNS)
    projectType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },

    serviceDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },

    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },

    // Tech
    techStack: [String],
    integration: String,

    // Timeline
    confirmationDate: Date,
    startDate: Date,
    deliveryDate: Date,
    internalDeliveryDate: Date,

    // Performance
    internalHours: Number,
    actualHours: Number,
    optimization: Number,

    // Finance
    quotePrice: Number,
    confirmedPrice: Number,
    usdConversion: Number,
    currencyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },
    businessType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },

    // Ownership
    accountManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },
    geo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },
    pc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },
    expert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dropdown",
    },

    // Geo & Client Info Snapshot
    clientType: String,
    geo: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
