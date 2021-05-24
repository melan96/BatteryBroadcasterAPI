const mongoose = require("mongoose");

const UserModelSchema = mongoose.Schema({
  username: String,
  password: String,
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserModel", UserModelSchema);
