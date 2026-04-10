import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminTasks() {
  // 1. Re-enable state variables
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");

  // 1. Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log("Error fetching employees");
    }
  };


  // 2. Fetch tasks from backend on component mount
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/my-tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  // 3. Add or Update Task
  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing task
        await axios.put(`http://localhost:5000/api/tasks/update-task/${editId}`,
          { title, assigned, dueDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        // Add new task
        await axios.post("http://localhost:5000/api/tasks/add",
          { title, assigned, dueDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // Reset form and refresh list
      setTitle(""); setAssigned(""); setDueDate("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // 4. Edit Helper (Sets form values)
  const editTask = (task) => {
    setTitle(task.title);
    setAssigned(task.assigned);
    setDueDate(task.dueDate);
    setEditId(task._id); // MongoDB uses _id
  };

  // 5. Delete Task
  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
      } catch (err) {
        alert("Could not delete task");
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Task Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body">
          <form className="row g-3 align-items-end" onSubmit={addTask}>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Task Title</label>
              <input type="text" className="form-control" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Assign To</label>
              <select className="form-select" value={assigned} onChange={(e) => setAssigned(e.target.value)} required >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.name}> {emp.name} </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Due Date</label>
              <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <button type="submit" className={`btn w-100 ${editId ? 'btn-warning' : 'btn-primary'}`}>
                {editId ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due Date</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="ps-4">
                    <div className="fw-bold">{task.title}</div>
                  </td>
                  <td><span className="text-muted">{task.assigned}</span></td>
                  <td>
                    <span className={`badge rounded-pill ${task.status === 'pending' ? 'bg-warning text-dark' :
                      task.status === 'in-progress' ? 'bg-info text-white' : 'bg-success'
                      }`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.dueDate}</td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editTask(task)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task._id)}>Delete</button>
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

export default AdminTasks;