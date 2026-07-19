import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import "../styles/Leave.css";

function Leave() {
  const [search, setSearch] = useState("");

  const [leaves] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      type: "Casual Leave",
      from: "2026-07-20",
      to: "2026-07-22",
      days: 3,
      status: "Pending",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Alice Johnson",
      type: "Sick Leave",
      from: "2026-07-18",
      to: "2026-07-19",
      days: 2,
      status: "Approved",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Robert Brown",
      type: "Annual Leave",
      from: "2026-07-25",
      to: "2026-07-30",
      days: 6,
      status: "Rejected",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Emma Wilson",
      type: "Work From Home",
      from: "2026-07-21",
      to: "2026-07-21",
      days: 1,
      status: "Pending",
    },
  ]);

  const filteredLeaves = useMemo(() => {
    return leaves.filter(
      (leave) =>
        leave.name.toLowerCase().includes(search.toLowerCase()) ||
        leave.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        leave.type.toLowerCase().includes(search.toLowerCase()),
    );
  }, [leaves, search]);

  const pending = leaves.filter((l) => l.status === "Pending").length;

  const approved = leaves.filter((l) => l.status === "Approved").length;

  const rejected = leaves.filter((l) => l.status === "Rejected").length;

  return (
    <div className="leave-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaCalendarAlt />
            Leave Management
          </span>

          <h1>Leave Requests</h1>

          <p>Manage employee leave requests and approval workflow.</p>
        </div>
      </div>

      <div className="employee-summary">
        <div className="summary-card">
          <div className="summary-icon orange">
            <FaHourglassHalf />
          </div>

          <div>
            <h2>{pending}</h2>

            <p>Pending</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{approved}</h2>

            <p>Approved</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <h2>{rejected}</h2>

            <p>Rejected</p>
          </div>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Leave Request..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employeeId}</td>

                <td>{leave.name}</td>

                <td>{leave.type}</td>

                <td>{leave.from}</td>

                <td>{leave.to}</td>

                <td>{leave.days}</td>

                <td>
                  <span className={`status ${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button className="approve-btn">
                      <FaCheck />
                    </button>

                    <button className="reject-btn">
                      <FaTimes />
                    </button>
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

export default Leave;
