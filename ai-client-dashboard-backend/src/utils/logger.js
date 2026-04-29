const EventLog = require("../models/EventLog");

const logEvent = async ({ eventType, userId, projectId, metadata }) => {
  try {
    await EventLog.create({ eventType, userId, projectId, metadata });
  } catch (err) {
    console.error("Logging Failed", err.message);
  }
};

module.exports = logEvent;
