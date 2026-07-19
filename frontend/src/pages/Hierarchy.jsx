import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../styles/Hierarchy.css";

function Hierarchy() {
  const [employees, setEmployees] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getChildren = (managerId) => {
    return employees.filter((emp) => {
      if (!emp.reportingManager) return false;

      const reportingId = emp.reportingManager?._id || emp.reportingManager;
      return reportingId === managerId;
    });
  };

  const toggleNode = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTree = (managerId = null) => {
    const nodes = employees.filter((emp) => {
      if (managerId === null) {
        return !emp.reportingManager;
      }

      const reportingId = emp.reportingManager?._id || emp.reportingManager;
      return reportingId === managerId;
    });

    if (nodes.length === 0) return null;

    return (
      <ul className="tree">
        {nodes.map((emp) => {
          const children = getChildren(emp._id);

          return (
            <li key={emp._id}>
              <div
                className="employee-card"
                onClick={() => toggleNode(emp._id)}
                style={{ cursor: children.length ? "pointer" : "default" }}
              >
                <div className="employee-name">
                  {children.length > 0 && (
                    <span style={{ marginRight: "10px" }}>
                      {expanded[emp._id] ? "▼" : "▶"}
                    </span>
                  )}

                  {emp.name}
                </div>

                <div className="employee-designation">{emp.designation}</div>

                <div className="employee-department">{emp.department}</div>
              </div>

              {(expanded[emp._id] || managerId === null) && renderTree(emp._id)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="employee-page">
      <h2>Organization Hierarchy</h2>

      <div className="hierarchy-container">{renderTree()}</div>
    </div>
  );
}

export default Hierarchy;
