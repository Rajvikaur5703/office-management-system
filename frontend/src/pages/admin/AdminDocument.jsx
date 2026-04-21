import React, { useState } from "react";

function AdminDocuments() {
  // Use the environment variable from your Render settings
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [filter, setFilter] = useState("all");

  const documents = [
    { name: "Employee Handbook.pdf", type: "pdf", date: "2026-01-10" },
    { name: "Admin Handbook.pdf", type: "pdf", date: "2026-02-15" },
    { name: "Company Policy.docx", type: "docx", date: "2026-03-01" },
    { name: "Project Plan.excel", type: "excel", date: "2026-03-12" }
  ];

  const filtered = filter === "all"
    ? documents
    : documents.filter(doc => doc.type === filter);

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Document Library</h2>
        <p className="text-muted">Access and filter company-wide files.</p>
      </div>

      {/* Quick Access Folders */}
      <h5 className="mb-3 fw-bold text-secondary text-uppercase small">Quick Access</h5>
      <div className="row g-3 mb-5">
        {["pdf", "excel", "docx"].map((type) => (
          <div className="col-6 col-md-3" key={type}>
            <div
              className={`card border-0 shadow-sm text-center py-3 h-100 cursor-pointer ${filter === type ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => setFilter(type)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <i className={`bi bi-folder-fill display-5 mb-2 ${filter === type ? 'text-white' : 'text-primary'}`}></i>
                <h6 className="mb-0 text-uppercase">{type}</h6>
              </div>
            </div>
          </div>
        ))}

        {/* Reset Filter Button */}
        <div className="col-6 col-md-3">
          <div
            className="card border-0 shadow-sm text-center py-3 h-100 bg-light"
            onClick={() => setFilter("all")}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body">
              <i className="bi bi-arrow-clockwise display-5 mb-2 text-secondary"></i>
              <h6 className="mb-0">Show All</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="card shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            Files {filter !== "all" && <span className="badge bg-info ms-2 text-dark">{filter}</span>}
          </h5>
          <button className="btn btn-primary shadow-sm px-4">
            <i className="bi bi-upload me-2"></i>
            Upload
          </button>
        </div>
        <div className="list-group list-group-flush">
          {filtered.length > 0 ? (
            filtered.map((doc, index) => (
              <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <i className={`bi bi-file-earmark-${doc.type === 'excel' ? 'spreadsheet' : doc.type} fs-4 me-3 text-secondary`}></i>
                  <div>
                    <div className="fw-bold">{doc.name}</div>
                    <small className="text-muted">Uploaded on: {doc.date}</small>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-download"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-5 text-muted">No {filter} files found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDocuments;