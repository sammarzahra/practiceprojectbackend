const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer =  require("multer")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
    },
  });
  const upload = multer({ storage: storage });


router.post('/addTasks', upload.single("file"), taskController.createTask);
// router.get('/', taskController.getAllTasks);
router.get('/', taskController.getTasks);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
