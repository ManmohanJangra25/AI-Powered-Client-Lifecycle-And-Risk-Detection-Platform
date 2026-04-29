exports.generateDecisions = (projects, clients) => {
  const decisions = [];

  projects.forEach((p) => {
    // 🚨 HIGH RISK PROJECT
    if (p.riskScore > 70) {
      decisions.push({
        type: "RISK",
        project: p.name,
        message: `High risk detected in ${p.name}`,
        action: "Reassign resources or investigate delays",
        priority: "High",
        confidence: Math.min(90, p.riskScore + 10), // 🔥 NEW
      });
    }

    // 💰 HIGH PROFIT → SCALE
    if (p.profitPercent > 60) {
      decisions.push({
        type: "GROWTH",
        project: p.name,
        message: `${p.name} is highly profitable`,
        action: "Consider increasing pricing by 10-15%",
        priority: "Medium",
        confidence: Math.min(95, p.profitPercent),
      });
    }

    // 📉 LOW PROFIT
    if (p.profitPercent < 20 && p.hoursWorked > 0) {
      decisions.push({
        type: "LOSS",
        project: p.name,
        message: `${p.name} has low profitability`,
        action: "Increase rate or reduce cost",
        priority: "High",
        confidence: Math.min(90, 100 - p.profitPercent),
      });
    }
  });

  // 🪣 BUCKET CLIENT ANALYSIS
  clients.forEach((c) => {
    if (c.billingModel === "bucket") {
      const used = c.bucketHours?.used || 0;
      const total = c.bucketHours?.total || 0;

      if (total > 0 && used === 0) {
        decisions.push({
          type: "UPSELL",
          client: c.name,
          message: `${c.name} has unused hours`,
          action: "Engage client and propose new work",
          priority: "Medium",
          confidence: 80,
        });
      }

      if (used > total) {
        decisions.push({
          type: "OVERUSE",
          client: c.name,
          message: `${c.name} exceeded bucket hours`,
          action: "Bill extra hours or upgrade plan",
          priority: "High",
          confidence: 80,
        });
      }
    }
  });

  return decisions;
};
