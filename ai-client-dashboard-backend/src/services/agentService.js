const { analyzeProject } = require("./aiService");

const runAgents = async (data) => {
  const riskPrompt = `
Analyze project risks:
${JSON.stringify(data)}
Focus on:
- Low profit
- No activity
- Overuse
`;

  const pricingPrompt = `
Analyze pricing:
${JSON.stringify(data)}
Focus on:
- Margin improvement
- Rate increase
`;

  const strategyPrompt = `
Business strategy analysis:
${JSON.stringify(data)}
Focus on:
- Growth opportunities
- Scaling
`;

  const [risk, pricing, strategy] = await Promise.all([
    analyzeProject(riskPrompt),
    analyzeProject(pricingPrompt),
    analyzeProject(strategyPrompt),
  ]);

  return {
    risk,
    pricing,
    strategy,
  };
};

module.exports = { runAgents };
