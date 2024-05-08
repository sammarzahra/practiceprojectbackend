const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/addTasks', taskController.createTask);
// router.get('/', taskController.getAllTasks);
router.get('/', taskController.getTasks);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
