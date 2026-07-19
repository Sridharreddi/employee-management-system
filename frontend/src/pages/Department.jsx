import { useMemo, useState } from "react";
import { FaBuilding, FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "../styles/Department.css";
import { useNavigate } from "react-router-dom";

function Department() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Human Resources",
      head: "John Smith",
      employees: 18,
    },
    {
      id: 2,
      name: "Information Technology",
      head: "Alice Johnson",
      employees: 42,
    },
    {
      id: 3,
      name: "Finance",
      head: "Robert Brown",
      employees: 15,
    },
    {
      id: 4,
      name: "Marketing",
      head: "Emma Wilson",
      employees: 20,
    },
    {
      id: 5,
      name: "Sales",
      head: "David Miller",
      employees: 28,
    },
  ]);

  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (department) =>
        department.name.toLowerCase().includes(search.toLowerCase()) ||
        department.head.toLowerCase().includes(search.toLowerCase()),
    );
  }, [departments, search]);

  return (
    <div className="department-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaBuilding />
            Department Management
          </span>

          <h1>Departments</h1>

          <p>
            Organize departments, manage department heads and monitor employee
            distribution.
          </p>
        </div>

        <button className="add-btn">
          <FaPlus />
          Add Department
        </button>
      </div>

      <div className="employee-summary">
        <div className="summary-card">
          <div className="summary-icon blue">
            <FaBuilding />
          </div>

          <div>
            <h2>{departments.length}</h2>
            <p>Total Departments</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <FaBuilding />
          </div>

          <div>
            <h2>
              {departments.reduce((sum, item) => sum + item.employees, 0)}
            </h2>

            <p>Total Employees</p>
          </div>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Department Head</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDepartments.map((department) => (
              <tr key={department.id}>
                <td>{department.name}</td>

                <td>{department.head}</td>

                <td>{department.employees}</td>

                <td>
                  <div className="department-action-buttons">
                    <button
                      className="view-details-btn"
                      title="View Department"
                      onClick={() => alert(`Department: ${department.name}`)}
                    >
                      👁️
                    </button>

                    <button
                      className="edit-btn"
                      title="Edit Department"
                      onClick={() => alert(`Edit ${department.name}`)}
                    >
                      ✏️
                    </button>

                    {user?.role === "SUPER_ADMIN" && (
                      <button
                        className="delete-btn"
                        title="Delete Department"
                        onClick={() => alert(`Delete ${department.name}`)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
