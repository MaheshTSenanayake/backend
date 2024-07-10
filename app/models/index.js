const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.Issue = require("./issue.models");
db.User = require("./user.models");

module.exports = db;
