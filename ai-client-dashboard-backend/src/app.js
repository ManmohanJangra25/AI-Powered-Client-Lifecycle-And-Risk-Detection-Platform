const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dropdowns", dropdownRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the backend");
});

module.exports = app;
