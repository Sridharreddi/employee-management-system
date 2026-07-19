import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaUsers,
  FaPlus,
  FaFilter,
  FaBuilding,
  FaUserTie,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import "../styles/Employee.css";

function Employees() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  /* ===========================
      STATES
  =========================== */

  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [reportees, setReportees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  /* ===========================
      PAGINATION
  =========================== */

  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 10;

  /* ===========================
      LOAD EMPLOYEES
  =========================== */

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter, roleFilter, statusFilter, sortBy]);

  /* ===========================
      FETCH
  =========================== */

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to fetch employees");
    }
  };

  /* ===========================
      DELETE
  =========================== */

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);

      toast.success("Employee deleted Successfully", {
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
      fetchEmployees();
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete employee");
    }
  };

  /* ===========================
      REPORTEES
  =========================== */

  const viewReportees = async (id, name) => {
    try {
      const res = await API.get(`/employees/${id}/reportees`);

      setReportees(res.data);

      setSelectedEmployee(name);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load reportees");
    }
  };
  const viewEmployeeDetails = async (id) => {
    try {
      const res = await API.get(`/employees/${id}`);

      setSelectedEmployee(res.data);

      setShowEmployeeModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load employee details");
    }
  };
  /* ===========================
      FILTERING & SORTING
  =========================== */

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch =
          emp.name.toLowerCase().includes(search.toLowerCase()) ||
          emp.email.toLowerCase().includes(search.toLowerCase()) ||
          emp.employeeId?.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
          departmentFilter === "" || emp.department === departmentFilter;

        const matchesRole = roleFilter === "" || emp.role === roleFilter;

        const matchesStatus =
          statusFilter === "" || emp.status === statusFilter;

        return (
          matchesSearch && matchesDepartment && matchesRole && matchesStatus
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);

          case "joiningDate":
            return new Date(a.joiningDate) - new Date(b.joiningDate);

          case "salary":
            return Number(a.salary) - Number(b.salary);

          default:
            return 0;
        }
      });
  }, [employees, search, departmentFilter, roleFilter, statusFilter, sortBy]);

  /* ===========================
      PAGINATION
  =========================== */

  const indexOfLastEmployee = currentPage * employeesPerPage;

  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  /* ===========================
      DASHBOARD SUMMARY
  =========================== */

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "ACTIVE",
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "INACTIVE",
  ).length;

  const totalDepartments = new Set(employees.map((emp) => emp.department)).size;

  const totalPayroll = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0,
  );

  const departmentOptions = [
    ...new Set(employees.map((emp) => emp.department)),
  ];

  return (
    <div className="employee-page">
      {/* ===========================
      PAGE HEADER
  =========================== */}

      <div className="employee-header">
        <div>
          <span className="page-badge">Employee Management</span>

          <h1>Employees</h1>

          <p>Manage your workforce, departments and employee records</p>
        </div>

        <button className="add-btn" onClick={() => navigate("/add-employee")}>
          <FaPlus />
          Add Employee
        </button>
      </div>

      {/* ===========================
      SUMMARY CARDS
  =========================== */}

      <div className="employee-summary">
        <div className="summary-card">
          <div className="employee-summary-icon blue">
            <FaUsers />
          </div>

          <div>
            <span>Total Employees</span>

            <h2>{totalEmployees}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="employee-summary-icon green">
            <FaUserTie />
          </div>

          <div>
            <span>Active Employees</span>

            <h2>{activeEmployees}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="employee-summary-icon orange">
            <FaBuilding />
          </div>

          <div>
            <span>Departments</span>

            <h2>{totalDepartments}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="employee-summary-icon purple">₹</div>

          <div>
            <span>Total Payroll</span>

            <h2>₹ {totalPayroll.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* ===========================
      SEARCH
  =========================== */}

      <div className="search-wrapper">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search employee by name, email or employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="search-dropdown">
            {filteredEmployees.slice(0, 5).map((emp) => (
              <div
                key={emp._id}
                className="search-item"
                onClick={() => viewEmployeeDetails(emp._id)}
              >
                <div className="search-avatar">
                  {emp.profileImage ? (
                    <img src={emp.profileImage} alt={emp.name} />
                  ) : (
                    emp.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="search-info">
                  <h4
                    onClick={() => viewEmployeeDetails(emp._id)}
                    style={{
                      cursor: "pointer",
                      color: "#ff6b00",
                    }}
                  >
                    {emp.name}
                  </h4>
                  <p>{emp.employeeId}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===========================
      FILTERS
  =========================== */}

      <div className="filter-card">
        <div className="filter-title">
          <FaFilter />

          <span>Filters</span>
        </div>

        <div className="filter-grid">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>

            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>

            <option value="EMPLOYEE">Employee</option>

            <option value="HR_MANAGER">HR Manager</option>

            <option value="SUPER_ADMIN">Super Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="INACTIVE">Inactive</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>

            <option value="name">Name</option>

            <option value="joiningDate">Joining Date</option>

            <option value="salary">Salary</option>
          </select>
        </div>
      </div>

      {/* ===========================
      EMPLOYEE TABLE
  =========================== */}
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee</th>

              <th>Employee ID</th>

              <th>Department</th>

              <th>Designation</th>

              <th>Status</th>

              <th>Salary</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <div className="employee-info">
                      {emp.profileImage ? (
                        <img
                          src={emp.profileImage}
                          alt={emp.name}
                          className="avatar-img"
                        />
                      ) : (
                        <div className="avatar">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h4>{emp.name}</h4>

                        <p>{emp.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="employee-id">{emp.employeeId}</span>
                  </td>

                  <td>{emp.department}</td>

                  <td>{emp.designation}</td>

                  <td>
                    <span
                      className={
                        emp.status === "ACTIVE"
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {emp.status}
                    </span>
                  </td>

                  <td>
                    <strong>
                      <span
                        style={{
                          color: "#ff6b00",
                          fontWeight: "700",
                        }}
                      >
                        ₹ {Number(emp.salary).toLocaleString()}
                      </span>
                    </strong>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-details-btn"
                        title="View Employee Details"
                        onClick={() => navigate(`/employees/${emp._id}`)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="reportees-btn"
                        title="View Reportees"
                        onClick={() => viewReportees(emp._id, emp.name)}
                      >
                        <FaUsers />
                      </button>

                      <button
                        className="edit-btn"
                        title="Edit Employee"
                        onClick={() => navigate(`/edit-employee/${emp._id}`)}
                      >
                        ✏️
                      </button>

                      {user?.role === "SUPER_ADMIN" && (
                        <button
                          className="delete-btn"
                          title="Delete Employee"
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-row">
                  <h3>No Employees Found</h3>

                  <p>Try changing the search or filter.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ===========================
          PAGINATION
      =========================== */}

      {totalPages > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1 ? "page-number active" : "page-number"
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* ===========================
          REPORTEES PANEL
      =========================== */}

      {selectedEmployee && (
        <div className="reportees-card">
          <div className="reportees-header">
            <div>
              <h2>{selectedEmployee}'s Team</h2>

              <p>
                Employees reporting directly to{" "}
                <strong>{selectedEmployee}</strong>
              </p>
            </div>

            <button
              className="close-reportees"
              onClick={() => {
                setSelectedEmployee("");
                setReportees([]);
              }}
            >
              ✕
            </button>
          </div>

          {reportees.length > 0 ? (
            <div className="reportees-grid">
              {reportees.map((emp) => (
                <div className="reportee-card" key={emp._id}>
                  <div className="avatar">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4>{emp.name}</h4>

                    <p>{emp.designation}</p>

                    <small>{emp.department}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-reportees">
              <FaUsers />

              <h3>No Reportees Found</h3>

              <p>This employee currently has no direct reportees.</p>
            </div>
          )}
        </div>
      )}
      {showEmployeeModal && selectedEmployee && (
        <div className="employee-modal-overlay">
          <div className="employee-modal">
            <button
              className="close-modal"
              onClick={() => setShowEmployeeModal(false)}
            >
              ✕
            </button>

            <div className="employee-modal-header">
              <img
                src={
                  selectedEmployee.profileImage ||
                  `https://ui-avatars.com/api/?name=${selectedEmployee.name}`
                }
                alt={selectedEmployee.name}
                className="employee-modal-image"
              />

              <div>
                <h2>{selectedEmployee.name}</h2>
                <p>{selectedEmployee.designation}</p>
              </div>
            </div>

            <div className="employee-details-grid">
              <div>
                <strong>Employee ID</strong>
                <p>{selectedEmployee.employeeId}</p>
              </div>

              <div>
                <strong>Email</strong>
                <p>{selectedEmployee.email}</p>
              </div>

              <div>
                <strong>Phone</strong>
                <p>{selectedEmployee.phone}</p>
              </div>

              <div>
                <strong>Department</strong>
                <p>{selectedEmployee.department}</p>
              </div>

              <div>
                <strong>Designation</strong>
                <p>{selectedEmployee.designation}</p>
              </div>

              <div>
                <strong>Salary</strong>
                <p>₹ {Number(selectedEmployee.salary).toLocaleString()}</p>
              </div>

              <div>
                <strong>Status</strong>
                <p>{selectedEmployee.status}</p>
              </div>

              <div>
                <strong>Role</strong>
                <p>{selectedEmployee.role}</p>
              </div>

              <div>
                <strong>Joining Date</strong>
                <p>
                  {new Date(selectedEmployee.joiningDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <strong>Reporting Manager</strong>
                <p>
                  {selectedEmployee.reportingManager?.name || "Not Assigned"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
