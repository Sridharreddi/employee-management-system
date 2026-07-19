import {
  FaChartBar,
  FaUsers,
  FaUserCheck,
  FaMoneyCheckAlt,
  FaBuilding,
  FaDownload,
} from "react-icons/fa";

import "../styles/Reports.css";

function Reports() {
  const reportCards = [
    {
      title: "Total Employees",
      value: "250",
      icon: <FaUsers />,
      color: "blue",
    },
    {
      title: "Attendance Rate",
      value: "96%",
      icon: <FaUserCheck />,
      color: "green",
    },
    {
      title: "Monthly Payroll",
      value: "₹48,50,000",
      icon: <FaMoneyCheckAlt />,
      color: "orange",
    },
    {
      title: "Departments",
      value: "12",
      icon: <FaBuilding />,
      color: "red",
    },
  ];

  const reports = [
    {
      id: 1,
      name: "Employee Report",
      description: "Complete employee details and records.",
      date: "18 Jul 2026",
    },
    {
      id: 2,
      name: "Attendance Report",
      description: "Daily and monthly attendance summary.",
      date: "18 Jul 2026",
    },
    {
      id: 3,
      name: "Payroll Report",
      description: "Salary, bonus and deductions report.",
      date: "18 Jul 2026",
    },
    {
      id: 4,
      name: "Department Report",
      description: "Department wise employee statistics.",
      date: "18 Jul 2026",
    },
  ];

  return (
    <div className="reports-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaChartBar />
            Reports & Analytics
          </span>

          <h1>Reports</h1>

          <p>Generate and download HR reports with real-time insights.</p>
        </div>
      </div>

      <div className="report-summary">
        {reportCards.map((card, index) => (
          <div className="summary-card" key={index}>
            <div className={`reports-summary-icon ${card.color}`}>
              {card.icon}
            </div>

            <div>
              <h2>{card.value}</h2>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="report-list">
        {reports.map((report) => (
          <div className="report-card" key={report.id}>
            <div>
              <h3>{report.name}</h3>
              <p>{report.description}</p>
              <span>{report.date}</span>
            </div>

            <button className="download-btn">
              <FaDownload />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
