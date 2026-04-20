import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState(""); // 🔍 Search feature
  const [message, setMessage] = useState({ text: "", type: "" }); // Improved alerts
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments', config);
      setDepartments(response.data);
    } catch (error) {
      showMsg("Failed to load departments", "danger");
    }
  };

  const fetchEmployees = async () => {
    try {
      // Token added here as well
      const response = await axios.get('http://localhost:5000/api/employees', config);
      setEmployees(response.data);
    } catch (error) {
      console.error("Employee fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const showMsg = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const getEmployeeCount = (departmentId) => {
    return employees.filter(emp =>
      (emp.department?._id === departmentId) || (emp.department === departmentId)
    ).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deptName.trim()) return showMsg("Please enter a department name", "warning");

    setLoading(true);
    try {
      const payload = { name: deptName, description };
      if (editId) {
        await axios.put(`http://localhost:5000/api/departments/${editId}`, payload, config);
        showMsg("Department updated successfully! ✨", "success");
      } else {
        await axios.post('http://localhost:5000/api/departments', payload, config);
        showMsg("Department added successfully! ✅", "success");
      }
      resetForm();
      fetchDepartments();
    } catch (error) {
      showMsg(error.response?.data?.message || "Operation failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDeptName("");
    setDescription("");
    setEditId(null);
  };

  const handleEdit = (dept) => {
    setDeptName(dept.name);
    setDescription(dept.description || "");
    setEditId(dept._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    const count = getEmployeeCount(id);
    if (count > 0) {
      return showMsg(`Cannot delete "${name}". It has ${count} employee(s).`, "danger");
    }

    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${id}`, config);
        showMsg("Department deleted!", "info");
        fetchDepartments();
      } catch (error) {
        showMsg("Delete failed", "danger");
      }
    }
  };

  // Filter departments based on search
  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Department Management</h2>
          <span className="badge bg-primary">Total: {departments.length}</span>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type} border-0 shadow-sm animate__animated animate__fadeIn`}>
          {message.text}
        </div>
      )}

      {/* FORM CARD */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white fw-bold">
          {editId ? "✏️ Edit Department" : "➕ Add New Department"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-5">
                <label className="form-label small fw-bold">Department Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label small fw-bold">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end gap-2">
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "..." : (editId ? "Update" : "Save")}
                </button>
                {editId && (
                  <button type="button" className="btn btn-light" onClick={resetForm}>✖</button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SEARCH & TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="p-3 bg-light border-bottom">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search departments..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Employees</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept, index) => (
                    <tr key={dept._id}>
                      <td className="ps-3 text-muted">{index + 1}</td>
                      <td className="fw-bold">{dept.name}</td>
                      <td className="text-muted small">{dept.description || "No description"}</td>
                      <td>
                        <span className={`badge ${getEmployeeCount(dept._id) > 0 ? 'bg-info' : 'bg-secondary'}`}>
                          {getEmployeeCount(dept._id)} Members
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(dept)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(dept._id, dept.name)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No departments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;