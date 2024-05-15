const express = require("express");
const multer = require('multer');
const path = require('path');
const connectDB = require("./config/db");
const corsMiddleware = require("./config/cors");
require('dotenv').config()
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Call the connectDB function to establish the connection
connectDB();
app.use(cors());

// Middleware
// Apply CORS middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const peopleRoutes = require("./routes/peopleRoutes"); // Add the people routes

// Apply authMiddleware for user authentication
// const { authenticateUser } = require("./middlewares/authMiddleware");
app.use("/api/users", userRoutes);

// Use authenticateUser middleware for task and notification routes
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications",  notificationRoutes);
app.use("/api/people",  peopleRoutes);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // Initialize upload variable with storage configuration
// const upload = multer({ storage: storage });

// // Serve static files from the "uploads" directory
// app.use('/uploads', express.static(path.join(__di 'uploads')));
// // Start server
// app.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     res.send(`File uploaded successfully: ${req.file.path}`);
//   } catch (err) {
//     res.sendStatus(400);
//   }
// });
app.use("/uploads", express.static(("uploads")));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
