const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Users",
  },
  createdAt: {
    type: Date.split("T")[0],
    default: Date.now,
  },
});

const userList = mongoose.model("Userlist", userSchema);

module.exports = userList;
