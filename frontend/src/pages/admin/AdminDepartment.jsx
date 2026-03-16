import React, { useState } from "react";
import "../../assets/styles/admin/admindepartment.css";

function AdminDepartment() {

  const [departments, setDepartments] = useState([
    { id: 1, name: "HR" },
    { id: 2, name: "IT" },
    { id: 3, name: "Finance" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const saveDepartment = () => {

    if (!departmentName.trim()) {
      alert("Please enter department name");
      return;
    }

    if (editingId) {

      const updatedDepartments = departments.map((dep) =>
        dep.id === editingId ? { ...dep, name: departmentName } : dep
      );

      setDepartments(updatedDepartments);
      setEditingId(null);

    } else {

      const newDepartment = {
  id: departments.length > 0 ? departments[departments.length - 1].id + 1 : 1,
  name: departmentName
};

      setDepartments([...departments, newDepartment]);
    }

    setDepartmentName("");
    setShowForm(false);
  };

  const editDepartment = (id) => {

    const dep = departments.find((d) => d.id === id);

    setDepartmentName(dep.name);
    setEditingId(id);
    setShowForm(true);
  };

  const deleteDepartment = (id) => {

    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }

  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setDepartmentName("");
  };

  return (

    <div className="main-content">

      <div className="header">
        <h2>Department List</h2>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Department
        </button>

      </div>


      {showForm && (

        <div className="form-container">

          <h3>{editingId ? "Edit Department" : "Add New Department"}</h3>

          <div className="form-group">
            <label>Department Name</label>

            <input
              type="text"
              value={departmentName}
              onChange={handleInputChange}
              placeholder="Enter department name"
            />

          </div>

          <div className="form-buttons">

            <button
              className="save-button"
              onClick={saveDepartment}
            >
              {editingId ? "Update" : "Save"}
            </button>

            <button
              className="cancel-button"
              onClick={cancelForm}
            >
              Cancel
            </button>

          </div>

        </div>

      )}


      {departments.length > 0 ? (

        <div className="table-wrapper">

          <table className="department-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {departments.map((dep) => (

                <tr key={dep.id}>

                  <td>{dep.id}</td>
                  <td>{dep.name}</td>

                  <td className="action-buttons">

                    <button
                      className="edit-button"
                      onClick={() => editDepartment(dep.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteDepartment(dep.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        <p className="no-data">No departments found.</p>

      )}

    </div>

  );

}

export default AdminDepartment;