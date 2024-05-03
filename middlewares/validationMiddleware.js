const { body, validationResult } = require('express-validator');

// Middleware for user sign up validation
const validateSignUp = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email format.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// Middleware for user sign in validation
const validateSignIn = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email format.'),
  body('password').notEmpty().withMessage('Password is required.')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSignUp,
  validateSignIn,
  handleValidationErrors
};
