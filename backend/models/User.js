const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    role:{
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
    department: {type: String},
    createdAt: {type: Date, default: Date.now}
});


userSchema.pre('save', async function() {
    // If the password isn't changed, just return (no next() needed)
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No need to call next() here because the function is async
    } catch (error) {
        throw error; // Mongoose will catch this and stop the save
    }
});

// Helper method to compare passwords (optional but very useful for controllers)
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
