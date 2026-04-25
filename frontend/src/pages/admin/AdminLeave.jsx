import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminLeave() {
  const [leaves, setLeaves] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchLeaves = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/leave`);
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await axios.put(`${API_BASE_URL}/api/leave/${id}`, {
      status: newStatus,
    });

    fetchLeaves(); // refresh
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

      <div className="card shadow-sm border-black-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Date of Request</th>
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
                  <td>
                    {new Date(leave.createdAt || leave.date).toLocaleDateString()}
                  </td>
                  <td className="ps-4 fw-bold">{leave.name}</td>
                  <td>
                    <div className="small text-muted">{new Date(leave.fromdate).toLocaleDateString()}</div>
                    <div className="small fw-bold">to {new Date(leave.todate).toLocaleDateString()}</div>
                  </td>
                  <td>{leave.description}</td>
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
                          onClick={() => updateStatus(leave._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => updateStatus(leave._id, "Rejected")}
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
