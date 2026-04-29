const Client = require("../models/Client");
const { calculateDedicatedProfit } = require("../utils/finance");

// Create Client
exports.createClient = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.billingModel === "bucket") {
      data.bucketHours = {
        total: data.bucketHours?.total || 0,
        used: 0,
      };
    }

    if (data.billingModel === "dedicated" && !data.dedicatedResources) {
      data.dedicatedResources = [];
    }

    const client = await Client.create(data);

    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate("assignedManager", "name email")
      .populate("dedicatedResources.userId", "name email");

    const clientsWithFinance = clients.map((client) => {
      const clientObj = client.toObject();

      if (
        clientObj.billingModel === "dedicated" &&
        clientObj.dedicatedResources
      ) {
        clientObj.dedicatedResources = clientObj.dedicatedResources.map(
          (resource) => ({
            ...resource,
            profit: calculateDedicatedProfit(resource),
          }),
        );
      }

      return clientObj;
    });

    res.json(clientsWithFinance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
