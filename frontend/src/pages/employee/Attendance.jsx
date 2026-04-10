<<<<<<< Updated upstream
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
=======
import React, { useState } from "react";

function Attendance() 
{
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

const handlePin = () => {
  if(pin === "2026")
  {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    setCheckInTime(time);
    setCheckInDate(now);
    setStatus("Present");

    const newrecord = {
      date: today,
      checkin: time,   // only time stored
      checkout: "-",
      hours: "-",
      status: "Present"
    };

    sethistory([newrecord, ...history]);

    setshowpopup(false);
    setpin("");
  }
  else if(pin == null || pin === "")
  {
    alert("Please enter a pin");
  }
  else
  {
    alert("Invalid PIN");
  }
};


const handleCheckOut = () => {

  const now = new Date();

  const checkoutTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const diff = now - checkInDate;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const totalHours = `${hours}h ${minutes}m`;

  const updatedHistory = [...history];

  updatedHistory[0] = {
    ...updatedHistory[0],
    checkout: checkoutTime,   // only time
    hours: totalHours
  };

  sethistory(updatedHistory);
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
        <div className="modal d-block" style={{background:"rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5 className="mb-3">Enter PIN</h5>

              <input
                type="password"
                className="form-control mb-3"
                value={pin}
                onChange={(e)=>setpin(e.target.value)}
                placeholder="Enter your PIN"
              />

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-success" onClick={handlePin} >
                  OK
                </button>
                
                <button className="btn btn-secondary" onClick={()=>setshowpopup(false)} >
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
                  {/* <tr>
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
                  </tr> */}
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
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
>>>>>>> Stashed changes
