const Employee = require("../models/Employee");

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const existingEmployeeId = await Employee.findOne({
      employeeId: req.body.employeeId,
    });

    if (existingEmployeeId) {
      return res.status(400).json({
        message: "Employee ID already exists",
      });
    }

    const existingEmail = await Employee.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const employee = await Employee.create(req.body);

    res.status(201).json({
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Employee By ID
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "reportingManager",
      "name employeeId designation",
    );
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Direct Reportees
const getReportees = async (req, res) => {
  try {
    const reportees = await Employee.find({
      reportingManager: req.params.id,
    }).select(
      "employeeId name email department designation role status profileImage",
    );

    res.status(200).json(reportees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const duplicateEmployeeId = await Employee.findOne({
      employeeId: req.body.employeeId,
      _id: { $ne: req.params.id },
    });

    if (duplicateEmployeeId) {
      return res.status(400).json({
        message: "Employee ID already exists",
      });
    }

    const duplicateEmail = await Employee.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });

    if (duplicateEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Employee Updated Successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  getReportees,
  updateEmployee,
  deleteEmployee,
};
