import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserShield,
  FaEdit,
  FaLock,
  FaIdBadge,
  FaCalendarAlt,
} from "react-icons/fa";

import "../styles/Profile.css";

function Profile() {
  return (
    <div className="my-profile-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaUserCircle />
            My Profile
          </span>

          <h1>Profile Settings</h1>

          <p>
            View your account details and manage your personal information
            securely.
          </p>
        </div>
      </div>

      <div className="my-profile-card">
        {/* Profile Header */}
        <div className="my-profile-header">
          <div className="my-profile-avatar">
            <FaUserCircle />
          </div>

          <h2>Sridhar Reddy</h2>

          <span className="my-profile-role">SUPER_ADMIN</span>

          <p>Employee Management System Administrator</p>
        </div>

        {/* Information Cards */}
        <div className="my-profile-details">
          <div className="my-profile-item">
            <FaEnvelope className="my-profile-icon" />

            <div>
              <h4>Email Address</h4>
              <span>admin@gmail.com</span>
            </div>
          </div>

          <div className="my-profile-item">
            <FaPhone className="my-profile-icon" />

            <div>
              <h4>Phone Number</h4>
              <span>+91 9876543210</span>
            </div>
          </div>

          <div className="my-profile-item">
            <FaBuilding className="my-profile-icon" />

            <div>
              <h4>Department</h4>
              <span>Human Resources</span>
            </div>
          </div>

          <div className="my-profile-item">
            <FaUserShield className="my-profile-icon" />

            <div>
              <h4>Role</h4>
              <span>Administrator</span>
            </div>
          </div>

          <div className="my-profile-item">
            <FaIdBadge className="my-profile-icon" />

            <div>
              <h4>Employee ID</h4>
              <span>EMP001</span>
            </div>
          </div>

          <div className="my-profile-item">
            <FaCalendarAlt className="my-profile-icon" />

            <div>
              <h4>Joining Date</h4>
              <span>15 Jul 2025</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="profile-buttons">
          <button className="edit-profile">
            <FaEdit />
            Edit Profile
          </button>

          <button className="change-password">
            <FaLock />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
