const Task = require("../models/Task");
const logEvent = require("../utils/logger");
const Project = require("../models/Project");
const Client = require("../models/Client");

//Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    // Update project hours
    await Project.findByIdAndUpdate(req.body.projectId, {
      $inc: { hoursWorked: req.body.hoursSpent || 0 },
    });

    // 🔥 BUCKET LOGIC STARTS HERE
    const project = await Project.findById(req.body.projectId);
    const client = await Client.findById(project.clientId);

    if (client.billingModel === "bucket") {
      // Ensure bucketHours exists
      if (!client.bucketHours) {
        client.bucketHours = {
          total: 0,
          used: 0,
        };
      }

      // Ensure used exists
      if (typeof client.bucketHours.used !== "number") {
        client.bucketHours.used = 0;
      }

      client.bucketHours.used += req.body.hoursSpent || 0;

      // Optional warning
      if (
        client.bucketHours.total &&
        client.bucketHours.used > client.bucketHours.total
      ) {
        console.warn("⚠️ Bucket hours exceeded!");
      }

      await client.save();
    }

    await logEvent({
      eventType: "TASK_CREATED",
      userId: req.user.id,
      projectId: req.body.projectId,
      metadata: {
        title: req.body.title,
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tasks by Project
exports.getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId }).populate(
    "assignee",
    "name email",
  );

  res.json(tasks);
};

// Update Task Status (Kanban)
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    // ✅ LOGGING
    await logEvent({
      eventType: "TASK_STATUS_UPDATED",
      userId: req.user.id,
      projectId: task.projectId,
      metadata: {
        status: req.body.status,
      },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
