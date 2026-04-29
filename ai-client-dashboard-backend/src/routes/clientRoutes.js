const express = require("express");
const router = express.Router();
const { createClient, getClients } = require("../controllers/clientController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post("/", protect, authorize("admin", "manager"), createClient);
router.get("/", protect, getClients);

module.exports = router;
