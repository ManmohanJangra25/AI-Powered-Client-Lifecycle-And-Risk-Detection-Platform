const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  metaData: {
    type: Object,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EventLog", eventLogSchema);
