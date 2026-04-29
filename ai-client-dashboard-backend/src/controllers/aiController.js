const { generateDecisions } = require("../utils/decisionEngine");
const { generateAlerts } = require("../utils/alertService");
const Project = require("../models/Project");
const Client = require("../models/Client");
const { analyzeProject } = require("../services/aiService");
const { calculateProfit } = require("../utils/finance");
const { runAgents } = require("../services/agentService");
const {
  calculateRiskScore,
  calculateProfitScore,
  getPriority,
} = require("../utils/scoring");

exports.getAIInsights = async (req, res) => {
  try {
    const projects = await Project.find().populate("clientId");

    const enrichedProjects = projects.map((p) => {
      const obj = p.toObject();

      // ✅ Core financials
      obj.profitPercent = Number(calculateProfit(obj));
      obj.revenue = obj.hoursWorked * (obj.customRate || obj.hourlyRate || 0);
      obj.cost = obj.hoursWorked * (obj.costPerHour || 0);

      // ✅ Scoring system
      obj.riskScore = calculateRiskScore(obj);
      obj.profitScore = calculateProfitScore(obj);
      obj.priority = getPriority(obj.riskScore, obj.profitScore);

      return obj;
    });

    const topProject = enrichedProjects.reduce(
      (max, p) => (p.profitPercent > (max?.profitPercent || 0) ? p : max),
      null,
    );

    const riskyProjects = enrichedProjects.filter((p) => p.riskScore > 60);

    const clients = await Client.find();

    // Remove duplicates by name
    const uniqueClients = Object.values(
      clients.reduce((acc, c) => {
        acc[c.name] = c;
        return acc;
      }, {}),
    );

    const decisions = generateDecisions(enrichedProjects, uniqueClients);
    const alerts = generateAlerts(decisions);

    const bucketIssues = uniqueClients
      .filter((c) => c.billingModel === "bucket")
      .map((c) => ({
        name: c.name,
        used: c.bucketHours?.used || 0,
        total: c.bucketHours?.total || 0,
      }));

    const data = {
      topProject,
      riskyProjects,
      bucketIssues,
      projects: enrichedProjects, // THIS IS CRITICAL
    };

    const agents = await runAgents(data);

    res.json({
      summary: data,
      agents,
      decisions,
      alerts, // 🔥 NEW
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
