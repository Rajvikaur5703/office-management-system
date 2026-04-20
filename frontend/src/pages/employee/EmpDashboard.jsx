import React, { useState, useEffect } from "react";
import axios from "axios";

function EmpDashboard() {
  const [empName, setEmpName] = useState("Employee");

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userData = JSON.parse(userString);
        // 3. Update state if the name exists in the stored object
        if (userData && userData.name) {
          setEmpName(userData.name);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage", err);
      }
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emp/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserName(res.data.name);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };


  const stats = [
    { title: 'Total Tasks', value: '0', icon: 'bi-list-check', color: 'primary' },
    { title: 'Attendance', value: '0', icon: 'bi-check-circle', color: 'success' },
    { title: 'Active Projects', value: '0', icon: 'bi-briefcase', color: 'warning' },
    { title: 'Meetings', value: '0', icon: 'bi-clock', color: 'info' }
  ];

  return (
    <div className="container-fluid py-4">
      {/* --- NEW WELCOME SECTION --- */}
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
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className={`rounded-3 p-3 bg-${stat.color}-subtle text-${stat.color} me-3`}>
                    <i className={`bi ${stat.icon} fs-4`}></i>
                  </div>
                  <div>
                    <p className="text-muted small mb-0 fw-bold text-uppercase">{stat.title}</p>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
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

      {/* Placeholder for Recent Tasks or News */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="p-5 border-2 border-dashed border-secondary rounded-4 bg-light text-center">
            <p className="text-muted mb-0">More dashboard widgets coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;