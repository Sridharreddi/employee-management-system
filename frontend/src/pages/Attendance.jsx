import { useMemo, useState } from "react";
import {
  FaCalendarCheck,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserClock,
} from "react-icons/fa";

import "../styles/Attendance.css";

function Attendance() {
  const [search, setSearch] = useState("");

  const [attendance] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      department: "Human Resources",
      date: "2026-07-18",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Alice Johnson",
      department: "IT",
      date: "2026-07-18",
      checkIn: "09:35 AM",
      checkOut: "06:10 PM",
      status: "Late",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Robert Brown",
      department: "Finance",
      date: "2026-07-18",
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Emma Wilson",
      department: "Marketing",
      date: "2026-07-18",
      checkIn: "09:10 AM",
      checkOut: "01:00 PM",
      status: "Half Day",
    },
  ]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()),
    );
  }, [attendance, search]);

  const present = attendance.filter((item) => item.status === "Present").length;

  const absent = attendance.filter((item) => item.status === "Absent").length;

  const late = attendance.filter((item) => item.status === "Late").length;

  const halfDay = attendance.filter(
    (item) => item.status === "Half Day",
  ).length;

  return (
    <div className="attendance-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaCalendarCheck />
            Attendance Management
          </span>

          <h1>Attendance</h1>

          <p>Track employee attendance, working hours and daily activity.</p>
        </div>
      </div>

      <div className="employee-summary">
        <div className="summary-card">
          <div className="attendance-summary-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{present}</h2>
            <p>Present</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="attendance-summary-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <h2>{absent}</h2>
            <p>Absent</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="attendance-summary-icon orange">
            <FaClock />
          </div>

          <div>
            <h2>{late}</h2>
            <p>Late</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="attendance-summary-icon blue">
            <FaUserClock />
          </div>

          <div>
            <h2>{halfDay}</h2>
            <p>Half Day</p>
          </div>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Employee..."
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
              <th>Department</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.map((item) => (
              <tr key={item.id}>
                <td>{item.employeeId}</td>

                <td>{item.name}</td>

                <td>{item.department}</td>

                <td>{item.date}</td>

                <td>{item.checkIn}</td>

                <td>{item.checkOut}</td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
