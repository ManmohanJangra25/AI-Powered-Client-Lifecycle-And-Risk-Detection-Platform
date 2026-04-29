const express = require("express");
const router = express.Router();

const { getAIInsights } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.get("/insights", protect, getAIInsights);

module.exports = router;
