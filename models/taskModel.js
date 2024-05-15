const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    required:false
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },

  status: {
    type: String,
    enum: ["Pending", "Completed", "Rejected"],
    
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
