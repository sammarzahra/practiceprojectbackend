// config/cors.js
const cors = require("cors");

// Define whitelist of allowed origins
const whitelist = ["http://localhost:3000", "*"];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
