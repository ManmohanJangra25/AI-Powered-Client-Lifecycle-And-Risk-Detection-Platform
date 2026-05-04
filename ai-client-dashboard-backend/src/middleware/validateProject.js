module.exports = (req, res, next) => {
  const data = req.body;

  // 🔹 Required Fields
  if (!data.name) {
    return res.status(400).json({ error: "Project name is required" });
  }

  if (!data.projectType) {
    return res.status(400).json({ error: "Project type is required" });
  }

  if (!data.serviceType) {
    return res.status(400).json({ error: "Service type is required" });
  }

  if (!data.currencyType) {
    return res.status(400).json({ error: "Currency type is required" });
  }

  // 🔹 Numeric Validation
  if (data.quotePrice && isNaN(data.quotePrice)) {
    return res.status(400).json({ error: "Quote price must be a number" });
  }

  if (data.confirmedPrice && isNaN(data.confirmedPrice)) {
    return res.status(400).json({ error: "Confirmed price must be a number" });
  }

  next(); // pass to controller
};
