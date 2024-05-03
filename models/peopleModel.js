const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  taskStart: {
    type: Date,
    required: true
  },
  taskEnd: {
    type: Date,
    required: true
  },
  overdueDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification'
    }
  ],
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  }
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
