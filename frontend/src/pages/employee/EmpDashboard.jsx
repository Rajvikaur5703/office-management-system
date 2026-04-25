import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboardCharts from "../../components/AdminDashboardCharts";

function EmpDashboard() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [empName, setEmpName] = useState("Employee");
  const [liveHours, setLiveHours] = useState("0h 0m");
  const [chartData, setChartData] = useState({
    taskStatus: { pending: 0, completed: 0, "in-progress": 0 }
  });
  const [stats, setStats] = useState({
    tasks: 0,
    attendance: 0,
    hoursWorked: "0h",
    completedTasks: 0,
    recentActivity: []
  });


  // FETCH DATA
  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id || user.id;

      //Fetch Dashboard Stats
      const res = await axios.get(`${API_BASE_URL}/api/emp/dashboard/${userId}`);

      //Fetch Attendance to get today's specific check-in time
      const attendanceRes = await axios.get(`${API_BASE_URL}/api/attendance/${userId}`);
      const history = attendanceRes.data;

      if (history && history.length > 0) {
        const latest = history[0];
        const today = new Date().toDateString();
        const recordDate = new Date(latest.date).toDateString();

        // If they are clocked in TODAY
        if (recordDate === today && (!latest.checkOut || latest.checkOut === "-")) {
          calculateLiveTime(latest.createdAt); // Use the DB timestamp
        } else if (recordDate === today && latest.hours) {
          // If they already checked out today, show the final hours
          setLiveHours(latest.hours);
        } else {
          setLiveHours("0h 0m");
        }
      }

      setStats({
        tasks: res.data.totalTasks || 0,
        attendance: res.data.attendanceDays || 0,
        hoursWorked: res.data.totalHours || "0h",
        completedTasks: res.data.completedTasks || 0,
        recentActivity: res.data.recentActivity || []
      });

      setChartData({ taskStatus: res.data.taskStatus || {} });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Helper function to calculate time difference
  const calculateLiveTime = (checkInTimestamp) => {
    const checkIn = new Date(checkInTimestamp);
    const now = new Date();
    const diffMs = now - checkIn;

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    setLiveHours(`${h}h ${m}m`);
  };

  // Update the live timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 60000); // Refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userData = JSON.parse(userString);
        if (userData?.name) {
          setEmpName(userData.name);
        }
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };


  // CARDS DATA
  const statsData = [
    {
      title: "Total Tasks",
      value: stats.tasks,
      icon: "bi-list-check",
      color: "primary",
      route: "/employee/tasks"
    },
    {
      title: "Attendance",
      value: stats.attendance,
      suffix: "%",
      icon: "bi-graph-up",
      color: "warning",
      route: "/employee/attendance"
    },
    {
      title: "Work Hours",
      value: liveHours,
      icon: "bi-clock-history",
      color: "info",
      route: "/employee/attendance"
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: "bi-check2-circle",
      color: "success",
      route: "/employee/tasks"
    }
  ];

  return (
    <div className="container-fluid py-4">

      {/* WELCOME */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">Welcome, {empName}!</h2>
        <p className="text-muted">Here’s your work overview</p>
      </div>

      {/* STATS CARDS */}
      <div className="row g-4">
        {statsData.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-black-0 shadow-sm h-100 p-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(stat.route)}
            >
              <div className="card-body d-flex align-items-center">
                <div
                  className={`rounded-4 p-3 bg-${stat.color}-subtle text-${stat.color} me-3`}
                >
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>

                <div>
                  <p className="text-muted small mb-1 fw-bold text-uppercase">
                    {stat.title}
                  </p>
                  <h4 className="fw-bold mb-0">
                    {stat.value}
                    {stat.suffix || ""}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section - 2 Parts */}
      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <div className="card border-black-0 shadow-sm p-4 h-100 bg-white">
            <h5 className="fw-bold mb-0">Recent Activity</h5>

            <div className="card-body">

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">

                  <thead className="bg-light">
                    <tr>
                      <th style={{ width: "60px" }}>#</th>
                      <th>Activity</th>
                      <th style={{ width: "200px" }}>Date & Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats.recentActivity.length > 0 ? (
                      stats.recentActivity.map((item, index) => (
                        <tr key={index} className="border-bottom">

                          {/* Index */}
                          <td className="fw-semibold text-muted">
                            {index + 1}
                          </td>

                          {/* Activity */}
                          <td>
                            <div className="d-flex align-items-center">

                              {/* Icon */}
                              <div className="me-3">
                                <span className="badge rounded-pill bg-light text-dark">
                                  {item.message.includes("completed") && "✅"}
                                  {item.message.includes("pending") && "🟡"}
                                  {item.message.includes("Present") && "🟢"}
                                  {!item.message.includes("completed") &&
                                    !item.message.includes("pending") &&
                                    !item.message.includes("Present") && "📌"}
                                </span>
                              </div>

                              {/* Message */}
                              <p className="mb-0 fw-semibold">
                                {item.message}
                              </p>

                            </div>
                          </td>

                          {/* Time */}
                          <td className="text-muted small">
                            {new Date(item.time).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short"
                            })}
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-5 text-muted">
                          <i className="bi bi-calendar-check fs-2 mb-2"></i>
                          <p className="mb-0">No recent activity</p>
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-black-0 shadow-sm p-4 h-100 bg-white text-center">
            <h5 className="fw-bold mb-4">📈 Task Status Distribution</h5>
            <AdminDashboardCharts taskStatus={chartData.taskStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;