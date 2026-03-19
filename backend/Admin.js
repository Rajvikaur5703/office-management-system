const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully ✅");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});