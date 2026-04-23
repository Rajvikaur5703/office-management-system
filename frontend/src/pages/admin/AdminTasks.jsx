import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminTasks() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [filter, setfilter] = useState("all");

  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getTasks();
    getEmployees();
  }, []);

  useEffect(() => {
    if (msg) {
      setTimeout(() => setMsg(""), 3000);
    }
  }, [msg]);

  const getTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks/my-tasks`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/emp`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        assigned,
        dueDate,
        status: "pending" // Add status explicitly
      };

      if (editId) {
        await axios.put(`${API_BASE_URL}/api/tasks/update-task/${editId}`, data);
        setMsg("Task updated!");
      } else {
        await axios.post(`${API_BASE_URL}/api/tasks/add`, data);
        setMsg("Task added!");
      }

      setTitle("");
      setAssigned("");
      setDueDate("");
      setEditId(null);
      setShowForm(false);
      getTasks();
    } catch (err) {
      setMsg("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const editTask = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setAssigned(task.assigned);
    setDueDate(task.dueDate);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const deleteTask = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/api/tasks/delete/${id}`);
        setMsg("Task deleted!");
        getTasks();
      } catch (err) {
        setMsg("Delete failed!");
      }
    }
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    const taskToUpdate = tasks.find(t => t._id === id); // Get the rest of the task data
    try {
      await axios.put(`${API_BASE_URL}/api/tasks/update-status/${id}`, { status: newStatus });
      getTasks();
      setMsg(`Task marked as ${newStatus}!`);
    } catch (err) {
      setMsg("Status update failed!");
      console.log(err);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditId(null);
    setTitle("");
    setAssigned("");
    setDueDate("");
  };

  const filteredTasks = tasks.filter(task => {
    // Check Search
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.assigned?.toLowerCase().includes(search.toLowerCase());

    // Check Status Filter
    const matchesStatus = filter === "all" || task.status === filter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2>Task Management</h2>
          <p className="text-muted">Total tasks: {tasks.length}</p>
        </div>
      </div>

      {/* Message */}
      {msg && (
        <div className="alert alert-info alert-dismissible">
          {msg}
          <button type="button" className="btn-close float-end" onClick={() => setMsg("")}></button>
        </div>
      )}

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

      {/* Search and Add Button */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by task title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add Task"}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editId ? "Edit Task" : "Add New Task"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row align-items-end"> {/* align-items-end keeps buttons level with inputs */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Task Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Assign To *</label>
                  <select
                    className="form-select"
                    value={assigned}
                    onChange={(e) => setAssigned(e.target.value)}
                    required
                  >
                    <option value="">Select Employee</option>
                    {/* Add a check for employees.length to ensure it's loaded */}
                    {employees && employees.length > 0 ? (
                      employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No employees found</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Due Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>

                {/* Buttons are now inside the row */}
                <div className="col-md-2 mb-3">
                  <label>&nbsp;</label>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-sm flex-fill" disabled={loading}>
                      {loading ? "..." : (editId ? "Update" : "Save")}
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={cancelForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tasks Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, idx) => {
                  // FIX 1: Find the employee name based on the assigned ID
                  const assignedEmployee = employees.find(emp => emp._id === task.assigned);

                  return (
                    <tr key={task._id}>
                      <td>{idx + 1}</td>
                      <td>{task.title}</td>
                      {/* Display Name if found, otherwise show "Unknown" or the ID */}
                      <td>{assignedEmployee ? assignedEmployee.name : "Unknown Employee"}</td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 
                    ${task.status === "completed" ? "bg-success"
                              : task.status === "in-progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                      <td>{task.dueDate ? task.dueDate.split('T')[0] : "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => editTask(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTask(task._id, task.title)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No tasks found</td>
                </tr>
              )}
            </tbody>
            {/* <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, idx) => (
                  <tr key={task._id}>
                    <td>{idx + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.assigned}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${task.status === "completed" ? "btn-success" : "btn-warning"}`}
                        onClick={() => updateStatus(task._id, task.status)}
                      >
                        {task.status || "pending"}
                      </button>
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => editTask(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteTask(task._id, task.title)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminTasks;   