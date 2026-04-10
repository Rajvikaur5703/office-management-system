import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [totalEmployees, setTotalEmployees] = useState(0);
  // const [activities, setActivities] = useState([]); // Added missing state 
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  // Check admin role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
    else {
      fetchDashboardData();
    }
  }, [navigate]);

  // 2. Centralized data fetching
  const fetchDashboardData = async () => {
    try {
      // You can call your specific count endpoint or get the full list
      const res = await axios.get("http://localhost:5000/api/auth/employees");

      // If the API returns an array, the length is your total count
      setTotalEmployees(res.data.length);

      // Set dummy activities so the map function doesn't fail
      setActivities([
        { message: "John added a new task" },
        { message: "Admin created a new employee" },
      ]);

      setLoading(false);
    } catch (err) {
      console.error("Could not Fetch dashboard data", err);
      setLoading(false);
    }
  };

  // 3. Define stats dynamically based on current state
  const stats = [
    { title: "Total Employees", value: totalEmployees || 0, color: "primary" },
    { title: "Total Tasks", value: 0, color: "success" },
    { title: "Present Today", value: 0, color: "info" },
    { title: "Pending Tasks", value: 0, color: "warning" },
  ];

  if (loading) return <div className="p-5">Loading Dashboard...</div>;
  const icons = ["👥", "📝", "✅", "⏳"];

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search tasks, documents, or projects..."
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end">
          <select className="form-select shadow-sm d-inline-block w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <p className="text-uppercase opacity-75 small fw-bold mb-1">{stat.title}</p>
                    <h2 className="display-6 fw-bold mb-0">{stat.value}</h2>
                  </div>
                  <span style={{ fontSize: "1.8rem", opacity: "0.8" }}>
                    {icons[index % icons.length]}
                  </span>
                </div>
                {/* <div className="d-flex align-items-center">
                  <span className="badge bg-success-subtle text-success border border-success-subtle me-2">
                    {stat.change}
                  </span>
                  <span className="text-muted small">vs last month</span>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Activities */}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-white py-3 border-0" style={{ borderRadius: "16px 16px 0 0" }}>
              <h5 className="mb-0 fw-bold" style={{ color: "#3e474bff" }}>
                <span className="me-2">⚡</span> Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {activities.map((act, index) => (
                  <li key={index} className="list-group-item px-0 py-3">
                    {act.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;