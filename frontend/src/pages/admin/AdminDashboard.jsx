import React from "react";

function AdminDashboard() {
  // Stat cards data to keep the JSX clean
  const stats = [
    { title: "Total Employees", value: "25", color: "primary", icon: "bi-people" },
    { title: "Total Tasks", value: "18", color: "success", icon: "bi-list-task" },
    { title: "Present Today", value: "18", color: "info", icon: "bi-check-circle" },
    { title: "Pending Tasks", value: "7", color: "warning", icon: "bi-clock-history" },
  ];

  return (
    <div className="container-fluid py-4">
      <h1 className="fw-bold mb-4">Admin Dashboard</h1>

      {/* Stats Cards Row */}
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

      {/* Recent Activity Section */}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <div className="bg-primary-subtle text-primary rounded-circle p-2 me-3">
                    <i className="bi bi-person-plus"></i>
                  </div>
                  <span>Employee <strong>Rahul</strong> was added to the system.</span>
                </li>
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <div className="bg-success-subtle text-success rounded-circle p-2 me-3">
                    <i className="bi bi-clipboard-check"></i>
                  </div>
                  <span>Task assigned to <strong>HR Team</strong>.</span>
                </li>
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <div className="bg-info-subtle text-info rounded-circle p-2 me-3">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <span>Attendance records updated for today.</span>
                </li>
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <div className="bg-warning-subtle text-warning rounded-circle p-2 me-3">
                    <i className="bi bi-file-earmark-arrow-up"></i>
                  </div>
                  <span>New document <strong>Policy_2026.pdf</strong> uploaded.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;