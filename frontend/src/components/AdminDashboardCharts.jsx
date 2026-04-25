import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

// Yahan humne default values {} set kar di hain props mein
const AdminDashboardCharts = ({ employeesPerDept = {}, taskStatus = {} }) => {

    // Safeguard: Agar data undefined hai toh empty array use ho
    const barLabels = Object.keys(employeesPerDept || {});
    const barValues = Object.values(employeesPerDept || {});

    const pieLabels = Object.keys(taskStatus || {});
    const pieValues = Object.values(taskStatus || {});

    // 🔵 BAR CHART (Employees)
    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: "Employees",
                data: barValues,
                backgroundColor: ["#4facfe", "#43e97b", "#fa709a", "#f6d365", "#667eea"],
                borderRadius: 8
            }
        ]
    };

    // 🟣 PIE CHART (Tasks)
    const pieData = {
        labels: pieLabels,
        datasets: [
            {
                data: pieValues,
                backgroundColor: ["#ff7675", "#55efc4", "#74b9ff"],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="row g-4">
            {/* Logic: Agar employeesPerDept mein data hai tabhi Bar dikhao, 
         agar taskStatus mein hai toh Pie dikhao.
      */}
            {barLabels.length > 0 && (
                <div className="col-12">
                    <div className="p-2">
                        <Bar data={barData} />
                    </div>
                </div>
            )}

            {pieLabels.length > 0 && (
                <div className="col-12">
                    <div className="p-2 d-flex justify-content-center" style={{ maxHeight: "300px" }}>
                        <Pie data={pieData} />
                    </div>
                </div>
            )}

            {/* Agar dono data gayab hain toh message dikhao */}
            {barLabels.length === 0 && pieLabels.length === 0 && (
                <p className="text-center text-muted">No chart data available</p>
            )}
        </div>
    );
};

export default AdminDashboardCharts;