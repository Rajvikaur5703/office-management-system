import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common
import Login from "./pages/Login";
import Layout from "./pages/Layout";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployee from "./pages/admin/AdminEmployee";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminDocument from "./pages/admin/AdminDocument";
import AdminLeave from "./pages/admin/AdminLeave";
import AdminDepartment from "./pages/admin/AdminDepartment";

// Employee
import EmpDashboard from "./pages/employee/EmpDashboard";
import Tasks from "./pages/employee/Tasks";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Profile from "./pages/employee/Profile";

function App() {
 
  return (
   <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Login />} />

        {/* Admin Routes - All wrapped in one Admin Layout */}
        <Route path="/admin" element={<Layout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employee" element={<AdminEmployee />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="department" element={<AdminDepartment />} />
          <Route path="documents" element={<AdminDocument />} />
          <Route path="leave" element={<AdminLeave />} />
        </Route>

        {/* Employee Routes - All wrapped in one Employee Layout */}
        <Route path="/employee" element={<Layout role="user" />}>
        <Route index element={<EmpDashboard />} />
          <Route path="dashboard" element={<EmpDashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
