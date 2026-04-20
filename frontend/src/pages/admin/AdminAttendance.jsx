import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminAttendance() {
  // Simple data array - easy to manage or fetch from an API later
  const [attendanceData, setAttendanceData] = useState([]);
  const [editAttendance, seteditAttendance] = useState(null);

  const token = localStorage.getItem("token");
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendanceData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const updateStatus = async (attendanceId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/attendance/update-status/${attendanceId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchAttendance();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark">Attendance</h2>
          <p className="text-muted">Manage and view daily employee attendance records.</p>
        </div>
        <button className="btn btn-primary shadow-sm">Download Report</button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Hours</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp) => (
                  <tr key={emp._id} className="align-middle">
                    <td>{emp._id}</td>
                    <td>{emp.name}</td>
                    <td>
                      {/* Using dynamic Bootstrap Badges for status colors */}
                      <span className={`badge rounded-pill ${emp.status === "Present" ? "bg-success-subtle text-success" :
                        emp.status === "Absent" ? "bg-danger-subtle text-danger" :
                          "bg-warning-subtle text-warning"
                        } px-3 py-2`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>{emp.hours}</td>
                    <td className="text-end pe-4">
                      {editAttendance === emp._id ?
                        (
                          <div className="btn-group btn-group-sm">
                            <button className={`btn ${emp.status === "Absent" ? "btn-warning" : "btn-outline-warning"}`}
                              onClick={() => { updateStatus(emp._id, "Absent"); seteditAttendance(null); }}> Absent
                            </button>

                            <button className={`btn ${emp.status === "Present" ? "btn-success" : "btn-outline-success"}`}
                              onClick={() => { updateStatus(emp._id, "Present"); seteditAttendance(null); }}> Present
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => seteditAttendance(emp._id)}>
                            Edit
                          </button>
                          // <button className="btn btn-sm btn-outline-primary px-3" onClick={() => setEditingTaskId(task._id)}>
                          //   Update
                          // </button>
                        )}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAttendance;