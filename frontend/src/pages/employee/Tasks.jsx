import React, { useState, useEffect } from "react";
import axios from "axios";


function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Calculate real stats from tasks
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress").length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed").length;


  const stats = [
    { title: 'Total Tasks', value: totalTasks, icon: 'bi-list-task', color: 'primary' },
    { title: 'Pending', value: pendingTasks, icon: 'bi-clock-history', color: 'danger' },
    { title: 'In Progress', value: inProgressTasks, icon: 'bi-gear-wide-connected', color: 'warning' },
    { title: 'Completed', value: completedTasks, icon: 'bi-check2-circle', color: 'success' }
  ];

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeName = user?.name;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/employee/${employeeName}`
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/update-status/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchTasks();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  // Easy helper for Priority colors
  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'text-danger fw-bold';
    if (priority === 'Medium') return 'text-warning fw-bold';
    return 'text-success fw-bold';
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">My Tasks</h2>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm">
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
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="ps-4 fw-bold">{task.title}</td>
                  <td><i className="bi bi-calendar-event me-2 text-muted"></i>{task.dueDate}</td>
                  <td>
                    <span className={getPriorityClass(task.priority)}>
                      ● {task.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 
                        ${task.status === "completed" ? "bg-success"
                          : task.status === "in-progress" ? "bg-warning text-dark" : "bg-secondary"}`}>

                      {task.status === "pending" ? "Pending" : task.status === "in-progress"
                        ? "In Progress" : "Completed"}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {editingTaskId === task._id ?
                      (
                        <div className="btn-group btn-group-sm">
                          <button className={`btn ${task.status === "pending" ? "btn-secondary" : "btn-outline-secondary"}`}
                            onClick={() => { updateStatus(task._id, "pending"); setEditingTaskId(null); }}> Pending
                          </button>

                          <button className={`btn ${task.status === "in-progress" ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => { updateStatus(task._id, "in-progress"); setEditingTaskId(null); }}> In Progress
                          </button>

                          <button className={`btn ${task.status === "completed" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => { updateStatus(task._id, "completed"); setEditingTaskId(null); }}> Completed
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-sm btn-outline-primary px-3" onClick={() => setEditingTaskId(task._id)}>
                          Update
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;