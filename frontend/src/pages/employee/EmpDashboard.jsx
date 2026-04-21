import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmpDashboard() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [empName, setEmpName] = useState("Employee");
  const [stats, setStats] = useState({
    tasks: 0,
    attendance: 0,
    hoursWorked: "0h",
    completedTasks: 0  // Changed from streak to completedTasks
  });

  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id || user.id;

      const res = await axios.get(
        `${API_BASE_URL}/api/emp/stats/${userId}`
      );

      console.log("Stats response:", res.data);

      setStats({
        tasks: res.data.totalTasks || 0,
        attendance: res.data.attendanceDays || 0,
        hoursWorked: res.data.totalHours || "0h",
        completedTasks: res.data.completedTasks || 0  // Changed from streak
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userData = JSON.parse(userString);
        if (userData && userData.name) {
          setEmpName(userData.name);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage", err);
      }
    }
  }, []);

  // Navigation handlers
  const handleCardClick = (route) => {
    navigate(route);
  };

  const statsData = [
    { title: 'Total Tasks', value: stats.tasks, icon: 'bi-list-check', color: 'primary', suffix: '', route: '/employee/tasks' },
    { title: 'Attendance', value: stats.attendance, icon: 'bi-graph-up', color: 'warning', suffix: '%', route: '/employee/attendance' },
    { title: 'Hours Worked', value: stats.hoursWorked, icon: 'bi-clock-history', color: 'info', suffix: '', route: '/employee/hours' },
    { title: 'Completed Tasks', value: stats.completedTasks, icon: 'bi-check2-circle', color: 'success', suffix: '', route: '/employee/tasks' }  // Changed
  ];

  return (
    <div className="container-fluid py-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-dark">Welcome, {empName}!</h2>
          <p className="text-muted">Here's what's happening with your projects today.</p>
        </div>
      </div>

      {/* Top Section: Search and Filter */}
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

      {/* Stats Grid */}
      <div className="row g-4">
        {statsData.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow-sm h-100 hover-lift"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(stat.route)}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className={`rounded-3 p-3 bg-${stat.color}-subtle text-${stat.color} me-3`}>
                    <i className={`bi ${stat.icon} fs-4`}></i>
                  </div>
                  <div>
                    <p className="text-muted small mb-0 fw-bold text-uppercase">{stat.title}</p>
                    <h3 className="fw-bold mb-0">
                      {stat.value}{stat.suffix}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-4 text-muted">
                <i className="bi bi-calendar-check fs-1"></i>
                <p className="mt-2 mb-0">Your recent activities will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;