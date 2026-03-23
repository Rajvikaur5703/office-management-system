import React from "react";

function Tasks() {
  const stats = [
    { title: 'Total Tasks', value: '250', icon: 'bi-list-task', color: 'primary' },
    { title: 'Pending', value: '100', icon: 'bi-clock-history', color: 'danger' },
    { title: 'In Progress', value: '50', icon: 'bi-gear-wide-connected', color: 'warning' },
    { title: 'Completed', value: '100', icon: 'bi-check2-circle', color: 'success' }
  ];

  const tasks = [
    { name: 'UI Design', deadline: '12 Mar 2026', priority: 'High', status: 'Pending' },
    { name: 'Monthly Report', deadline: '15 Mar 2026', priority: 'Medium', status: 'Completed' },
    { name: 'Meeting Slides', deadline: '18 Mar 2026', priority: 'Low', status: 'In Progress' },
  ];

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
                <th className="ps-4">Task Name</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="ps-4 fw-bold">{task.name}</td>
                  <td><i className="bi bi-calendar-event me-2 text-muted"></i>{task.deadline}</td>
                  <td>
                    <span className={getPriorityClass(task.priority)}>
                      ● {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${
                      task.status === 'Completed' ? 'bg-success' : 
                      task.status === 'In Progress' ? 'bg-info' : 'bg-secondary'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary px-3">
                      Update
                    </button>
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