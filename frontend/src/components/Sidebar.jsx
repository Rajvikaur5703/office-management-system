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
      { name: "Leave", path: "/employee/leave" },
      { name: "Attendance", path: "/employee/attendance" },
      { name: "Documents", path: "/employee/documents" },
      { name: "Profile", path: "/employee/profile" },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <div className="bg-dark text-white vh-100 p-3 position-fixed top-0 start-0 shadow" style={{
      width: "250px", zIndex: 1000, overflowY: "auto"
    }}>
      <h4 className="text-center mb-4 border-bottom pb-3">
        {role === "admin" ? "Admin Panel" : "Employee Portal"}
      </h4>

      <div className="list-group list-group-flush">
        {currentMenu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`list-group-item list-group-item-action bg-dark text-white border-0 py-3 ${isActive ? "bg-primary active" : ""
                }`}
              style={{
                transition: "all 0.2s ease-in-out",
                fontSize: "0.95rem",
                borderLeft: isActive ? "2px solid #fff" : "2px solid transparent"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.paddingLeft = "25px"; // Moves text right
                e.currentTarget.style.backgroundColor = "#2c3034"; // Slight grey highlight
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.paddingLeft = "16px"; // Reset to px-3 equivalent
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item.name}
            </Link>
          );
        })}

        <hr className="bg-secondary" />

        <Link
          to="/"
          className="list-group-item list-group-item-action bg-danger text-white border-0 rounded mt-2 text-center"
        >
          Logout
        </Link>
      </div>
    </div >
  );
}

export default Sidebar;