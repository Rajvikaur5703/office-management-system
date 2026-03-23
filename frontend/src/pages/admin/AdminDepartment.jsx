import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Fetch Departments from Backend
  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/departments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // 2. Add New Department
  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!deptName) return;

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/departments', 
        { name: deptName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      setDeptName("");
      fetchDepartments(); // Refresh list
    } catch (err) {
      alert("Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Department
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchDepartments();
      } catch (err) {
        alert("Failed to delete department");
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Manage Departments</h2>
      </div>

      <div className="row g-4">
        {/* Left Side: Add Form */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-3">Add New Department</h5>
              <form onSubmit={handleAddDept}>
                <div className="mb-3">
                  <label className="form-label small text-muted">Department Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="e.g. IT, HR, Marketing" 
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 shadow-sm" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : "Add Department"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: List Table */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 py-3">S.No</th>
                      <th className="py-3">Department Name</th>
                      <th className="text-end pe-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.length > 0 ? (
                      departments.map((dept, index) => (
                        <tr key={dept._id}>
                          <td className="ps-4 text-muted">{index + 1}</td>
                          <td className="fw-semibold">{dept.name}</td>
                          <td className="text-end pe-4">
                            <button 
                              onClick={() => handleDelete(dept._id)} 
                              className="btn btn-sm btn-outline-danger px-3"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-5 text-muted">
                          No departments found. Add one to get started!
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
    </div>
  );
};

export default AdminDepartment;