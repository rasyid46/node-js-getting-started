var express = require('express');
var router = express.Router(); 

const Mongoose = require('../mongoModel/mongoConfig')
const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
}); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('inie');
});

router.get('/list', async (req, res) => {
  // Do something here
  var person = await PersonModel.find().exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : person
  } 
  res.json(response);
})

router.get('/detail/(:id)', async (req, res) => {
  var person = await PersonModel.findById(req.params.id).exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : person
  } 
  res.json(response);
})

router.post('/create', async (req, res) => {
  // Do something here
  console.log(req.body)
  var person = new PersonModel(req.body);
  var result = await person.save();
  const response = {
      statusCode : 200,
      error : "",
      message : "create Profile", 
      content : result
  } 
  res.json(response);
})

router.put('/update/(:id)', async (req, res) => { 
  var person = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : person,
      form : req.body
  } 
  res.json(response);
})


router.get('/delete/(:id)', async (req, res) => {
  var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : person
  } 
  res.json(response);
})
module.exports = router;
