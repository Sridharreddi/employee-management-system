import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Profile from "./pages/Profile";
import Hierarchy from "./pages/Hierarchy";

import Department from "./pages/Department";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}

        <Route path="/" element={<Login />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Employees */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Employees />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Details */}

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EmployeeDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Add Employee */}

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddEmployee />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Edit Employee */}

        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditEmployee />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Hierarchy */}

        <Route
          path="/hierarchy"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Hierarchy />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Department */}

        <Route
          path="/department"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Department />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Attendance />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Leave */}

        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Leave />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Payroll */}

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Payroll />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Reports />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
