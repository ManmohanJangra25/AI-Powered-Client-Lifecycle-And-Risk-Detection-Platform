const express = require("express");
const router = express.Router();

const {
  createOption,
  getOptions,
  seedDropdowns,
} = require("../controllers/dropdownController");

const adminOnly = require("../middleware/adminOnly");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createOption);
router.get("/:type", getOptions);
router.post("/seed", protect, adminOnly, seedDropdowns);

module.exports = router;
