const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    fromdate: { type: Date, required: true },
    todate: { type: Date, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);