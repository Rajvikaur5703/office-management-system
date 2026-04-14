import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const [showpopup, setshowpopup] = useState(false);
  const [status, setStatus] = useState("Not Marked");
  const [pin, setpin] = useState();
  const [checkInTime, setCheckInTime] = useState("- -");
  const [history, sethistory] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);


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
    console.log("Button clicked"); // debug
    if (pin === "2026") {
      const now = new Date();

      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      try {
        const user = JSON.parse(localStorage.getItem("user")); // dynamic user
        const res = await axios.post("http://localhost:5000/api/attendance/checkin", {
          userId: user._id,
          name: user.name,
          date: today,
          checkIn: time
        });

        sethistory([res.data, ...history]);
        setStatus("Present");
        setCheckInTime(time);
        setCheckInDate(now);

        setshowpopup(false);
        setpin("");

      } catch (err) {
        console.log(err);
      }

    } else if (!pin) {
      alert("Enter PIN");
    } else {
      alert("Invalid PIN");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios.get(`http://localhost:5000/api/attendance/${user._id}`)
      .then(res => sethistory(res.data))
      .catch(err => console.log(err));
  }, []);



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
        `http://localhost:5000/api/attendance/checkout/${latestRecord._id}`,
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
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.checkIn}</td>
                      <td>{item.checkOut}</td>
                      <td>{item.hours}</td>
                      <td className="pe-4 text-end">
                        <span className="badge bg-success-subtle text-success">{item.status}</span>
                      </td>
                    </tr>
                  ))}
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