import Illustration from "../assets/hr-illustration.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful", {
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
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src={Illustration}
          alt="HR Illustration"
          className="login-illustration"
        />

        <div className="login-brand">
          <span className="login-badge">Employee Management System</span>

          <h1>Employee Management System</h1>
          <p>
            Manage employees, departments, roles and organizational hierarchy
            securely through one centralized platform.
          </p>

          <div className="login-features">
            <div className="feature-item">
              <FaUsers />
              <span>Employee Management</span>
            </div>

            <div className="feature-item">
              <FaChartLine />
              <span>Analytics Dashboard</span>
            </div>

            <div className="feature-item">
              <FaShieldAlt />
              <span>Secure Authentication</span>
            </div>
          </div>

          <div className="login-dots">
            <span className="active"></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back </h2>

          <p>Sign in to access your Employee Management Dashboard</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login to Dashboard
            </button>
          </form>

          <div className="login-footer">
            <p>Role Based Access for Super Admin, HR Manager and Employee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
