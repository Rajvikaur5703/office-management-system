import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation(); // Used to highlight the active link

  // Combined menus into one object for cleaner access
  const menus = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Employees", path: "/admin/employee" },
      { name: "Tasks", path: "/admin/tasks" },
      { name: "Department", path: "/admin/department" },
      { name: "Attendance", path: "/admin/attendance" },
      { name: "Leave", path: "/admin/leave" },
      { name: "Documents", path: "/admin/documents" },
    ],
    user: [
      { name: "Dashboard", path: "/employee/dashboard" },
      { name: "Tasks", path: "/employee/tasks" },
      { name: "Attendance", path: "/employee/attendance" },
      { name: "Leave", path: "/employee/leave" },
      { name: "Profile", path: "/employee/profile" },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="text-center mb-4 border-bottom pb-3">
        {role === "admin" ? "Admin Panel" : "Employee Portal"}
      </h4>

      <div className="list-group list-group-flush">
        {currentMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`list-group-item list-group-item-action bg-dark text-white border-0 py-2 ${
              location.pathname === item.path ? "bg-primary active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}

        <hr className="bg-secondary" />
        
        <Link 
          to="/" 
          className="list-group-item list-group-item-action bg-danger text-white border-0 rounded mt-2 text-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;