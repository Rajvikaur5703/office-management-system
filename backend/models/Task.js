const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
<<<<<<< HEAD
    assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
=======
    assigned: { type: String, required: true },
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: 'pending' },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: 'Medium' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);