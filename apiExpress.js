require('dotenv').config()
const express = require('express') 
const app = express()
const PORT = process.env.PORT || 5000
app.get('/', (req, res) => res.send('Hello World!'))
const router = express.Router();
const bodyParser = require("body-parser");

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 

const asyncMiddleware = require('./util/asyncMiddleware');



const Mongoose = require('./mongoModel/mongoConfig')

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
}); 


// URL apa lalu ditangani oleh aksi apa. Aksi yang kita lewatkan ke dalam routes harus menerima variabel request, response, dan next.
app.post('/abc', asyncMiddleware(async (req, res, next) => {
console.log(req.param('first_name'))

var person = await PersonModel.find().exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : person
  } 
  res.json(response);
}));
app.get('/mongo/list', (req, res) =>

res.json({
    statusCode : 200,
    error : "",
    message : "List mongo", 
  })

)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))