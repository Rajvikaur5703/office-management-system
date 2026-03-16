import React, { useState } from "react";
import "../../assets/styles/admin/admindocument.css";

function AdminDocuments() 
{
  const [filter, setfilter] = useState("all");
  const documents = [
    {name: "Employee Handbook.pdf", type: "pdf"},
    {name: "Admin Handbook.pdf", type: "pdf"},
    {name: "Company Policy.docx", type: "docx"},
    {name: "Project Plan.excel", type: "excel"}
  ];
  const filtered= filter === "all" 
  ? documents : documents.filter(doc=>doc.type===filter);

  return (
    <div className="main-content">
      <h2 className="page-title">Documents</h2>

      <p>Company documents and files.</p>

      <div>
        <div className="quick-access">
        <h2>Quick Access</h2>

        <div className="folder-grid">

          <div className="folder-item" onClick={() => setfilter("pdf")}>
            <i className="fas fa-folder" style={{ color: '#3498db' }}></i>
            <span>PDF</span>
          </div>
          <div className="folder-item" onClick={() => setfilter("excel")}>
            <i className="fas fa-folder" style={{ color: '#3498db' }}></i>
            <span>Excel</span>
          </div>
          <div className="folder-item" onClick={() => setfilter("docx")}>
            <i className="fas fa-folder" style={{ color: '#3498db' }}></i>
            <span>DOCX</span>
          </div>

        </div>
      </div>
      </div>

      <div className="documents-box">
        <ul>
          {filtered.map((doc, index) => (<li key={index}>{doc.name}</li>))}
          
        </ul>
      </div>
    </div>
  );
}

export default AdminDocuments;