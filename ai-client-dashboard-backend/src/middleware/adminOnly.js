module.exports = (req, res, next) => {
  // req.user is coming from your auth middleware
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }

  next();
};
