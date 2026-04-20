const mongoose = require("mongoose");
const User = require("./models/User");

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/office_db");
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin"
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();

  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

createAdmin();