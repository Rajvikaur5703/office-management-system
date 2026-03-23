import React, { useState } from "react";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    from: "",
    to: "",
    description: "",
    appliedDate: new Date().toISOString().split('T')[0] // Default to today
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaves([...leaves, { ...formData, status: "Pending" }]);
    setFormData({ type: "", from: "", to: "", description: "", appliedDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Leave Management</h2>

      <div className="row g-4">
        {/* Left Column: Add Leave Form */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0 fw-bold">➕ Apply for Leave</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Leave Type</label>
                  <select name="type" className="form-select" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold">From</label>
                    <input type="date" name="from" className="form-control" value={formData.from} onChange={handleChange} required />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold">To</label>
                    <input type="date" name="to" className="form-control" value={formData.to} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea name="description" className="form-control" rows="3" placeholder="Reason for leave..." value={formData.description} onChange={handleChange} required></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Application Date</label>
                  <input type="date" name="appliedDate" className="form-control bg-light" value={formData.appliedDate} readOnly />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Leave History Table */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">My Leave History</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-uppercase small">
                  <tr>
                    <th className="ps-4">Type</th>
                    <th>Duration</th>
                    <th>Applied</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.length > 0 ? (
                    leaves.map((leave, index) => (
                      <tr key={index}>
                        <td className="ps-4">
                          <div className="fw-bold">{leave.type}</div>
                          <div className="text-muted small text-truncate" style={{maxWidth: '150px'}}>{leave.description}</div>
                        </td>
                        <td>
                          <div className="small fw-bold">{leave.from}</div>
                          <div className="text-muted small">to {leave.to}</div>
                        </td>
                        <td className="text-muted">{leave.appliedDate}</td>
                        <td>
                          <span className="badge rounded-pill bg-info-subtle text-info px-3">
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">
                        No leave applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leave;