import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const [showpopup, setshowpopup] = useState(false);
  const [status, setStatus] = useState("Not Marked");
  const [pin, setpin] = useState("");
  const [checkInTime, setCheckInTime] = useState("- -");
  const [history, sethistory] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);

  // Use the environment variable from your Render settings
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Get today's date formatted nicely
  const today = new Date().toLocaleDateString('en-GB', {
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

        // Use BOTH _id and id to be safe
        const userId = user._id || user.id;

        if (!userId) {
          alert("User ID not found. Check console for user object structure.");
          console.log("User object from storage:", user);
          return;
        }

        const res = await axios.post(`${API_BASE_URL}/api/attendance/checkin`, {
          userId: userId,
          name: user.name,
          date: today,
          checkIn: time
        });

        // Update state
        sethistory([res.data, ...history]);
        setStatus("Present");
        setCheckInTime(time);
        setCheckInDate(now);

        // Reset and close
        setshowpopup(false);
        setpin("");
        alert("Check-in Successful!"); // Confirmation

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

  useEffect(() => {
    const fetchAttendance = async () => {
      const userData = localStorage.getItem("user");

      // Check if userData exists and isn't just an empty string/undefined
      if (!userData || userData === "undefined") {
        console.log("No user found in localStorage yet...");
        return;
      }

      try {
        const user = JSON.parse(userData);
        const res = await axios.get(`${API_BASE_URL}/api/attendance/${user._id}`);

        // Force the data to be an array so .map() doesn't break
        const data = Array.isArray(res.data) ? res.data : [];
        sethistory(data);

        if (data.length > 0) {
          const latest = data[0];
          const isToday = latest.date.trim().toLowerCase() === today.trim().toLowerCase();
          const hasNotCheckedOut = !latest.checkOut || latest.checkOut === "-";

          if (isToday) {
            if (hasNotCheckedOut) {
              setStatus("Present");
              setCheckInTime(latest.checkIn);
              // ... (keep your time parsing logic here)
            } else {
              setStatus("Checked Out");
              setCheckInTime(latest.checkIn);
            }
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAttendance();
  }, [today]);



  const handleCheckOut = async () => {

    const now = new Date();

    const checkoutTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const diff = now - checkInDate;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const totalHours = `${hours}h ${minutes}m`;

    try {
      const latestRecord = history[0];

      const res = await axios.put(
        `${API_BASE_URL}/api/attendance/checkout/${latestRecord._id}`,
        {
          checkOut: checkoutTime,
          hours: totalHours
        }
      );

      const updatedHistory = [...history];
      updatedHistory[0] = res.data;

      sethistory(updatedHistory);

    } catch (err) {
      console.log(err);
    }
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
                  onKeyDown={(e) => e.key === 'Enter' && handlePin()}
                  placeholder="Enter your PIN"
                />

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-success" onClick={handlePin} >
                    OK
                  </button>

                  <button className="btn btn-secondary" onClick={() => setshowpopup(false)} >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  {history.length > 0 ? (
                    history.map((item, index) => (
                      <tr key={item._id || index}>
                        <td>{item.date}</td>
                        <td>{item.checkIn}</td>
                        <td>{item.checkOut || "- -"}</td>
                        <td>{item.hours || "- -"}</td>
                        <td className="pe-4 text-end">
                          <span className="badge bg-success-subtle text-success">
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