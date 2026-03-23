import React, { useState } from "react";

function Attendance() {
  const [status, setStatus] = useState("Not Marked");
  const [checkInTime, setCheckInTime] = useState("- -");

  // Get today's date formatted nicely
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(time);
    setStatus("Present");
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">My Attendance</h2>

      <div className="row g-4">
        {/* Left Side: Check-in Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center p-4">
              <h5 className="text-muted text-uppercase small fw-bold mb-3">Today's Status</h5>
              <div className="mb-4">
                <h3 className="fw-bold">{today}</h3>
                <span className={`badge rounded-pill px-3 py-2 ${status === "Present" ? "bg-success" : "bg-warning text-dark"}`}>
                  {status}
                </span>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button 
                  className="btn btn-primary px-4 shadow-sm" 
                  onClick={handleCheckIn}
                  disabled={status === "Present"}
                >
                  Check In
                </button>
                <button 
                  className="btn btn-outline-secondary px-4"
                  disabled={status === "Not Marked"}
                >
                  Check Out
                </button>
              </div>
              <p className="mt-3 text-muted small">Check-in time: {checkInTime}</p>
            </div>
          </div>
        </div>

        {/* Right Side: History Table */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent History</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Hours</th>
                    <th className="pe-4 text-end">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-4">11 March 2026</td>
                    <td>09:00 AM</td>
                    <td>06:00 PM</td>
                    <td>9h</td>
                    <td className="pe-4 text-end">
                      <span className="badge bg-success-subtle text-success">Present</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4">10 March 2026</td>
                    <td>08:55 AM</td>
                    <td>05:45 PM</td>
                    <td>8h 50m</td>
                    <td className="pe-4 text-end">
                      <span className="badge bg-success-subtle text-success">Present</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;