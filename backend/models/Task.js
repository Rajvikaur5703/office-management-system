const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assigned: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, default: 'pending' }, // pending, in-progress, completed
    priority: { type: String, default: 'Medium' }
});

module.exports = mongoose.model('Task', taskSchema);