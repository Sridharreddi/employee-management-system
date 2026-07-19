import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaCrown,
  FaArrowUp,
} from "react-icons/fa";

import { HiOutlineSparkles } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import API from "../services/api";

import "../styles/Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const chartSectionRef = useRef(null);
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter((e) => e.status === "ACTIVE").length;

  const inactiveEmployees = employees.filter(
    (e) => e.status === "INACTIVE",
  ).length;

  const hrManagers = employees.filter((e) => e.role === "HR_MANAGER").length;

  const superAdmins = employees.filter((e) => e.role === "SUPER_ADMIN").length;

  const totalDepartments = new Set(employees.map((e) => e.department)).size;

  const totalSalary = employees.reduce(
    (sum, e) => sum + Number(e.salary || 0),
    0,
  );

  const departmentCounts = {};

  employees.forEach((emp) => {
    departmentCounts[emp.department] =
      (departmentCounts[emp.department] || 0) + 1;
  });

  const salaryChart = useMemo(
    () => ({
      labels: employees.map((e) => e.name),
      datasets: [
        {
          label: "Salary",
          data: employees.map((e) => e.salary),
          borderRadius: 8,
          backgroundColor: "#ff6b00",
        },
      ],
    }),
    [employees],
  );

  const departmentChart = useMemo(
    () => ({
      labels: Object.keys(departmentCounts),
      datasets: [
        {
          label: "Employees",
          data: Object.values(departmentCounts),
          borderRadius: 8,
          backgroundColor: "#10b981",
        },
      ],
    }),
    [employees],
  );

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <FaUsers />,
      color: "#ff6b00",
    },
    {
      title: "Active",
      value: activeEmployees,
      icon: <FaUserCheck />,
      color: "#16A34A",
    },
    {
      title: "Inactive",
      value: inactiveEmployees,
      icon: <FaUserTimes />,
      color: "#f31010",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <FaBuilding />,
      color: "#ff6b00",
    },
    {
      title: "HR Managers",
      value: hrManagers,
      icon: <FaUserShield />,
      color: "#af9e88",
    },
    {
      title: "Super Admins",
      value: superAdmins,
      icon: <FaCrown />,
      color: "#111111",
    },
    {
      title: "Total Salary",
      value: `₹ ${totalSalary.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      color: "#ff6b00",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <section className="hero-card">
          <div className="hero-left">
            <span className="hero-badge">
              <HiOutlineSparkles />
              Employee Management
            </span>

            <h1>Good Morning 👋</h1>

            <p>
              Welcome back. Here's a quick overview of your organization and
              employee statistics.
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-mini-card">
              <FiTrendingUp className="trend-icon" />

              <h3>Growth</h3>

              <h2>+12%</h2>

              <small>Compared to last month</small>
            </div>
          </div>
        </section>
        <section className="quick-actions">
          <div className="quick-card" onClick={() => navigate("/employees")}>
            <h3>Employees</h3>
            <p>Manage employee records.</p>
          </div>

          <div className="quick-card" onClick={() => navigate("/department")}>
            <h3>Departments</h3>
            <p>Manage organization departments.</p>
          </div>

          <div className="quick-card" onClick={() => navigate("/attendance")}>
            <h3>Attendance</h3>
            <p>Track employee attendance.</p>
          </div>

          <div className="quick-card" onClick={() => navigate("/leave")}>
            <h3>Leave</h3>
            <p>Approve and manage leave requests.</p>
          </div>

          <div className="quick-card" onClick={() => navigate("/payroll")}>
            <h3>Payroll</h3>
            <p>Manage salary and payroll.</p>
          </div>

          <div className="quick-card" onClick={() => navigate("/reports")}>
            <h3>Reports</h3>
            <p>View HR reports and analytics.</p>
          </div>
        </section>
        <section className="analytics-summary">
          <div className="analytics-card blue">
            <h4>Total Payroll</h4>
            <h2>₹ {totalSalary.toLocaleString()}</h2>
            <span>Monthly Salary Expense</span>
          </div>

          <div className="analytics-card green">
            <h4>Active Employees</h4>
            <h2>{activeEmployees}</h2>
            <span>Currently Working</span>
          </div>

          <div className="analytics-card orange">
            <h4>Departments</h4>
            <h2>{totalDepartments}</h2>
            <span>Across Organization</span>
          </div>
        </section>
        <section className="insight-grid" ref={chartSectionRef}>
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon" style={{ background: item.color }}>
                {item.icon}
              </div>

              <div className="stat-content">
                <p>{item.title}</p>

                <h2>{item.value}</h2>

                <div className="stat-footer">
                  <span className="growth">
                    <FaArrowUp />
                    12%
                  </span>

                  <small>Compared to last month</small>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="insight-grid">
          <div className="insight-card">
            <div className="insight-header">
              <h2>Department Analytics</h2>
              <span>{totalDepartments} Departments</span>
            </div>

            <Bar
              data={departmentChart}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                    grid: {
                      color: "#EEF2F7",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="insight-card">
            <div className="insight-header">
              <h2>Salary Overview</h2>
              <span>Total Payroll</span>
            </div>

            <Bar
              data={salaryChart}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "#EEF2F7",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </section>

        <section className="recent-section">
          <div className="section-title">
            <div>
              <h2>Recent Employees</h2>
              <p>Latest employee records</p>
            </div>
          </div>

          <div className="employee-table">
            <div className="table-header">
              <span>Employee</span>
              <span>Department</span>
              <span>Role</span>
              <span>Status</span>
              <span>Salary</span>
            </div>

            {employees.length === 0 ? (
              <div className="empty-state">No Employees Found</div>
            ) : (
              employees.slice(0, 6).map((emp) => (
                <div className="table-row" key={emp._id}>
                  <div className="employee-info">
                    <div className="employee-avatar">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h4>{emp.name}</h4>

                      <small>{emp.email}</small>
                    </div>
                  </div>

                  <span>{emp.department}</span>

                  <span>{emp.role}</span>

                  <span
                    className={
                      emp.status === "ACTIVE"
                        ? "status-badge active"
                        : "status-badge inactive"
                    }
                  >
                    {emp.status}
                  </span>

                  <strong>₹ {Number(emp.salary).toLocaleString()}</strong>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
