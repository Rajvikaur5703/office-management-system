import React, { useState } from "react";

function AdminEmployee() {
  const [employees, setEmployees] = useState([
    { id: 101, name: "Rahul Sharma", email: "rahul@company.com", dept: "IT" },
    { id: 102, name: "Priya Singh", email: "priya@company.com", dept: "HR" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", dept: "IT" });
  const [showForm, setShowForm] = useState(false);

  // Handle input changes easily
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Employee
  const handleAdd = (e) => {
    e.preventDefault();
    const newEmp = { ...formData, id: Date.now() };
    setEmployees([...employees, newEmp]);
    setFormData({ name: "", email: "", dept: "IT" }); // Reset form
    setShowForm(false);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Remove this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Directory</h2>
        <button 
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`} 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add New Employee"}
        </button>
      </div>

      {/* Add Employee Form */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body bg-light">
            <form onSubmit={handleAdd} className="row g-3">
              <div className="col-md-4">
                <input name="name" className="form-control" placeholder="Full Name" onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <input name="email" type="email" className="form-control" placeholder="Email Address" onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <select name="dept" className="form-select" onChange={handleChange}>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="col-md-1">
                <button type="submit" className="btn btn-success w-100">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="ps-4 text-muted small">{emp.id}</td>
                  <td className="fw-bold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td><span className="badge bg-info-subtle text-info px-3">{emp.dept}</span></td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEmployee(emp.id)}>
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

export default AdminEmployee;