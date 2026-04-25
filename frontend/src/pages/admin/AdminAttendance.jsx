import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminAttendance() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [attendanceData, setAttendanceData] = useState([]);
  const [editAttendance, seteditAttendance] = useState(null);

  const token = localStorage.getItem("token");
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/attendance`);
      const todayAttendance = filterTodayAttendance(res.data);
      setAttendanceData(todayAttendance);
    } catch (err) {
      console.log(err);
    }
  };

  const filterTodayAttendance = (attendanceList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return attendanceList.filter(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const updateStatus = async (attendanceId, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/attendance/update-status/${attendanceId}`,
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
      </div>

      {/* Attendance Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp) => (
                  <tr key={emp._id} className="align-middle">
                    <td>{emp._id.slice(-4)}</td>
                    <td>{emp.employee?.name}</td>
                    <td>{new Date(emp.date).toLocaleDateString()}</td>
                    <td>
                      {/* Using dynamic Bootstrap Badges for status colors */}
                      <span className={`badge rounded-pill ${emp.status === "Present" ? "bg-success-subtle text-success" :
                        emp.status === "Absent" ? "bg-danger-subtle text-danger" :
                          "bg-warning-subtle text-warning"
                        } px-3 py-2`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>{emp.checkIn || "--:--"}</td>
                    <td>{emp.checkOut || "--:--"}</td>
                    <td>{emp.hours}</td>
                    <td className="text-end pe-4">
                      {editAttendance === emp._id ?
                        (
                          <div className="btn-group btn-group-sm">
                            <button className={`btn ${emp.status === "Absent" ? "btn-danger" : "btn-outline-danger"}`}
                              onClick={() => { updateStatus(emp._id, "Absent"); seteditAttendance(null); }}> Absent
                            </button>

                            <button className={`btn ${emp.status === "Present" ? "btn-success" : "btn-outline-success"}`}
                              onClick={() => { updateStatus(emp._id, "Present"); seteditAttendance(null); }}> Present
                            </button>

                            <button className={`btn ${emp.status === "HalfDay" ? "btn-info" : "btn-outline-info"}`}
                              onClick={() => { updateStatus(emp._id, "HalfDay"); seteditAttendance(null); }}> Half Day
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => seteditAttendance(emp._id)}>
                            Edit
                          </button>
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