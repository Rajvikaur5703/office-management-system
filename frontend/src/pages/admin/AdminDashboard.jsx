import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardCharts from "../../components/AdminDashboardCharts";

function AdminDashboard() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ employeesPerDept: {}, taskStatus: {} });
  const [adminName, setAdminName] = useState("Admin");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

<<<<<<< HEAD
=======
  // Navigation handlers
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
  const handleCardClick = (route) => {
    navigate(route);
  };

<<<<<<< HEAD
  useEffect(() => {
    const userString = localStorage.getItem("user");

=======

  useEffect(() => {
    const userString = localStorage.getItem("user");

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
    if (role !== "admin" || !token) {
      navigate("/");
      return;
    }

<<<<<<< HEAD
    // Parsing the user object to get the name
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setAdminName(userData.name || "Admin");
=======
    // Parse the user object to get the name
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setAdminName(userData.name || "Admin"); // Use .name or whatever key your backend sends
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const statsRes = await fetch(`${API_BASE_URL}/api/admin/stats`, { headers });
        const sData = await statsRes.json();

        setStats([
          { title: "Total Employees", value: sData.totalEmployees || 0, icon: "👥", color: "#0d6efd", route: '/admin/employee' },
          { title: "Total Tasks", value: sData.totalTasks || 0, icon: "📝", color: "#198754", route: '/admin/tasks' },
          { title: "Present Today", value: sData.presentToday || 0, icon: "✅", color: "#0dcaf0", route: '/admin/attendance' },
          { title: "Pending Tasks", value: sData.pendingTasks || 0, icon: "⏳", color: "#ffc107", route: '/admin/tasks' },
        ]);

        setChartData({
          employeesPerDept: sData.employeesPerDept || {},
          taskStatus: sData.taskStatus || {}
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, role, token]);

  if (loading) return <div className="p-5 text-center fw-bold">Loading Dashboard...</div>;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0 text-dark">Welcome, {adminName}!</h2>
          <p className="text-muted small">System statistics overview</p>
        </div>
      </div>

      {/* Top 4 Stats Row - Clickable Cards*/}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
<<<<<<< HEAD
          <div key={i} className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-black-0 shadow-sm h-100 p-3"
=======
          <div key={i} className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100 p-3"
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
              style={{
                borderTop: `4px solid ${s.color}`, cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onClick={() => handleCardClick(s.route)}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-bold text-uppercase">{s.title}</div>
                  <h3 className="fw-bold mb-0">{s.value}</h3>
                </div>
                <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - 2 Parts */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white text-center">
            <h5 className="fw-bold mb-4">📊 Employees per Department</h5>
            <AdminDashboardCharts employeesPerDept={chartData.employeesPerDept} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white text-center">
            <h5 className="fw-bold mb-4">📈 Task Status Distribution</h5>
            <AdminDashboardCharts taskStatus={chartData.taskStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;