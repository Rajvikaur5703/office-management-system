const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/office_db");

const resetPassword = async () => {
  try {
    const hashed = await bcrypt.hash("123456", 10);

    await User.updateOne(
      { email: "priya.patel@gmail.com" },
      { password: hashed }
    );

    console.log("✅ Password reset to 123456");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

resetPassword();