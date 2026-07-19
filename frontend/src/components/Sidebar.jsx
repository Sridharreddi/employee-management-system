import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaSitemap,
  FaBuilding,
  FaCalendarCheck,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import { toast } from "react-toastify";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successful", {
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
      navigate("/");
    }, 800);
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="logo-box">
            <FaBuilding />
          </div>

          <div>
            <h2 className="logo-title">EMS</h2>

            <span className="logo-subtitle">Employee Management</span>
          </div>
        </div>

        <nav className="menu">
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>

          {(role === "SUPER_ADMIN" || role === "HR_MANAGER") && (
            <>
              <Link
                to="/employees"
                className={location.pathname === "/employees" ? "active" : ""}
              >
                <FaUsers />
                <span>Employees</span>
              </Link>

              <Link
                to="/department"
                className={location.pathname === "/department" ? "active" : ""}
              >
                <FaBuilding />
                <span>Department</span>
              </Link>

              <Link
                to="/attendance"
                className={location.pathname === "/attendance" ? "active" : ""}
              >
                <FaCalendarCheck />
                <span>Attendance</span>
              </Link>

              <Link
                to="/leave"
                className={location.pathname === "/leave" ? "active" : ""}
              >
                <FaClipboardList />
                <span>Leave</span>
              </Link>

              <Link
                to="/payroll"
                className={location.pathname === "/payroll" ? "active" : ""}
              >
                <FaMoneyCheckAlt />
                <span>Payroll</span>
              </Link>

              <Link
                to="/reports"
                className={location.pathname === "/reports" ? "active" : ""}
              >
                <FaChartBar />
                <span>Reports</span>
              </Link>

              <Link
                to="/hierarchy"
                className={location.pathname === "/hierarchy" ? "active" : ""}
              >
                <FaSitemap />
                <span>Hierarchy</span>
              </Link>

              <Link
                to="/settings"
                className={location.pathname === "/settings" ? "active" : ""}
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </>
          )}

          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <FaUserCircle />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
