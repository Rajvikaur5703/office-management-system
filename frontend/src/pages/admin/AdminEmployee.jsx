import React, { useState } from "react";

function AdminEmployee() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", department: "HR" },
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", department: "IT" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", department: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault(); // Prevents page refresh
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department) {
      return alert("Please fill all fields");
    }

    if (editingId) {
      setEmployees(employees.map(emp => emp.id === editingId ? { ...emp, ...newEmployee } : emp));
      setEditingId(null);
    } else {
      setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
    }

    setNewEmployee({ name: "", email: "", department: "" });
    setShowForm(false);
  };

  const editEmployee = (emp) => {
    setNewEmployee({ name: emp.name, email: emp.email, department: emp.department });
    setEditingId(emp.id);
    setShowForm(true);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Management</h2>
        <button className="btn btn-primary shadow-sm" onClick={() => setShowForm(true)}>
          <i className="bi bi-person-plus me-2"></i> + Add Employee
        </button>
      </div>

      {/* Add/Edit Form Card */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4 bg-light">
          <div className="card-body">
            <h5 className="fw-bold mb-3">{editingId ? "Edit Employee" : "New Employee"}</h5>
            <form onSubmit={saveEmployee} className="row g-3">
              <div className="col-md-4">
                <input name="name" className="form-control" placeholder="Name" value={newEmployee.name} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <input name="email" type="email" className="form-control" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} />
              </div>
              <div className="col-md-2">
                <select name="department" className="form-select" value={newEmployee.department} onChange={handleInputChange}>
                  <option value="">Department</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button type="submit" className="btn btn-success flex-grow-1">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="ps-4 text-muted small">#{emp.id.toString().slice(-4)}</td>
                    <td className="fw-bold">{emp.name}</td>
                    <td>{emp.email}</td>
                    <td><span className="badge bg-primary-subtle text-primary px-3">{emp.department}</span></td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editEmployee(emp)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-5">No employees found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminEmployee;