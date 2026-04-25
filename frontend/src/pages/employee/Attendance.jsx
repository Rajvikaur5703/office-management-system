import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [showpopup, setshowpopup] = useState(false);
  const [status, setStatus] = useState("Not Marked");
  const [pin, setpin] = useState("");
  const [checkInTime, setCheckInTime] = useState("- -");
  const [history, sethistory] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
=======
  // Get today's date formatted nicely for display
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
  const todayDisplay = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleCheckIn = () => {
    setshowpopup(true);
  };

  const handlePin = async () => {
    if (pin === "2026") {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          alert("Session expired. Please login again.");
          return;
        }

        const user = JSON.parse(userData);
        const userId = user._id || user.id;

        if (!userId) {
          alert("User ID not found.");
          return;
        }

        const res = await axios.post(`${API_BASE_URL}/api/attendance/checkin`, {
          employee: userId,
          date: new Date(),
          checkIn: time
        });

        // Refresh the entire history from backend
        await fetchAttendance();

        setStatus("Present");
        setCheckInTime(time);
        setCheckInDate(now);

        setshowpopup(false);
        setpin("");

      } catch (err) {
        console.error("Check-in Error:", err);
        alert(`Server Error: ${err.response?.data?.message || err.message}`);
      }

    } else if (!pin) {
      alert("Please enter your PIN");
    } else {
      alert("Invalid PIN");
    }
  };

  const fetchAttendance = async () => {
    const userData = localStorage.getItem("user");

    if (!userData || userData === "undefined") {
      console.log("No user found in localStorage yet...");
      setIsLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userData);
      const userId = user._id || user.id;

      console.log("Fetching attendance for user ID:", userId);

      const res = await axios.get(`${API_BASE_URL}/api/attendance/${userId}`);

      console.log("API Response:", res.data);

      const data = Array.isArray(res.data) ? res.data : [];
      sethistory(data);

      if (data.length > 0) {
        const latest = data[0];

<<<<<<< HEAD
=======
        // Compare dates properly
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        const latestDate = new Date(latest.date);
        const today = new Date();

        const isToday = latestDate.toDateString() === today.toDateString();
        const hasNotCheckedOut = !latest.checkOut || latest.checkOut === "-" || latest.checkOut === null;

        console.log("Latest record:", { latestDate, isToday, hasNotCheckedOut, checkOut: latest.checkOut });

        if (isToday && hasNotCheckedOut) {
          setStatus("Present");
          setCheckInTime(latest.checkIn);

          if (latest.checkIn) {
            const [hours, minutes] = latest.checkIn.split(':');
            const checkInDateTime = new Date();
            checkInDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
            setCheckInDate(checkInDateTime);
          }
        } else if (isToday && !hasNotCheckedOut) {
          setStatus("Checked Out");
          setCheckInTime(latest.checkIn);
        } else {
          setStatus("Not Marked");
          setCheckInTime("- -");
        }
      } else {
        setStatus("Not Marked");
        setCheckInTime("- -");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
<<<<<<< HEAD
  }, []);
=======
  }, []); // Run once on mount
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848

  const handleCheckOut = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);

    try {
      const latestRecord = history[0];

      if (!latestRecord?.createdAt) {
        alert("No check-in record found.");
        return;
      }

      const checkInTime = new Date(latestRecord.createdAt); // ✅ use DB timestamp
      const now = new Date();

      const diffMs = now - checkInTime; // difference in milliseconds

<<<<<<< HEAD
      const totalMinutes = Math.round(diffMs / (1000 * 60));
=======
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const totalHours = `${hours}h ${minutes}m`;

      const checkoutTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      await axios.put(
        `${API_BASE_URL}/api/attendance/checkout/${latestRecord._id}`,
        { checkOut: checkoutTime, hours: totalHours }
      );

      await fetchAttendance();
      setStatus("Checked Out");

    } catch (err) {
      console.error("Check-out Error:", err);
      alert(`Server Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsCheckingOut(false);
<<<<<<< HEAD

=======
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">My Attendance</h2>

      <div className="row g-4">
        {/* Left Side: Check-in Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-black-0 h-100">
            <div className="card-body text-center p-4">
              <h5 className="text-muted text-uppercase small fw-bold mb-3">Today's Status</h5>
              <div className="mb-4">
                <h3 className="fw-bold">{todayDisplay}</h3>
                <span className={`badge rounded-pill px-3 py-2 ${status === "Present" ? "bg-success" : "bg-warning text-dark"}`}>
                  {status}
                </span>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-primary px-4 shadow-sm"
                  onClick={handleCheckIn}
                  disabled={status === "Present" || status === "Checked Out"}
                >
                  Check In
                </button>
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handleCheckOut}
                  disabled={status !== "Present"}
                >
                  Check Out
                </button>
              </div>
              <p className="mt-3 text-muted small">Check-in time: {checkInTime}</p>
            </div>
          </div>
        </div>

        {/* POPUP */}
        {showpopup && (
          <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h5 className="mb-3">Enter PIN</h5>

                <input
                  type="password"
                  className="form-control mb-3"
                  value={pin}
                  onChange={(e) => setpin(e.target.value)}
                  placeholder="Enter your PIN"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handlePin()}
                />

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-success" onClick={handlePin} >
                    OK
                  </button>

                  <button className="btn btn-secondary" onClick={() => {
                    setshowpopup(false);
                    setpin("");
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: History Table */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-black-0">
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
                  {history.length > 0 ? (
                    history.map((item, index) => (
                      <tr key={item._id || index}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.checkIn}</td>
                        <td>{item.checkOut && item.checkOut !== "-" ? item.checkOut : "- -"}</td>
                        <td>{item.hours && item.hours !== "-" ? item.hours : "- -"}</td>
                        <td className="pe-4 text-end">
                          <span className={`badge ${item.status === "Present"
                            ? "bg-success-subtle text-success"
                            : item.status === "Absent"
                              ? "bg-danger-subtle text-danger"
                              : "bg-warning-subtle text-warning"
                            }`}>
                            {item.status || "Completed"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No attendance records found.
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

export default Attendance;   