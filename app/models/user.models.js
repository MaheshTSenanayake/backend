const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fname: String,
    lname: String,
    role: String,
  })
);
module.exports = User;