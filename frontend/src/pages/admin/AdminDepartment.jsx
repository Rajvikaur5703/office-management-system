import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDepartment = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

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

  //Add / Update Department
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
          { name: deptName, description: description },
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

    </div>
  );
};

export default AdminDepartment;
