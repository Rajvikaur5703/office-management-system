const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/office_db');

const addEmployee = async () => {
    const employee = new User({
        name: "Rahul Sharma",
        email: "rahul@test.com",
        password: "123", // Will be hashed by your model
        role: "employee",
        department: "IT"
    });
    await employee.save();
    console.log("✅ Employee created: rahul@test.com / 123");
    process.exit();
};

addEmployee();