import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);

  // Check admin role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Sample Stats Data
  useEffect(() => {
    const sampleStats = [
      { title: "Total Employees", value: 25, color: "primary" },
      { title: "Total Tasks", value: 120, color: "success" },
      { title: "Present Today", value: 18, color: "info" },
      { title: "Pending Tasks", value: 7, color: "warning" },
    ];

    setStats(sampleStats);
  }, []);

  // ✅ Sample Activities Data
  useEffect(() => {
    const sampleActivities = [
      { message: "John added a new task" },
      { message: "Admin created a new employee" },
      { message: "Task marked as completed" },
      { message: "Meeting scheduled at 3 PM" },
    ];

    setActivities(sampleActivities);
  }, []);

  return (
    <div className="container-fluid py-4">
      <h1 className="fw-bold mb-4">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className={`card border-0 shadow-sm bg-${stat.color} text-white`}>
              <div className="card-body p-4">
                <h5 className="card-title text-uppercase opacity-75 small fw-bold">
                  {stat.title}
                </h5>
                <h2 className="display-6 fw-bold mb-0">{stat.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activities */}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
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