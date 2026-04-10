const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Document", DocumentSchema);