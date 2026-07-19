import { FaBell, FaSearch, FaChevronDown, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="navbar">
      <div className="nav-left">
        <div>
          <h2>Good Morning 👋</h2>
          <p>{today}</p>
        </div>
      </div>

      <div className="nav-center">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input type="text" placeholder="Search employees..." />
        </div>
      </div>

      <div className="nav-right">
        <div
          className="notification"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell />
          <span className="notification-dot"></span>

          {showNotifications && (
            <div className="notification-dropdown">
              <h4>🔔Notifications</h4>

              <div className="notification-item">
                <strong>👤New Employee Added</strong>
                <span>Rahul Sharma joined the IT Department</span>
              </div>

              <div className="notification-item">
                <strong>📝Leave Request</strong>
                <span>Vinay requested 2 days leave</span>
              </div>

              <div className="notification-item">
                <strong>💰Payroll Updated</strong>
                <span>July payroll generated successfully</span>
              </div>
            </div>
          )}
        </div>
        <div className="profile-card" onClick={() => navigate("/profile")}>
          <div className="navbar-avatar">
            <FaUserCircle />
          </div>

          <div className="profile-info">
            <h4>{user?.name || "Admin"}</h4>
            <p>{user?.role || "SUPER_ADMIN"}</p>
          </div>

          <FaChevronDown className="down-arrow" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
