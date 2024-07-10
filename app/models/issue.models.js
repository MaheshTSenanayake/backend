const mongoose = require("mongoose");

const Issue = mongoose.model(
  "Issue",
  new mongoose.Schema({
    title: String,
    description: String,
    severity: String,
    priority: String,
    status: String,
  })
);
module.exports = Issue;