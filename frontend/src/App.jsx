import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//common pages
import Login from "./pages/Login";
import Layout from "./pages/Layout";
//admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployee from "./pages/admin/AdminEmployee";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminDocument from "./pages/admin/AdminDocument";
import AdminLeave from "./pages/admin/AdminLeave";
import AdminDepartment from "./pages/admin/AdminDepartment";


//employee pages
import EmpDashboard from "./pages/employee/EmpDashboard";
import Tasks from "./pages/employee/Tasks";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Profile from "./pages/employee/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <Layout role="admin">
              <AdminDashboard />
            </Layout>
          }
        />

        <Route
          path="/admin/employee"
          element={
            <Layout role="admin">
              <AdminEmployee />
            </Layout>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <Layout role="admin">
              <AdminTasks />
            </Layout>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <Layout role="admin">
              <AdminAttendance />
            </Layout>
          }
        />

        <Route
          path="/admin/department"
          element={
            <Layout role="admin">
              <AdminDepartment />
            </Layout>
          }
        />

        <Route
          path="/admin/documents"
          element={
            <Layout role="admin">
              <AdminDocument />
            </Layout>
          }
        />

         <Route path="/admin/leave" 
         element={
          <Layout role="admin">
          <AdminLeave />
          </Layout>} 
          />
      
 

        {/* Employee Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout role="employee">
              <EmpDashboard />
            </Layout>
          }
        />

        {/* Employee Tasks */}
        <Route
          path="/tasks"
          element={
            <Layout role="employee">
              <Tasks />
            </Layout>
          }
        />

        {/* Employee Attendance */}
        <Route
          path="/attendance"
          element={
            <Layout role="employee">
              <Attendance />
            </Layout>
          }
        />

        {/* Employee Documents */}
        <Route
          path="/leave"
          element={
            <Layout role="employee">
              <Leave />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout role="employee">
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;