import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Sadiya Syed",
    id: "EMP-017",
    department: "Human Resources",
    email: "sadiya@email.com",
    phone: "9876543210",
    address: "Palanpur, Gujarat"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="row g-0">
              
              {/* Left Sidebar: Profile Picture & Basic Info */}
              <div className="col-md-4 bg-primary text-white text-center p-5">
                <div className="mb-4">
                  <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '120px', height: '120px' }}>
                    <i className="bi bi-person-fill text-primary display-1"></i>
                  </div>
                </div>
                <h3 className="fw-bold mb-1">{profile.name}</h3>
                <p className="text-white-50 mb-4">{profile.department}</p>
                <div className="badge bg-white text-primary px-3 py-2 rounded-pill">
                  ID: {profile.id}
                </div>
              </div>

              {/* Right Side: Editable Details */}
              <div className="col-md-8 p-4 p-md-5 bg-white">
                <h4 className="fw-bold mb-4 text-secondary border-bottom pb-2">Personal Details</h4>
                
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Full Name</label>
                    <input type="text" name="name" className="form-control bg-light" value={profile.name} onChange={handleChange} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Employee ID</label>
                    <input type="text" name="id" className="form-control bg-light" value={profile.id} onChange={handleChange} readOnly />
                    <small className="text-muted" style={{fontSize: '10px'}}>Contact Admin to change ID</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Department</label>
                    <input type="text" name="department" className="form-control bg-light" value={profile.department} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Email Address</label>
                    <input type="email" name="email" className="form-control bg-light" value={profile.email} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Phone Number</label>
                    <input type="text" name="phone" className="form-control bg-light" value={profile.phone} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">City/Address</label>
                    <input type="text" name="address" className="form-control bg-light" value={profile.address} onChange={handleChange} />
                  </div>

                  <div className="col-12 mt-4 pt-3 border-top">
                    <button type="button" className="btn btn-primary px-4 shadow-sm" onClick={() => alert("Profile Updated!")}>
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;