const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
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
      type: Number, // your internal cost
      default: 10,
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
    customRate: Number,
    projectLinks: [String],
    files: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
