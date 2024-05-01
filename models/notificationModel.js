const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  // Other notification properties
});

module.exports = mongoose.model("Notification", notificationSchema);
