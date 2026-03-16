import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/sidebar.css";

function Sidebar({ role }) {
console.log("Sidebar role:", role);
  const adminMenu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Employees", path: "/admin/employee" },
  { name: "Tasks", path: "/admin/tasks" },
  { name: "Department", path: "/admin/department" },
  { name: "Attendance", path: "/admin/attendance" },
  { name: "Leave", path: "/admin/leave" },
  { name: "Documents", path: "/admin/documents" },
];

const employeeMenu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Attendance", path: "/attendance" },
  { name: "Leave", path: "/leave" },
  { name: "Profile", path: "/profile" },
];

  const menu = role === "admin" ? adminMenu : employeeMenu;

  return (
    <div className="sidebar">
      <h2 className="logo">
        {role === "admin" ? "Admin Panel" : "Employee Panel"}
      </h2>

      <ul className="menu">
        {menu.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}

        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;