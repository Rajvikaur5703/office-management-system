import React from "react";
import {PieChart, Pie, Tooltip, Legend} from "recharts";

const data = [
    {name: "Completed", value:10, fill:"#22c55e"},
    {name: "Pending", value:7, fill:"#f59e0b"},
    {name: "In Progress", value:5, fill:"#3b82f6"},
];


function TaskChart() {
    return(
        <PieChart width={400} height={300}>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            />
            <Tooltip />
            <Legend />
        </PieChart>
    )
}