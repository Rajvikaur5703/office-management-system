import React, { useState } from "react";

function AdminTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design UI", assigned: "John", status: "pending", dueDate: "2026-03-15" },
    { id: 2, title: "Fix Bug", assigned: "Jane", status: "in-progress", dueDate: "2026-03-20" }
  ]);

  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, title, assigned, dueDate } : t));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), title, assigned, status: "pending", dueDate }]);
    }
    setTitle(""); setAssigned(""); setDueDate("");
  };

  const editTask = (task) => {
    setTitle(task.title);
    setAssigned(task.assigned);
    setDueDate(task.dueDate);
    setEditId(task.id);
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Task Management</h2>

      {/* Add/Edit Task Form Card */}
      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body">
          <form className="row g-3 align-items-end" onSubmit={addTask}>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Task Title</label>
              <input type="text" className="form-control" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Assign To</label>
              <input type="text" className="form-control" placeholder="Employee Name" value={assigned} onChange={(e) => setAssigned(e.target.value)} required />
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

      {/* Task Table */}
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
                <tr key={task.id}>
                  <td className="ps-4">
                    <div className="fw-bold">{task.title}</div>
                  </td>
                  <td><span className="text-muted">{task.assigned}</span></td>
                  <td>
                    <span className={`badge rounded-pill ${
                      task.status === 'pending' ? 'bg-warning text-dark' : 
                      task.status === 'in-progress' ? 'bg-info text-white' : 'bg-success'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.dueDate}</td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editTask(task)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>Delete</button>
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