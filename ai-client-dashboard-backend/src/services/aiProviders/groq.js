const axios = require("axios");

const groqAnalyze = async (prompt) => {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.choices[0].message.content;
};

module.exports = groqAnalyze;
