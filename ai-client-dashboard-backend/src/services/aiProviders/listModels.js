const axios = require("axios");

const listModels = async () => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
    );

    console.log("\n✅ Available Models:\n");

    response.data.models.forEach((model) => {
      console.log(`- ${model.name}`);
    });
  } catch (err) {
    console.error(
      "❌ Error fetching models:",
      err.response?.data || err.message,
    );
  }
};

listModels();
