const express = require("express");
const connectDB = require("./config/db");
const corsMiddleware = require("./config/cors");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

// Call the connectDB function to establish the connection
connectDB();

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
