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
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", password: "", department: "IT" });

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
      }
      else {
        // ➕ Logic for Add (POST request)
        await axios.post("http://localhost:5000/api/auth/register", newEmployee);
        alert("Employee Added ✅");
      }
      fetchEmployees();
      setNewEmployee({ name: "", email: "", password: "", department: "" });
      setEditingId(null);
      setShowForm(false);
    }
    catch (err) {
      alert(err.response?.data?.msg || "Action failed");
    }
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
              <select name="department" className="form-select" value={newEmployee.department} onChange={handleInputChange}>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
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

export default AdminEmployee;