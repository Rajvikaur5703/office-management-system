<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminEmployee() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", dept: "IT" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Track if we are editing

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open form for Editing
  const handleEditClick = (emp) => {
    setEditId(emp._id);
    setFormData({
      name: emp.name,
      email: emp.email,
      password: "", // Keep password blank unless changing
      dept: emp.department || emp.dept || "IT"
    });
    setShowForm(true);
  };

  // Submit Logic (Handles both Add and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // UPDATE EXISTING
        await axios.put(`http://localhost:5000/api/employees/${editId}`, {
          name: formData.name,
          email: formData.email,
          password: formData.password, // Optional in backend logic
          department: formData.dept
        });
      } else {
        // ADD NEW
        await axios.post("http://localhost:5000/api/employees", {
          name: formData.name,
          email: formData.email,
          password: formData.password || "123",
          department: formData.dept
        });
      }

      // Reset
      setFormData({ name: "", email: "", password: "", dept: "IT" });
      setShowForm(false);
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Remove this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Directory</h2>
        <button 
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) setEditId(null); // Reset edit state if closing
            setFormData({ name: "", email: "", password: "", dept: "IT" });
          }}
        >
          {showForm ? "Close" : "+ Add New Employee"}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm border-0 mb-4 border-start border-primary border-4">
          <div className="card-body bg-light">
            <h5 className="mb-3 fw-bold">{editId ? "Edit Employee" : "Add New Employee"}</h5>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-3">
                <input name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <input name="email" type="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <input name="password" type="password" className="form-control" placeholder={editId ? "Leave blank to keep same" : "Password"} value={formData.password} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <select name="dept" className="form-select" value={formData.dept} onChange={handleChange}>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="col-md-1">
                <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-success'} w-100`} disabled={loading}>
                  {loading ? "..." : editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td className="ps-4 text-muted small">{index + 1}</td>
                  <td className="fw-bold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td><span className="badge bg-info-subtle text-info px-3">{emp.department || emp.dept}</span></td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(emp)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEmployee(emp._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

=======
import React, { useEffect, useState } from "react";
import axios from 'axios';

function AdminEmployee() {
  const role = localStorage.getItem("role");

  // 🔒 Restrict access
  if (role !== "admin") {
    return <h2 className="text-center mt-5">Access Denied</h2>;
  }

  const [employees, setEmployees] = useState([]);
  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/employees");
      setEmployees(res.data);
    }
    catch (err) {
      console.error("Could not Fetch employees..", err);
    }
  }

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  // ✏️ Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // ➕ ADD + ✏️ EDIT (local only)
  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/auth/employee/${editingId}`, newEmployee);
        alert("Employee Updated ✅");
        // ✏️ Update
        // const updated = employees.map((emp) =>
        // emp._id === editingId ? { ...emp, ...newEmployee } : emp
        // );
        // setEmployees(updated);
        // alert("Employee Updated ✅");
      }
      else {
        // ➕ Logic for Add (POST request)
        await axios.post("http://localhost:5000/api/auth/register", newEmployee);
        alert("Employee Added ✅");
        // ➕ Add
        // const newEmp = {
        //   _id: Date.now().toString(),
        //   ...newEmployee
        // };
        // setEmployees([...employees, newEmp]);
        // alert("Employee Added ✅");
      }
      fetchEmployees();
      setNewEmployee({ name: "", email: "", password: "", department: "" });
      setEditingId(null);
      setShowForm(false);
    }
    catch (err) {
      alert(err.response?.data?.msg || "Action failed");
    }



    // setNewEmployee({ name: "", email: "", password: "", department: "" });
    // setEditingId(null);
    // setShowForm(false);
  };

  // ✏️ Edit
  const editEmployee = (emp) => {
    setNewEmployee({
      name: emp.name,
      email: emp.email,
      password: "",
      department: emp.department || ""
    });
    setEditingId(emp._id);
    setShowForm(true);
  };

  // ❌ Delete (local only)
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/employee/${id}`);
      alert("Deleted Successfully");
      fetchEmployees(); // Refresh list
    }
    catch (err) {
      alert("Delete failed");
    }

    // const filtered = employees.filter((emp) => emp._id !== id);
    // setEmployees(filtered);
    // alert("Deleted Successfully");
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Employee
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-4 p-3 bg-light">
          <h5 className="fw-bold mb-3">
            {editingId ? "Edit Employee" : "Add Employee"}
          </h5>

          <form onSubmit={saveEmployee} className="row g-3">
            <div className="col-md-3">
              <input
                name="name"
                className="form-control"
                placeholder="Name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={newEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {!editingId && (
              <div className="col-md-2">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="col-md-2">
              <input
                name="department"
                className="form-control"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-success w-100">
                {editingId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp._id.slice(-4)}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => editEmployee(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteEmployee(emp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

>>>>>>> Stashed changes
export default AdminEmployee;