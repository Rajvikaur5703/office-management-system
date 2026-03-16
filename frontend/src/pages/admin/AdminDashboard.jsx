import React from "react";
import "../../assets/styles/admin/admindashboard.css";


function AdminDashboard() {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <div className="cards">
                <div className="card card1">
                    <h3>Total Employees</h3>
                    <p>25</p>
                </div>

                <div className="card card2">
                    <h3>Total Tasks</h3>
                    <p>18</p>
                </div>

                <div className="card card3">
                    <h3>Present Today</h3>
                    <p>18</p>
                </div>

                <div className="card card4">
                    <h3>Pending Tasks</h3>
                    <p>7</p>
                </div>
            </div>
           

            <div className="activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>Employee Rahul added</li>
                    <li>Task assigned to HR team</li>
                    <li>Attendance updated</li>
                    <li>New document uploaded</li>
                </ul>
            </div>
        </div>
    )
}

export default AdminDashboard