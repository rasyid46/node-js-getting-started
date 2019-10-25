require('dotenv').config()

const Mongoose = require("mongoose");
Mongoose.connect("mongodb://localhost/belajarmongo");
module.exports = Mongoose;