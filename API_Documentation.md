# Employee Management System API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

## Login

**Endpoint**

```
POST /auth/login
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "role": "HR Manager"
  }
}
```

---

## Logout

**Endpoint**

```
POST /auth/logout
```

### Description

Logs out the authenticated user.

---

# Employee APIs

## Get All Employees

**Endpoint**

```
GET /employees
```

### Description

Returns all employees.

---

## Get Employee By ID

**Endpoint**

```
GET /employees/:id
```

### Description

Returns employee details.

---

## Add Employee

**Endpoint**

```
POST /employees
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "IT",
  "designation": "Software Engineer",
  "salary": 50000
}
```

### Success Response

```json
{
  "message": "Employee added successfully"
}
```

---

## Update Employee

**Endpoint**

```
PUT /employees/:id
```

### Description

Updates employee information.

---

## Delete Employee

**Endpoint**

```
DELETE /employees/:id
```

### Description

Deletes an employee.

---

## Get Reportees

**Endpoint**

```
GET /employees/:id/reportees
```

### Description

Returns all employees reporting to a manager.

---

# Department APIs

## Get Departments

```
GET /departments
```

Returns all departments.

---

# Attendance APIs

## Get Attendance

```
GET /attendance
```

Returns attendance records.

---

# Leave APIs

## Get Leave Requests

```
GET /leave
```

Returns leave requests.

---

# Payroll APIs

## Get Payroll

```
GET /payroll
```

Returns payroll details.

---

# Reports APIs

## Get Reports

```
GET /reports
```

Returns employee and payroll reports.

---

# Authorization

All protected APIs require a JWT token.

Example Header:

```
Authorization: Bearer <your_jwt_token>
```

---

# Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Created               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- React.js
