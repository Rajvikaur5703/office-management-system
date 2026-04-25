import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminEmployee() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // States for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/emp`, config);
      setEmployees(res.data);
    } catch (err) {
      console.error("Employee fetch error:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/departments`, config);
      setDepartments(res.data);
      if (res.data.length > 0) setDept(res.data[0]._id);
    } catch (err) {
      console.error("Department fetch error:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setSalary("");
    setEditId(null);
    setShowForm(false);
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name,
        email,
        password,
        department: dept,
        jobRole: role,
        salary: Number(salary),
      };

      if (editId) {
        await axios.put(`${API_BASE_URL}/api/emp/${editId}`, data, config);
        setMsg("Employee updated successfully! ✅");
      } else {
        await axios.post(`${API_BASE_URL}/api/emp`, data, config);
        setMsg("Employee created successfully! ✅");
      }

      setTimeout(() => setMsg(""), 3000);
      resetForm();
      fetchEmployees();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error occurred ❌");
    }
    setLoading(false);
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.jobRole);
    setSalary(emp.salary);
    setDept(emp.department?._id || "");
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/emp/${id}`, config);
        setMsg("Employee deleted successfully");
        fetchEmployees();
      } catch (err) {
        setMsg("Error deleting employee");
      }
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeId?.toLowerCase().includes(search.toLowerCase())
  );

  // Helper to get department-specific colors
  const getDeptColor = (deptName) => {
    if (!deptName) return "bg-secondary";

    const name = deptName.toLowerCase();
    if (name.includes("it") || name.includes("tech")) return "bg-primary text-white";
    if (name.includes("hr") || name.includes("human")) return "bg-success text-white";
    if (name.includes("marketing")) return "bg-warning text-dark";
    if (name.includes("sales")) return "bg-info text-dark";
    if (name.includes("finance") || name.includes("tax")) return "bg-info text-white";
    return "bg-dark text-white"; // Default for others
  };

  return (
    <div className="container mt-4 pb-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employee Management</h2>
          <p className="text-muted">Total Employees: {employees.length}</p>
        </div>
        <button
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"} shadow-sm`}
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? "Cancel" : "+ Add Employee"}
        </button>
      </div>

      {/* ALERT MESSAGE */}
      {msg && <div className="alert alert-primary border-0 shadow-sm">{msg}</div>}

      {/* SEARCH BAR */}
      <div className="mb-4">
        <div className="input-group shadow-sm">
          <input
            className="form-control border-start-0 ps-3"
            placeholder="🔍 Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <div className="card mb-4 shadow border-0 animate__animated animate__fadeIn">
          <div className="card-header bg-dark text-white py-3">
            <h5 className="mb-0">{editId ? "Edit Employee Details" : "Register New Employee"}</h5>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Full Name</label>
                  <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Email Address</label>
                  <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@company.com" />
                </div>
                {!editId && (
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Password</label>
                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters" />
                  </div>
                )}
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Department</label>
                  <select className="form-select" value={dept} onChange={(e) => setDept(e.target.value)} required>
                    <option value="">-- Choose Dept --</option>
                    {departments.map((d) => (
                      <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Designation / Role</label>
                  <input className="form-control" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Developer" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Salary (Monthly)</label>
                  <input className="form-control" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. 50000" />
                </div>
                <div className="col-12 mt-4">
                  <button className="btn btn-success px-5 py-2 fw-bold w-100 shadow-sm" disabled={loading}>
                    {loading ? "Processing..." : editId ? "Update Employee Info" : "Save Employee"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMPLOYEES TABLE */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-3">#</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
                <th>Role</th>
                <th>Salary</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((emp, i) => (
                  <tr key={emp._id}>
                    <td className="ps-3 text-muted">{i + 1}</td>
                    <td><span className="badge bg-light text-black">{emp._id.slice(-5)}</span></td>
                    <td className="fw-bold">{emp.name}</td>
                    <td>{emp.email}</td>
                    <td><span className={`badge ${getDeptColor(emp.department?.name)} px-2 py-1 shadow-sm`}>{emp.department?.name || "N/A"}</span></td>
                    <td>{emp.jobRole || "-"}</td>
                    <td className="fw-semibold">₹{emp.salary?.toLocaleString()}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(emp)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">No employees found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminEmployee;