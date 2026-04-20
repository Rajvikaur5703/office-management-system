import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout({ role }) {
  return (
    <div className="layout-wrapper" style={{ display: "flex" }}>
      {/* Sidebar stays fixed on the side */}
      <Sidebar role={role} />

      {/* Main content area changes based on the URL */}
      <div className="layout-content" style={{
        flex: 1, padding: "20px", marginLeft: "250px", minHeight: "100vh",
        backgroundColor: "#f8f9fa"
      }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;