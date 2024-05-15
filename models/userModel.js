const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Role can only be 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
  // Other user properties
});

module.exports = mongoose.model("User", userSchema);
