import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout({ role }) {
  return (
    <div className="layout-wrapper" style={{ display: "flex" }}>
      <Sidebar role={role} />

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