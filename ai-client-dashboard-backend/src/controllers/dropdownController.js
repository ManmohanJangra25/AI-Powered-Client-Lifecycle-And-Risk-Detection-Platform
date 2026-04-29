const Dropdown = require("../models/Dropdown");

// Create new option
exports.createOption = async (req, res) => {
  try {
    const option = await Dropdown.create(req.body);
    res.json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get options by type
exports.getOptions = async (req, res) => {
  try {
    const options = await Dropdown.find({ type: req.params.type });
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BULK SEED DROPDOWNS (ADMIN ONLY)
exports.seedDropdowns = async (req, res) => {
  try {
    const dropdowns = req.body;

    if (!Array.isArray(dropdowns)) {
      return res.status(400).json({ error: "Array required" });
    }

    // Optional: prevent duplicates
    const inserted = [];

    for (const item of dropdowns) {
      const exists = await Dropdown.findOne({
        type: item.type,
        value: item.value,
      });

      if (!exists) {
        const newItem = await Dropdown.create(item);
        inserted.push(newItem);
      }
    }

    res.json({
      message: "Dropdowns seeded",
      count: inserted.length,
      data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
