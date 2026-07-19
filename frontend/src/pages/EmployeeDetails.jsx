import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/EmployeeDetails.css";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await API.get(`/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!employee) {
    return <h2>Employee Not Found</h2>;
  }

  return (
    <div className="employee-details-page">
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate("/employees")}>
          ← Back
        </button>

        <h2>Employee Details</h2>
      </div>

      <div className="employee-card">
        <div className="employee-image">
          <img
            src={
              employee.profileImage ||
              "https://ui-avatars.com/api/?name=" + employee.name
            }
            alt={employee.name}
          />
        </div>

        <div className="employee-info">
          <div className="info-row">
            <strong>Employee ID</strong>
            <span>{employee.employeeId}</span>
          </div>

          <div className="info-row">
            <strong>Name</strong>
            <span>{employee.name}</span>
          </div>

          <div className="info-row">
            <strong>Email</strong>
            <span>{employee.email}</span>
          </div>

          <div className="info-row">
            <strong>Phone</strong>
            <span>{employee.phone}</span>
          </div>

          <div className="info-row">
            <strong>Department</strong>
            <span>{employee.department}</span>
          </div>

          <div className="info-row">
            <strong>Designation</strong>
            <span>{employee.designation}</span>
          </div>

          <div className="info-row">
            <strong>Salary</strong>
            <span>₹ {employee.salary}</span>
          </div>

          <div className="info-row">
            <strong>Status</strong>
            <span>{employee.status}</span>
          </div>

          <div className="info-row">
            <strong>Role</strong>
            <span>{employee.role}</span>
          </div>

          <div className="info-row">
            <strong>Joining Date</strong>
            <span>{employee.joiningDate}</span>
          </div>

          <div className="info-row">
            <strong>Reporting Manager</strong>
            <span>{employee.reportingManager}</span>
          </div>

          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-employee/${employee._id}`)}
            >
              Edit
            </button>

            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
