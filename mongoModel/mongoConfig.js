require('dotenv').config()
const Mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI
const TYPE = process.env.TYPE || "PROD"
if(TYPE==="LOCAL"){
    Mongoose.connect(MONGODB_URI);
}else{
    Mongoose.connect("mongodb://heroku_cmqlnzld:admin1234!@ds241097.mlab.com:41097/heroku_cmqlnzld?retryWrites=false");
}
module.exports = Mongoose;

