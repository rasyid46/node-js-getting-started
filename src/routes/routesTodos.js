const Models = require('../../models/index') 
const Joi = require('@hapi/joi');
const todosHandler = async (request, h) => {
    try {
        const todos = await Models.Todos.findAll({})
        const response = {
            statusCode : 200,
            error : "",
            message : "List Todos",
            content : todos
        } 
        return h.response(response).code(200)
    } catch (error) {
        const response = {
            statusCode : 400,
            error : "",
            message : error.message, 
        } 
        return h.response(response).code(400)
    }
}

const createTodoHandler = async (request, h) => {
    try {
        console.log(request.payload);
        const todo = await Models.Todos.create(request.payload)
        const response = {
            statusCode : 200,
            error : "",
            message : "New todo has been created.",
            content : todo
        } 
        return h.response(response).code(200)
    } catch (error) {
        const response = {
        statusCode : 400,
        error : "",
        message : error.message, 
    } 
        return h.response(response).code(400)
    }
}

const updateTodoHandler = async (request, h) => {
    try {
        const todo_id = request.params.id;
        const todo = await Models.Todos.update(request.payload, {
            where: {
                id: todo_id
            }
        })
        const response = {
            statusCode : 200,
            error : "",
            message : "Todo has been updated",
            content : request.payload
        } 
        return h.response(response).code(200)
    } catch (error) {
        const response = {
                            statusCode : 400,
                            error : "",
                            message : error.message, 
                        } 
        return h.response(response).code(400)
    }
}

const deleteTodoHandler = async (request, h) => {
    try {
    const id = request.params.id;
            const todo_id = request.params.id;
    const checkData =  await Models.Todos.findAll({where:{id:id}});
    console.log('hhhh',checkData);
    let statusCode= 200;
    let messageRes = "Todo has been delete"
    if(checkData.length==0){
        statusCode = 404;
        messageRes = "data not found";
    }else{
                await Models.Todos.destroy({
                        where: {
                            id: todo_id
                        }
                    })
    }  

        const response = {
            statusCode : statusCode,
            error : messageRes,
            message : messageRes,
            
        } 
        return h.response(response).code(statusCode)
    } catch (error) {
        const response = {
                            statusCode : 400,
                            error : "",
                            message : error.message, 
                        } 
        return h.response(response).code(400)
    }
}

module.exports = [
    { method: 'GET', path: '/todo/list', handler: todosHandler },
    { method: 'POST',path: '/todo/create',handler: createTodoHandler },
    { method: 'PUT', path: '/todo/update/{id}', handler: updateTodoHandler },
    { method: 'GET', path: '/todo/delete/{id}', handler: deleteTodoHandler },
];