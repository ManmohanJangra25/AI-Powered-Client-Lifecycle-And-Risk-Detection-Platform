exports.calculateRiskScore = (project) => {
  let score = 0;

  // Low profit → high risk
  if (project.profitPercent < 20) score += 40;

  // No activity
  if (project.hoursWorked === 0) score += 30;

  // High cost
  if (project.cost > project.revenue) score += 30;

  return Math.min(score, 100);
};

exports.calculateProfitScore = (project) => {
  return Math.min(project.profitPercent || 0, 100);
};

exports.getPriority = (riskScore, profitScore) => {
  if (riskScore > 70) return "High";
  if (profitScore > 60) return "Growth";
  return "Normal";
};
