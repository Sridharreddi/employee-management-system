const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployee,
  getReportees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "HR_MANAGER"),
  createEmployee,
);

router.get("/", authMiddleware, getEmployees);

// Get Direct Reportees of an Employee
router.get("/:id/reportees", authMiddleware, getReportees);

router.get("/:id", authMiddleware, getEmployee);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "HR_MANAGER"),
  updateEmployee,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  deleteEmployee,
);
module.exports = router;
