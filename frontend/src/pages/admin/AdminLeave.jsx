import React, { useState } from "react";
import "../../assets/styles/admin/adminleave.css";

function AdminLeave() {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "John Doe",
      from: "2026-03-20",
      to: "2026-03-22",
      reason: "Medical Leave",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      from: "2026-03-25",
      to: "2026-03-26",
      reason: "Personal Work",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id ? { ...leave, status: newStatus } : leave
    );
    setLeaves(updatedLeaves);
  };

  return (
    <div className="admin-leave">
      <h2>Employee Leave Requests</h2>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>

              <td>
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(leave.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(leave.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLeave;