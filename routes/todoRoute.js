var express = require('express');
var router = express.Router(); 
const Models = require('../models/index') 
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('init todo');
});

router.post('/val', function(req,res , next){
  if (!req.body.title) {
      res.status(400).json({
        statusCode : 400,
        error: "title parameter is required",
        message: ""
      });
    }

    const response = {
      statusCode : 200,
      error : "",
      message : "List val", 
    } 
  res.json(response);
});

router.get('/val/(:id)', function(req, res, next) {

  if (!req.params.id) {
    res.status(400).json({
      statusCode : 400,
      error: "title parameter is required",
      message: ""
    });
  }

  const response = {
    statusCode : 200,
    error : "",
    message : "List vazzzl", 
  } 

  res.json(response);
});

router.get('/list', async (req, res) => {
  // Do something here
  const todos = await Models.Todos.findAll({})
  const response = {
      statusCode : 200,
      error : "",
      message : "List mongo", 
      content : todos
  } 
  res.json(response);
})

router.get('/detail/(:id)', async (req, res) => {
  const todo_id =req.params.id;   
  const checkDataTodos =await Models.Todos.findAll({where:{id:todo_id}})
  let statusCode = 200 
  let messageRes = "detail todo";
  if(checkDataTodos.length==0){
       statusCode = 400
       messageRes="data not found"
   }else{
      checkDataTodos = await PersonModel.findById(todo_id).exec();
   }
  const response = {
      statusCode : statusCode,
      error :messageRes,
      message : messageRes, 
      content : checkDataTodos
  } 
  res.status(statusCode).json(response);
})

router.post('/create', async (req, res) => {
  // Do something here
  
  console.log(req.body)
  const todo = await Models.Todos.create(req.body)
  const response = {
      statusCode : 200,
      error : "",
      message : "create todo", 
      content : req.body
  } 
  res.json(response);
})

router.put('/update/(:id)', async (req, res) => {  
    const todo_id =req.params.id;       
    const checkDataTodos =await Models.Todos.findAll({where:{id:todo_id}})
    let statusCode = 200 
    let messageRes = "Todo has been updated";
    if(checkDataTodos.length==0){
         statusCode = 400
         messageRes="data not found"
     }else{
        checkDataTodos = await Models.Todos.update(req.body, {
                    where: {
                        id: todo_id
                    }
                })             
     } 


    const response = {
        statusCode : statusCode,
        error : messageRes,
        message : messageRes,
        content : req.body
    } 
  res.status(statusCode).json(response);
})
router.get('/delete/(:id)', async (req, res) => {
    const todo_id =req.params.id;
   const checkDataTodos =await Models.Todos.findAll({where:{id:todo_id}})
    let statusCode = 200 
    let messageRes = "Delete todo";
    if(checkDataTodos.length==0){
         statusCode = 400
         messageRes="data not found"
     } 
    await Models.Todos.destroy({
            where: {
                id: todo_id
            }
        })
  const response = {
      statusCode : statusCode,
      error :messageRes,
      message : messageRes, 
      content : req.params.id
  } 
  res.status(statusCode).json(response);
})
module.exports = router;
