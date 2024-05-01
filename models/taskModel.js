const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Rejected"],
    required: true,
  },
  // Other task properties
});

module.exports = mongoose.model("Task", taskSchema);
