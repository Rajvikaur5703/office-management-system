import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
    jobRole: "",
    phoneno: "",
    address: "",
    id: ""
  });
  const [loading, setLoading] = useState(true);

  // Use the environment variable from your Render settings
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/emp/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          // 2. Ensure jobRole is captured from response
          setProfile({ ...res.data, id: res.data._id });
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      // Create the cleaned object
      const dataToSend = { ...profile };

      // 1. Logic fix: Convert department object to ID string
      if (dataToSend.department && typeof dataToSend.department === 'object') {
        dataToSend.department = dataToSend.department._id;
      }

      // 2. CRITICAL: Pass 'dataToSend' here, NOT 'profile'
      const res = await axios.put(`${API_BASE_URL}/api/emp/${profile.id}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        alert("Profile Updated Successfully! ✅");
        // Merge the new data while keeping the populated department name
        setProfile(prev => ({
          ...prev,
          ...res.data,
          id: res.data._id
        }));
      }
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      alert(`Update failed: ${err.response?.data?.message || "Server Error"}`);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Profile...</div>;
  if (!localStorage.getItem("token")) {
    return <div className="text-center mt-5">Please login to view profile.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="row g-0">

              {/* Left Sidebar */}
              <div className="col-md-4 bg-primary text-white text-center p-5">
                <div className="mb-4">
                  <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '120px', height: '120px' }}>
                    <i className="bi bi-person-fill text-primary display-1"></i>
                  </div>
                </div>
                <h3 className="fw-bold mb-1">{profile.name || "User"}</h3>
                {/* 3. DISPLAY JOB ROLE UNDER NAME */}
                <p className="text-white mb-1 fw-bold">{profile.jobRole || "No Role Assigned"}</p>
                <p className="text-white-50 mb-4">{typeof profile.department === 'object' ? profile.department.name : profile.department}</p>
                <div className="badge bg-white text-primary px-3 py-2 rounded-pill">
                  ID: {profile.id || "N/A"}
                </div>
              </div>

              {/* Right Side */}
              <div className="col-md-8 p-4 p-md-5 bg-white">
                <h4 className="fw-bold mb-4 text-secondary border-bottom pb-2">Personal Details</h4>
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Full Name</label>
                    <input type="text" name="name" className="form-control bg-light" value={profile.name || ""} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Employee ID</label>
                    <input type="text" name="id" className="form-control bg-light" value={profile.id || ""} onChange={handleChange} readOnly />
                    <small className="text-muted" style={{ fontSize: '10px' }}>Contact Admin to change ID</small>
                  </div>

                  {/* 4. ADDED JOB ROLE INPUT FIELD */}
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Job Role</label>
                    <input type="text" name="jobRole" className="form-control bg-light" placeholder="e.g. Senior Developer" value={profile.jobRole} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Department</label>
                    <input type="text" name="department" className="form-control bg-light" value={typeof profile.department === 'object' ? profile.department.name : profile.department} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Email Address</label>
                    <input type="email" name="email" className="form-control bg-light" value={profile.email || ""} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Phone Number</label>
                    <input type="text" name="phoneno" className="form-control bg-light" value={profile.phoneno || ""} onChange={handleChange} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">City/Address</label>
                    <input type="text" name="address" className="form-control bg-light" value={profile.address || ""} onChange={handleChange} />
                  </div>

                  <div className="col-12 mt-4 pt-3 border-top">
                    <button type="button" className="btn btn-primary px-4 shadow-sm" onClick={handleUpdate}>
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








// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Profile() {
//   // Initialize as an empty object with all expected fields
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     department: "",
//     phoneno: "",
//     address: "",
//     id: ""
//   });
//   const [loading, setLoading] = useState(true);

//   // FETCH PROFILE DATA
//   useEffect(() => {
//     const fetchProfile = async () => {
//       // 1. Get token
//       const token = localStorage.getItem("token");
//       // console.log("Profile API response:", res.data);

//       // 2. If no token, don't even try the API
//       if (!token) {
//         console.warn("No token found, redirecting to login logic...");
//         setLoading(false);
//         return;
//       }

//       try {
//         // 3. Make the call to the CORRECT URL
//         const res = await axios.get("http://localhost:5000/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}` // ENSURE THE SPACE AFTER Bearer
//           },
//         });

//         if (res.data) {
//           console.log("Profile successfully loaded for:", res.data.name);
//           setProfile({ ...res.data, id: res.data._id });
//         }
//       } catch (err) {
//         console.error("Profile Fetch Error:", err.response?.data || err.message);

//         // 4. If the server says 401 (Unauthorized), the token is bad
//         if (err.response?.status === 401) {
//           localStorage.clear();
//           window.location.href = "/";
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);


//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // UPDATE PROFILE DATA
//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       // Ensure the URL is exactly this:
//       const res = await axios.put("http://localhost:5000/api/auth/profile", profile, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Profile Updated Successfully! ✅");
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Update Error:", err.response?.data || err.message);
//       alert(`Update failed: ${err.response?.data?.msg || "Server Error"}`);
//     }
//   };

//   if (loading) return <div className="text-center mt-5">Loading Profile...</div>;
//   if (!localStorage.getItem("token")) {
//     return <div className="text-center mt-5">Please login to view profile.</div>;
//   }
//   // if (!profile) return <div className="text-center mt-5">Please login to view profile.</div>;

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card shadow-sm border-0 overflow-hidden">
//             <div className="row g-0">

//               {/* Left Sidebar: Profile Picture & Basic Info */}
//               <div className="col-md-4 bg-primary text-white text-center p-5">
//                 <div className="mb-4">
//                   <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '120px', height: '120px' }}>
//                     <i className="bi bi-person-fill text-primary display-1"></i>
//                   </div>
//                 </div>
//                 <h3 className="fw-bold mb-1">{profile.name || "Loading..."}</h3>
//                 <p className="text-white-50 mb-4">{profile.department}</p>
//                 <div className="badge bg-white text-primary px-3 py-2 rounded-pill">
//                   ID: {profile.id || profile._id || "N/A"}
//                 </div>
//               </div>

//               {/* Right Side: Editable Details */}
//               <div className="col-md-8 p-4 p-md-5 bg-white">
//                 <h4 className="fw-bold mb-4 text-secondary border-bottom pb-2">Personal Details</h4>

//                 <form className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">Full Name</label>
//                     <input type="text" name="name" className="form-control bg-light" value={profile.name} onChange={handleChange} />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">Employee ID</label>
//                     <input type="text" name="id" className="form-control bg-light" value={profile.id || ""} onChange={handleChange} readOnly />
//                     <small className="text-muted" style={{ fontSize: '10px' }}>Contact Admin to change ID</small>
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">Department</label>
//                     <input type="text" name="department" className="form-control bg-light" value={profile.department} onChange={handleChange} />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">Email Address</label>
//                     <input type="email" name="email" className="form-control bg-light" value={profile.email} onChange={handleChange} />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">Phone Number</label>
//                     <input type="text" name="phoneno" className="form-control bg-light" value={profile.phoneno} onChange={handleChange} />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label small fw-bold text-muted">City/Address</label>
//                     <input type="text" name="address" className="form-control bg-light" value={profile.address} onChange={handleChange} />
//                   </div>

//                   <div className="col-12 mt-4 pt-3 border-top">
//                     <button type="button" className="btn btn-primary px-4 shadow-sm" onClick={handleUpdate}>
//                       Update Profile
//                     </button>
//                   </div>
//                 </form>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;