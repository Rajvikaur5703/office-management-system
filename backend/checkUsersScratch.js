const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: "admin@office.com" });
    if (!existing) {
      const admin = new User({
        name: "Admin",
        email: "admin@office.com",
        password: "adminpassword", // Plaintext as per the backend implementation currently
        role: "admin",
        department: "Management"
      });
      await admin.save();
      console.log("Admin user created!");
    } else {
      console.log("Admin already exists!");
    }
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
