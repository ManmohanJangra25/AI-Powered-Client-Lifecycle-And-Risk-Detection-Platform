const geminiAnalyze = require("./aiProviders/gemini");
const openRouterAnalyze = require("./aiProviders/openRouter");
const groqAnalyze = require("./aiProviders/groq");

const analyzeProject = async (data) => {
  const prompt = `
You are a senior business analyst for a tech services company.

Analyze the following structured data and provide precise, data-driven insights.

DATA:
${JSON.stringify(data, null, 2)}

STRICT RULES:
- Do NOT give generic advice
- Use numbers and facts
- Be specific to projects and clients
- Identify exact problems and opportunities
- Ultra Think and research about this in 

OUTPUT FORMAT:

1. Top Performing Project
- Name
- Why (profit %, revenue, efficiency)

2. Risk Analysis
- Which projects are risky
- Why (low profit %, no activity, high cost)

3. Client Usage Issues
- Identify underused or overused bucket clients

4. Profit Optimization Actions
- Exact actions (increase rate, reduce cost, reassign resources)

5. Strategic Recommendations
- Where to scale business
`;

  try {
    return await geminiAnalyze(prompt);
  } catch (err) {
    console.log("Gemini failed → fallback OpenRouter", err.message);
  }

  try {
    return await openRouterAnalyze(prompt);
  } catch (err) {
    console.log("OpenRouter failed → fallback Groq");
  }

  try {
    return await groqAnalyze(prompt);
  } catch (err) {
    console.log("All AI failed");
    return "AI service unavailable";
  }
};

module.exports = { analyzeProject };
