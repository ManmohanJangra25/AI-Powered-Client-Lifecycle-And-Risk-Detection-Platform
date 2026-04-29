exports.generateAlerts = (decisions) => {
  return decisions
    .filter((d) => d.priority === "High")
    .map((d) => ({
      alert: d.message,
      type: d.type,
      action: d.action,
    }));
};
