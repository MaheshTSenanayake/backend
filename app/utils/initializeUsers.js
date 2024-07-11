const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");

async function initializeUsers() {
  try {
    const user1 = await User.findOne({ email: "admin@example.com" });
    const user2 = await User.findOne({ email: "user@example.com" });

    if (!user1) {
      const admin = new User({
        name: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("admin123", 8),
        role: "admin"
      });

      await admin.save();
      console.log("Admin user created");
    }

    if (!user2) {
      const user = new User({
        name: "user",
        email: "user@example.com",
        password: bcrypt.hashSync("user123", 8),
        role: "user"
      });

      await user.save();
      console.log("Regular user created");
    }
  } catch (error) {
    console.error("Error initializing users: ", error);
  }
}

module.exports = initializeUsers;
