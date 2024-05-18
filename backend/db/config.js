// //config.js
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/e-commerce");

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/e-commerce");

module.exports = mongoose; // Exporting the mongoose instance
