import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDepartment = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
<<<<<<< HEAD

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const departmentEmployees = employees.filter(emp =>
    (emp.department?._id === selectedDept?._id) || (emp.department === selectedDept?._id)
  );

  //Fetch Departments
=======
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch Departments
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/departments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(res.data);
    } catch (error) {

      console.error(error);
      setMessage("Failed to load departments");
    }
  };

  const fetchEmployees = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${API_BASE_URL}/api/emp`, config);
      setEmployees(response.data);
    } catch (error) {
      console.error("Employee fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  // Auto-hide message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getEmployeeCount = (departmentId) => {
    return employees.filter(emp =>
      (emp.department?._id === departmentId) || (emp.department === departmentId)
    ).length;
  };

<<<<<<< HEAD
  //Add / Update Department
=======
  // ✅ Add / Update Department
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deptName.trim()) {
      setMessage("Please enter a department name");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await axios.put(
          `${API_BASE_URL}/api/departments/${editId}`,
<<<<<<< HEAD
          { name: deptName, description: description },
=======
          { name: deptName, description },
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Department updated!");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/departments`,
          { name: deptName, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Department added!");
      }

      resetForm();
      fetchDepartments();
    } catch (error) {
      console.error(error);
      setMessage("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setDeptName("");
    setDescription("");
    setEditId(null);
  };

  // Edit
  const handleEdit = (dept) => {
    setDeptName(dept.name);
    setDescription(dept.description || "");
    setEditId(dept._id);
    window.scrollTo(0, 0);
  };

  // Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/api/departments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage("Department deleted!");
        fetchDepartments();
      } catch (error) {
        console.error(error);
        setMessage("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-4">
<<<<<<< HEAD
=======

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2>Department Management</h2>
          <p className="text-muted">Total departments: {departments.length}</p>
        </div>
      </div>

      {/* Alert */}
      {message && (
        <div className="alert alert-info alert-dismissible">
          {message}
          <button className="btn-close float-end" onClick={() => setMessage("")}></button>
<<<<<<< HEAD
        </div>
      )}

      {/* Form */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body bg-light rounded">
          <form onSubmit={handleSubmit} className="row g-3 align-items-end">

            {/* Department Name Input */}
            <div className="col-md-4">
              <label className="form-label fw-bold small text-uppercase">Department Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. IT, HR, Marketing"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                required
              />
            </div>

            {/* Description Input */}
            <div className="col-md-5">
              <label className="form-label fw-bold small text-uppercase">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brief department details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="col-md-3 d-flex gap-2">
              <button className={`btn ${editId ? 'btn-warning' : 'btn-primary'} flex-grow-1`} disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <>{editId ? "Update" : "Add Department"}</>
                )}
              </button>
              {editId && (
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Description</th>
                <th>No. of Employees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <tr key={dept._id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{dept.name}</td>
                    <td>{dept.description || "-"}</td>
                    <td>
                      <span className={`badge ${getEmployeeCount(dept._id) > 0 ? 'bg-info' : 'bg-secondary'}`}>
                        {getEmployeeCount(dept._id)} Members
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(dept)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => {
                          setSelectedDept(dept);
                          window.scrollTo(0, document.body.scrollHeight);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(dept._id, dept.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
      {/* Employee List Section (Appears when View is clicked) */}
      {selectedDept && (
        <div className="card mt-5 shadow border-black animate__animated animate__fadeInUp">
          <div className="card-header bg-black text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Employees in {selectedDept.name}</h5>
            {/* <button className="btn-close btn-close-white" onClick={() => setSelectedDept(null)}></button> */}
          </div>
          <div className="card-body">
            {departmentEmployees.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentEmployees.map(emp => (
                      <tr key={emp._id}>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.jobRole || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center my-3 text-muted">No employees assigned to this department yet.</p>
            )}
            <div className="text-end">
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDept(null)}>Close List</button>
            </div>
          </div>
        </div>
      )}

=======
        </div>
      )}

      {/* Form */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body bg-light rounded">
          <form onSubmit={handleSubmit} className="row g-3 align-items-end">

            {/* Department Name Input */}
            <div className="col-md-4">
              <label className="form-label fw-bold small text-uppercase">Department Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. IT, HR, Marketing"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                required
              />
            </div>

            {/* Description Input */}
            <div className="col-md-5">
              <label className="form-label fw-bold small text-uppercase">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brief department details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="col-md-3 d-flex gap-2">
              <button className={`btn ${editId ? 'btn-warning' : 'btn-primary'} flex-grow-1`} disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <>{editId ? "Update" : "Add Department"}</>
                )}
              </button>
              {editId && (
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Description</th>
                <th>No. of Employees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <tr key={dept._id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{dept.name}</td>
                    <td>{dept.description || "-"}</td>
                    <td>
                      <span className={`badge ${getEmployeeCount(dept._id) > 0 ? 'bg-info' : 'bg-secondary'}`}>
                        {getEmployeeCount(dept._id)} Members
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(dept)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(dept._id, dept.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
    </div>
  );
};

export default AdminDepartment;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDepartment = () => {
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [deptName, setDeptName] = useState("");
//   const [description, setDescription] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState(""); // 🔍 Search feature
//   const [message, setMessage] = useState({ text: "", type: "" }); // Improved alerts
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/departments', config);
//       setDepartments(response.data);
//     } catch (error) {
//       showMsg("Failed to load departments", "danger");
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       // Token added here as well
//       const response = await axios.get('http://localhost:5000/api/employees', config);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Employee fetch failed:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployees();
//   }, []);

//   const showMsg = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 4000);
//   };

//   const getEmployeeCount = (departmentId) => {
//     return employees.filter(emp =>
//       (emp.department?._id === departmentId) || (emp.department === departmentId)
//     ).length;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!deptName.trim()) return showMsg("Please enter a department name", "warning");

//     setLoading(true);
//     try {
//       const payload = { name: deptName, description };
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/departments/${editId}`, payload, config);
//         showMsg("Department updated successfully! ✨", "success");
//       } else {
//         await axios.post('http://localhost:5000/api/departments', payload, config);
//         showMsg("Department added successfully! ✅", "success");
//       }
//       resetForm();
//       fetchDepartments();
//     } catch (error) {
//       showMsg(error.response?.data?.message || "Operation failed", "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setDeptName("");
//     setDescription("");
//     setEditId(null);
//   };

//   const handleEdit = (dept) => {
//     setDeptName(dept.name);
//     setDescription(dept.description || "");
//     setEditId(dept._id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = async (id, name) => {
//     const count = getEmployeeCount(id);
//     if (count > 0) {
//       return showMsg(`Cannot delete "${name}". It has ${count} employee(s).`, "danger");
//     }

//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       try {
//         await axios.delete(`http://localhost:5000/api/departments/${id}`, config);
//         showMsg("Department deleted!", "info");
//         fetchDepartments();
//       } catch (error) {
//         showMsg("Delete failed", "danger");
//       }
//     }
//   };

//   // Filter departments based on search
//   const filteredDepartments = departments.filter(d =>
//     d.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-4 pb-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">Department Management</h2>
//           <span className="badge bg-primary">Total: {departments.length}</span>
//         </div>
//       </div>

//       {message.text && (
//         <div className={`alert alert-${message.type} border-0 shadow-sm animate__animated animate__fadeIn`}>
//           {message.text}
//         </div>
//       )}

//       {/* FORM CARD */}
//       <div className="card shadow-sm border-0 mb-4">
//         <div className="card-header bg-white fw-bold">
//           {editId ? "✏️ Edit Department" : "➕ Add New Department"}
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-5">
//                 <label className="form-label small fw-bold">Department Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder='e.g. IT, HR, Marketing'
//                   value={deptName}
//                   onChange={(e) => setDeptName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="col-md-5">
//                 <label className="form-label small fw-bold">Description</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder='Brief department details'
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-2 d-flex align-items-end gap-2">
//                 <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                   {loading ? "..." : (editId ? "Update" : "Save")}
//                 </button>
//                 {editId && (
//                   <button type="button" className="btn btn-light" onClick={resetForm}>✖</button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* SEARCH & TABLE */}
//       <div className="card shadow-sm border-0">
//         <div className="card-body p-0">
//           <div className="p-3 bg-light border-bottom">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="🔍 Search departments..."
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <div className="table-responsive">
//             <table className="table table-hover align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th className="ps-3">#</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Employees</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredDepartments.length > 0 ? (
//                   filteredDepartments.map((dept, index) => (
//                     <tr key={dept._id}>
//                       <td className="ps-3 text-muted">{index + 1}</td>
//                       <td className="fw-bold">{dept.name}</td>
//                       <td className="text-muted small">{dept.description || "No description"}</td>
//                       <td>
//                         <span className={`badge ${getEmployeeCount(dept._id) > 0 ? 'bg-info' : 'bg-secondary'}`}>
//                           {getEmployeeCount(dept._id)} Members
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(dept)}>Edit</button>
//                         <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(dept._id, dept.name)}>Delete</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-5 text-muted">No departments found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDepartment;