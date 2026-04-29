const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: String,
    description: String,
    sme: String,
    expert: String,
    developer: String,
    developer2: String,
    developer3: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "completed",
        "cancelled",
        "on-hold",
        "delayed",
      ],
      default: "pending",
    },
    dueDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
