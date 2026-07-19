import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserEdit, FaArrowLeft } from "react-icons/fa";

import API from "../services/api";
import "../styles/Employee.css";

function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "ACTIVE",
    role: "EMPLOYEE",
    reportingManager: "",
    profileImage: "",
  });

  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchEmployee();

    fetchManagers();
  }, [id]);

  const fetchManagers = async () => {
    try {
      const res = await API.get("/employees");

      setManagers(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load reporting managers");
    }
  };

  const fetchEmployee = async () => {
    try {
      const res = await API.get(`/employees/${id}`);

      setEmployee({
        employeeId: res.data.employeeId || "",

        name: res.data.name || "",

        email: res.data.email || "",

        phone: res.data.phone || "",

        department: res.data.department || "",

        designation: res.data.designation || "",

        salary: res.data.salary || "",

        joiningDate: res.data.joiningDate
          ? new Date(res.data.joiningDate).toISOString().split("T")[0]
          : "",

        status: res.data.status || "ACTIVE",

        role: res.data.role || "EMPLOYEE",

        reportingManager: res.data.reportingManager?._id || "",

        profileImage: res.data.profileImage || "",
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to load employee");
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.email.includes("@")) {
      toast.error("Please enter a valid email");

      return;
    }

    if (employee.phone.length < 10) {
      toast.error("Phone number should be at least 10 digits");

      return;
    }

    if (Number(employee.salary) <= 0) {
      toast.error("Salary must be greater than 0");

      return;
    }

    try {
      const employeeData = {
        ...employee,

        reportingManager: employee.reportingManager || null,
      };

      await API.put(`/employees/${id}`, employeeData);

      toast.success("Employee Updated Successfully", {
        style: {
          background: "#ff6b00",
          color: "#ffffff",
          borderRadius: "10px",
        },
        progressStyle: {
          background: "#ffffff",
        },
        icon: "🟧",
      });
      setTimeout(() => {
        navigate("/employees");
      }, 800);
    } catch (err) {
      console.error(err.response?.data || err);

      toast.error(err.response?.data?.message || "Failed to update employee");
    }
  };

  return (
    <div className="employee-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaUserEdit />
            Employee Management
          </span>

          <h1>Edit Employee</h1>

          <p>
            Update employee details, role, department, reporting manager and
            profile information.
          </p>
        </div>

        <button
          type="button"
          className="page-btn"
          onClick={() => navigate("/employees")}
        >
          <FaArrowLeft />
          Back to Employees
        </button>
      </div>

      <div className="filter-card">
        <h3 className="filter-title">Employee Information</h3>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="filter-grid">
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={employee.employeeId}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={employee.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={employee.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={employee.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={employee.department}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={employee.designation}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={employee.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>

              <option value="INACTIVE">Inactive</option>
            </select>

            <select name="role" value={employee.role} onChange={handleChange}>
              <option value="EMPLOYEE">Employee</option>

              <option value="HR_MANAGER">HR Manager</option>

              {user?.role === "SUPER_ADMIN" && (
                <option value="SUPER_ADMIN">Super Admin</option>
              )}
            </select>

            <select
              name="reportingManager"
              value={employee.reportingManager}
              onChange={handleChange}
            >
              <option value="">Select Reporting Manager</option>

              {managers
                .filter((manager) => manager._id !== id)
                .map((manager) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.name} ({manager.employeeId})
                  </option>
                ))}
            </select>

            <input
              type="text"
              name="profileImage"
              placeholder="Profile Image URL"
              value={employee.profileImage}
              onChange={handleChange}
            />
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="view-btn"
              onClick={() => navigate("/employees")}
            >
              <FaArrowLeft />
              Cancel
            </button>

            <button type="submit" className="add-btn">
              <FaUserEdit />
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
