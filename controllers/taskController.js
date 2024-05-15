const Task = require('../models/taskModel');
// const multer = require("multer");

const createTask = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    // const attachment =  // File uploaded using multer
    console.log( title, description, startDate, endDate, req.file?.filename);
    // Use title, description, startDate, endDate, and file as needed
     const response =  await Task.create({ title, description, startDate, endDate, attachment:req.file?.filename }) 
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, attachment, startDate, endDate, user, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, attachment, startDate, endDate, user, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get paginated list of tasks
const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5; // Number of tasks per page
    const skip = (page - 1) * pageSize;

    const tasks = await Task.find().skip(skip).limit(pageSize);
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      data: tasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / pageSize)
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasks
};
