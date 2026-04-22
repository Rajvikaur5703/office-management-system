import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Tasks() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setfilter] = useState("all");
  const [search, setSearch] = useState("");

  // Get Auth data
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Try to get ID first, fall back to name if that's how your API is set up
  const employeeIdentifier = user?._id || user?.id || user?.name;

  const fetchTasks = useCallback(async () => {
    if (!employeeIdentifier) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/tasks/employee/${employeeIdentifier}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [employeeIdentifier, token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/tasks/update-status/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.assigned?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "all" || task.status === filter;
    return matchesSearch && matchesStatus;
  });

  // Stats Logic
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  const stats = [
    { title: 'Total Tasks', value: totalTasks, icon: 'bi-list-task', color: 'primary', filter: 'all' },
    { title: 'Pending', value: pendingTasks, icon: 'bi-clock-history', color: 'danger', filter: 'pending' },
    { title: 'In Progress', value: inProgressTasks, icon: 'bi-gear-wide-connected', color: 'warning', filter: 'in-progress' },
    { title: 'Completed', value: completedTasks, icon: 'bi-check2-circle', color: 'success', filter: 'completed' }
  ];

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'text-danger fw-bold';
    if (priority === 'Medium') return 'text-warning fw-bold';
    return 'text-success fw-bold';
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">My Tasks</h2>

      {/* Stats Cards */}
      <div className="row g-3 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3" style={{ cursor: 'pointer' }} onClick={() => setfilter(stat.filter)}>
            <div className={`card border-0 shadow-sm ${filter === stat.filter ? 'ring-2 border-primary' : ''}`} style={filter === stat.filter ? { border: '2px solid' } : {}}>
              <div className="card-body d-flex align-items-center">
                <div className={`rounded-circle p-3 bg-${stat.color} bg-opacity-10 text-${stat.color} me-3`}>
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <p className="text-muted small mb-0">{stat.title}</p>
                  <h4 className="fw-bold mb-0">{stat.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task List Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Current Assignments</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Title</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <div className="mt-2">Loading tasks...</div>
                  </td>
                </tr>
              ) : filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td className="ps-4 fw-bold">{task.title}</td>
                    <td>{task.dueDate ? task.dueDate.split("T")[0] : "No Deadline"}</td>
                    <td>
                      <span className={getPriorityClass(task.priority)}>
                        ● {task.priority || 'Normal'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 
                        ${task.status === "completed" ? "bg-success"
                          : task.status === "in-progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                        {task.status === "pending" ? "Pending" : task.status === "in-progress" ? "In Progress" : "Completed"}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      {editingTaskId === task._id ? (
                        <div className="btn-group btn-group-sm shadow-sm">
                          <button
                            className={`btn ${task.status === "pending" ? "btn-secondary" : "btn-outline-secondary"}`}
                            onClick={() => { updateStatus(task._id, "pending"); setEditingTaskId(null); }}>
                            Pending
                          </button>
                          <button
                            className={`btn ${task.status === "in-progress" ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => { updateStatus(task._id, "in-progress"); setEditingTaskId(null); }}>
                            In Progress
                          </button>
                          <button
                            className={`btn ${task.status === "completed" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => { updateStatus(task._id, "completed"); setEditingTaskId(null); }}>
                            Completed
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-sm btn-outline-primary px-3" onClick={() => setEditingTaskId(task._id)}>
                          Update
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-clipboard-x fs-2 d-block mb-2"></i>
                    No tasks found for your account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;