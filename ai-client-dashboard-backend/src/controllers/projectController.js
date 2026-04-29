const Project = require("../models/Project");
const Client = require("../models/Client");
const logEvent = require("../utils/logger");
const { calculateProfit } = require("../utils/finance");

// Create Project
exports.createProject = async (req, res) => {
  try {
    let clientId = req.body.clientId;

    // If client not provided → create new
    if (!clientId && req.body.client) {
      const newClient = await Client.create({
        ...req.body.client,
        assignedManager: req.user.id,
      });

      clientId = newClient._id;
    }

    // Safety check
    if (!clientId) {
      return res.status(400).json({ message: "Client info required" });
    }

    const project = await Project.create({
      ...req.body,
      clientId,
    });

    await logEvent({
      eventType: "PROJECT_CREATED",
      userId: req.user.id,
      projectId: project._id,
      metadata: {
        name: project.name,
      },
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  const existingClient = await Client.findOne({
    email: req.body.client?.contactInfo,
  });

  if (existingClient) {
    clientId = existingClient._id;
  }
};
//Get Projects by Client
exports.getProjectsByClient = async (req, res) => {
  const projects = await Project.find({
    clientId: req.params.clientId,
  }).populate("teamMembers", "name email");

  const projectsWithProfit = projects.map((p) => {
    const projectObj = p.toObject();
    projectObj.profit = calculateProfit(projectObj);
    return projectObj;
  });

  res.json(projectsWithProfit);
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("clientId", "name company")
      .populate("teamMembers", "name email");

    const ProjectWithProfit = projects.map((p) => {
      const projectObj = p.toObject();
      projectObj.profit = calculateProfit(projectObj);
      return projectObj;
    });

    res.json(ProjectWithProfit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("clientId", "name company")
      .populate("teamMembers", "name email");

    const projectObj = project.toObject();
    projectObj.profit = calculateProfit(projectObj);

    res.json(projectObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
