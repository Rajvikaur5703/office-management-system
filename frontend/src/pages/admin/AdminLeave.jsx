import React, { useState } from "react";

function AdminLeave() {
  const [leaves, setLeaves] = useState([
    { id: 1, employee: "John Doe", from: "2026-03-20", to: "2026-03-22", reason: "Medical Leave", status: "Pending" },
    { id: 2, employee: "Jane Smith", from: "2026-03-25", to: "2026-03-26", reason: "Personal Work", status: "Pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  // Easy helper to pick badge colors
  const getStatusBadge = (status) => {
    if (status === "Approved") return "bg-success";
    if (status === "Rejected") return "bg-danger";
    return "bg-warning text-dark"; // Default for Pending
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Leave Requests</h2>
        <p className="text-muted">Review and manage employee leave applications.</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Employee</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="ps-4 fw-bold">{leave.employee}</td>
                  <td>
                    <div className="small text-muted">{leave.from}</div>
                    <div className="small fw-bold">to {leave.to}</div>
                  </td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`badge rounded-pill ${getStatusBadge(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {leave.status === "Pending" ? (
                      <div className="btn-group shadow-sm">
                        <button 
                          className="btn btn-sm btn-success" 
                          onClick={() => updateStatus(leave.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => updateStatus(leave.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted small italic">Processed</span>
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

export default AdminLeave;