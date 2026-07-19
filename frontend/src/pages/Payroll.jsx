import { useMemo, useState } from "react";
import {
  FaMoneyCheckAlt,
  FaSearch,
  FaWallet,
  FaRupeeSign,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import "../styles/Payroll.css";

function Payroll() {
  const [search, setSearch] = useState("");

  const [payroll] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      department: "Human Resources",
      basic: 50000,
      bonus: 5000,
      deduction: 2000,
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Alice Johnson",
      department: "IT",
      basic: 70000,
      bonus: 8000,
      deduction: 3500,
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Robert Brown",
      department: "Finance",
      basic: 60000,
      bonus: 6000,
      deduction: 2500,
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Emma Wilson",
      department: "Marketing",
      basic: 55000,
      bonus: 4000,
      deduction: 1800,
    },
  ]);

  const filteredPayroll = useMemo(() => {
    return payroll.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()),
    );
  }, [payroll, search]);

  const totalSalary = payroll.reduce((sum, emp) => sum + emp.basic, 0);

  const totalBonus = payroll.reduce((sum, emp) => sum + emp.bonus, 0);

  const totalDeduction = payroll.reduce((sum, emp) => sum + emp.deduction, 0);

  return (
    <div className="payroll-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaMoneyCheckAlt />
            Payroll Management
          </span>

          <h1>Payroll</h1>

          <p>Manage employee salaries, bonuses and deductions.</p>
        </div>
      </div>

      <div className="employee-summary">
        <div className="summary-card">
          <div className="payroll-summary-icon blue">
            <FaWallet />
          </div>

          <div>
            <h2>₹{totalSalary.toLocaleString()}</h2>
            <p>Total Salary</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="payroll-summary-icon green">
            <FaRupeeSign />
          </div>

          <div>
            <h2>₹{totalBonus.toLocaleString()}</h2>
            <p>Total Bonus</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="payroll-summary-icon red">
            <FaFileInvoiceDollar />
          </div>

          <div>
            <h2>₹{totalDeduction.toLocaleString()}</h2>
            <p>Total Deductions</p>
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
              <th>Basic Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayroll.map((emp) => {
              const net = emp.basic + emp.bonus - emp.deduction;

              return (
                <tr key={emp.id}>
                  <td>{emp.employeeId}</td>

                  <td>{emp.name}</td>

                  <td>{emp.department}</td>

                  <td>₹{emp.basic.toLocaleString()}</td>

                  <td>₹{emp.bonus.toLocaleString()}</td>

                  <td>₹{emp.deduction.toLocaleString()}</td>

                  <td>
                    <strong>₹{net.toLocaleString()}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
