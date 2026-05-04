const Project = require("../models/Project");
const Client = require("../models/Client");
const logEvent = require("../utils/logger");
const { calculateProfit } = require("../utils/finance");

// Create Project
exports.createProject = async (req, res) => {
  try {
    let clientId = req.body.clientId;

    // Check existing client
    if (!clientId && req.body.client) {
      const existingClient = await Client.findOne({
        contactInfo: req.body.client.contactInfo,
      });

      if (existingClient) {
        clientId = existingClient._id;
      } else {
        const newClient = await Client.create({
          ...req.body.client,
          assignedManager: req.user.id,
        });

        clientId = newClient._id;
      }
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
};
//Get Projects by Client
exports.getProjectsByClient = async (req, res) => {
  const projects = await Project.find({
    clientId: req.params.clientId,
  })
    .populate("teamMembers", "name email")
    .populate("projectType", "value")
    .populate("serviceDepartment", "value")
    .populate("serviceType", "value")
    .populate("currencyType", "value")
    .populate("businessType", "value")
    .populate("accountManager", "value")
    .populate("pc", "value")
    .populate("expert", "value")
    .populate("geo", "value");

  const projectsWithProfit = projects.map((p) => {
    const projectObj = p.toObject();
    projectObj.profitPercent = calculateProfit(projectObj);
    projectObj.revenue =
      projectObj.hoursWorked *
      (projectObj.customRate || projectObj.hourlyRate || 0);
    projectObj.cost = projectObj.hoursWorked * (projectObj.costPerHour || 0);
    // Flatten dropdowns
    projectObj.projectType = projectObj.projectType?.value;
    projectObj.serviceDepartment = projectObj.serviceDepartment?.value;
    projectObj.serviceType = projectObj.serviceType?.value;
    projectObj.currencyType = projectObj.currencyType?.value;
    projectObj.businessType = projectObj.businessType?.value;
    projectObj.accountManager = projectObj.accountManager?.value;
    projectObj.pc = projectObj.pc?.value;
    projectObj.expert = projectObj.expert?.value;
    projectObj.geo = projectObj.geo?.value;

    return projectObj;
  });

  res.json(projectsWithProfit);
};

exports.getAllProjects = async (req, res) => {
  try {
    const {
      status,
      clientId,
      billingType,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build filter object
    let filter = {};

    if (status) filter.status = status;
    if (clientId) filter.clientId = clientId;
    if (billingType) filter.billingType = billingType;

    // Search (project name)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Sorting
    const sortOptions = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const projects = await Project.find(filter)
      .populate("clientId", "name company")
      .populate("teamMembers", "name email")
      .populate("projectType", "value")
      .populate("serviceDepartment", "value")
      .populate("serviceType", "value")
      .populate("currencyType", "value")
      .populate("businessType", "value")
      .populate("accountManager", "value")
      .populate("pc", "value")
      .populate("expert", "value")
      .populate("geo", "value")
      .sort(sortOptions);

    // Add computed fields
    const projectsWithData = projects.map((p) => {
      const obj = p.toObject();

      // Financial calculations (keep yours)
      obj.profitPercent = calculateProfit(obj);
      obj.revenue = obj.hoursWorked * (obj.customRate || obj.hourlyRate || 0);
      obj.cost = obj.hoursWorked * (obj.costPerHour || 0);

      // NEW: Flatten dropdown values
      obj.projectType = obj.projectType?.value;
      obj.serviceDepartment = obj.serviceDepartment?.value;
      obj.serviceType = obj.serviceType?.value;
      obj.currencyType = obj.currencyType?.value;
      obj.businessType = obj.businessType?.value;
      obj.accountManager = obj.accountManager?.value;
      obj.pc = obj.pc?.value;
      obj.expert = obj.expert?.value;
      obj.geo = obj.geo?.value;

      return obj;
    });

    res.json(projectsWithData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("clientId", "name company")
      .populate("teamMembers", "name email")
      .populate("projectType", "value")
      .populate("serviceDepartment", "value")
      .populate("serviceType", "value")
      .populate("currencyType", "value")
      .populate("businessType", "value")
      .populate("accountManager", "value")
      .populate("pc", "value")
      .populate("expert", "value")
      .populate("geo", "value");

    const projectObj = project.toObject();

    // Financial
    projectObj.profitPercent = calculateProfit(projectObj);
    projectObj.revenue =
      projectObj.hoursWorked *
      (projectObj.customRate || projectObj.hourlyRate || 0);
    projectObj.cost = projectObj.hoursWorked * (projectObj.costPerHour || 0);

    // Flatten dropdowns
    projectObj.projectType = projectObj.projectType?.value;
    projectObj.serviceDepartment = projectObj.serviceDepartment?.value;
    projectObj.serviceType = projectObj.serviceType?.value;
    projectObj.currencyType = projectObj.currencyType?.value;
    projectObj.businessType = projectObj.businessType?.value;
    projectObj.accountManager = projectObj.accountManager?.value;
    projectObj.pc = projectObj.pc?.value;
    projectObj.expert = projectObj.expert?.value;
    projectObj.geo = projectObj.geo?.value;

    res.json(projectObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
