const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: keep full user data (id + role)
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid" });
  }
};
