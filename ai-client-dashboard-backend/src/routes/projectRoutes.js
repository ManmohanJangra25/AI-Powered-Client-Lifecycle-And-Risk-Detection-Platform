const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjectsByClient,
  getAllProjects,
  getProjectById,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createProject);
router.get("/:clientId", protect, getProjectsByClient);
router.get("/", protect, getAllProjects);
router.get("/single/:id", protect, getProjectById);

module.exports = router;
