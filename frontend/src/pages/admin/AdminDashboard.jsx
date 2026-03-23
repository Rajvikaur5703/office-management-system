import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin" || !token) {
      navigate("/");
    }
  }, [navigate, role, token]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const headers = { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        };

        // 1. Fetch Stats
        const statsRes = await fetch("http://localhost:5000/api/admin/stats", { headers });
        
        // Safety Check: If server returns HTML (404), don't try to parse as JSON
        if (!statsRes.ok) throw new Error(`Stats Fetch Failed: ${statsRes.status}`);
        
        const statsData = await statsRes.json();

        // 2. Fetch Activities
        const actRes = await fetch("http://localhost:5000/api/admin/activity", { headers });
        
        if (!actRes.ok) throw new Error(`Activity Fetch Failed: ${actRes.status}`);
        
        const actData = await actRes.json();

        // 3. Transform and Set State
        const formattedStats = [
          { title: "Total Employees", value: statsData.totalEmployees || 0, color: "primary" },
          { title: "Total Tasks", value: statsData.totalTasks || 0, color: "success" },
          { title: "Present Today", value: statsData.presentToday || 0, color: "info" },
          { title: "Pending Tasks", value: statsData.pendingTasks || 0, color: "warning" },
        ];
        
        setStats(formattedStats);
        setActivities(actData);
      } catch (error) {
        console.error("Dashboard Error:", error.message);
        // Fallback to zeros if fetch fails
        setStats([
          { title: "Total Employees", value: 0, color: "secondary" },
          { title: "Total Tasks", value: 0, color: "secondary" },
          { title: "Present Today", value: 0, color: "secondary" },
          { title: "Pending Tasks", value: 0, color: "secondary" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (token && role === "admin") {
      fetchDashboardData();
    }
  }, [token, role]);

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h1 className="fw-bold mb-4" style={{ color: "#2d3436" }}>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => {
          // Dynamic Gradients based on the title or index
          const gradients = [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple
            "linear-gradient(135deg, #2af598 0%, #009efd 100%)", // Green/Blue
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink/Red
            "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", // Orange/Yellow
          ];

          const icons = ["👥", "📝", "✅", "⏳"];

          return (
            <div key={index} className="col-12 col-sm-6 col-xl-3">
              <div 
                className="card border-0 shadow-lg text-white" 
                style={{ 
                  background: gradients[index % gradients.length],
                  borderRadius: "16px",
                  transition: "transform 0.2s ease-in-out"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-uppercase opacity-75 small fw-bold mb-1">{stat.title}</p>
                      <h2 className="display-6 fw-bold mb-0">{stat.value}</h2>
                    </div>
                    <span style={{ fontSize: "1.8rem", opacity: "0.8" }}>
                      {icons[index % icons.length]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-white py-3 border-0" style={{ borderRadius: "16px 16px 0 0" }}>
              <h5 className="mb-0 fw-bold" style={{ color: "#636e72" }}>
                <span className="me-2">⚡</span> Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {activities && activities.length > 0 ? (
                  activities.map((act, index) => (
                    <li key={index} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center border-0 border-bottom">
                      <div className="d-flex align-items-center">
                        <div 
                          className="me-3" 
                          style={{ 
                            width: "8px", 
                            height: "8px", 
                            backgroundColor: "#00cec9", 
                            borderRadius: "50%" 
                          }}
                        ></div>
                        <span className="text-dark fw-medium">{act.message}</span>
                      </div>
                      <small className="badge rounded-pill bg-light text-muted fw-normal p-2">
                        {act.timestamp ? new Date(act.timestamp).toLocaleTimeString() : "Just now"}
                      </small>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item px-0 py-3 text-muted">No recent activity</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;