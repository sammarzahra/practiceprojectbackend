const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateSignUp, validateSignIn, handleValidationErrors } = require('../middlewares/validationMiddleware');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Create a new user
router.post('/signup', validateSignUp, handleValidationErrors, userController.signUp);
router.post('/signin', validateSignIn, handleValidationErrors, userController.signIn);
router.post('/logout', authenticateUser, userController.logout); // Add logout route
// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;










