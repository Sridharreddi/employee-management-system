const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management System API is Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;
