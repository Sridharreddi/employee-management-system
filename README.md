# Employee Management System (EMS)

A Full Stack Employee Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application provides secure authentication, role-based access control, employee management, organizational hierarchy, and an interactive dashboard for managing employees efficiently.

---

## Features

### Authentication
- Secure Login
- Logout
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

### Dashboard
- Total Employees
- Active Employees
- Department Count
- Total Payroll
- Department Analytics
- Salary Overview
- Recent Employees

### Employee Management
- Add Employee
- View Employee Details
- Edit Employee
- Delete Employee
- Search Employees
- Filter Employees
- Sort Employees
- Pagination

### Organization Hierarchy
- Reporting Manager Assignment
- Employee Hierarchy Tree
- Direct Reportees

### Department Management
- Department Overview
- Search Departments

### Attendance
- Attendance Dashboard
- Present / Absent / Late Statistics

### Leave Management
- Leave Requests
- Leave Status Tracking

### Payroll
- Employee Salary Management
- Bonus & Deduction Overview

### Reports
- Employee Reports
- Attendance Reports
- Payroll Reports

### Profile
- User Profile
- Profile Information

### Settings
- Company Settings
- Security Settings
- Preferences

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- React Icons

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Mongoose

## Database

- MongoDB Atlas

---

# Folder Structure

```
Employee-Management-System
│
├── backend
│   ├── src
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── postman
├── EMS_Screenshots
├── README.md
└── API_Documentation.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Sridharreddi/employee-management-system.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# User Roles

### Super Admin

- Full Access
- Employee CRUD
- Department Management
- Dashboard Access
- Reports
- Organization Hierarchy

### HR Manager

- Employee Management
- Attendance
- Leave
- Payroll
- Reports

### Employee

- View Profile
- View Dashboard
- Limited Access

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------------|
| POST | /api/auth/login |
| POST | /api/auth/logout |

## Employees

| Method | Endpoint |
|----------|----------------------------|
| GET | /api/employees |
| GET | /api/employees/:id |
| POST | /api/employees |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |
| GET | /api/employees/:id/reportees |

---

# Project Screenshots

Screenshots are available inside the **EMS_Screenshots** folder.

Included screenshots:

- Login
- Dashboard
- Employees
- Add Employee
- Edit Employee
- Department
- Attendance
- Leave
- Payroll
- Reports
- Organization Hierarchy
- Settings
- Profile

---

# Future Enhancements

- Docker Support
- CSV Import
- Soft Delete
- Dashboard Charts
- Dark Mode
- Unit Testing
- Live Deployment

---

# Author

**Sridhar Reddy Challa**

GitHub:

https://github.com/Sridharreddi
