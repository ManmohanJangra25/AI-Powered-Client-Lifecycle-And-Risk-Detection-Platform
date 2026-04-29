const mongoose = require("mongoose");

const dropdownSchema = new mongoose.Schema({
  type: String, // e.g. "projectType", "techStack", "accountManager"
  value: String,
});

module.exports = mongoose.model("Dropdown", dropdownSchema);
