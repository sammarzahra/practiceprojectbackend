const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token,  process.env.SECRET_KEY); // Replace 'your_secret_key' with your actual secret key
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = {
  authenticateUser
};
