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
        const {titleReq,descriptionReq,userIdReq,completedReq } = request.payload;
        console.log(request.payload);
        const todo = await Models.Todos.create({
            title:  titleReq,
            description: descriptionReq,
            userId:userIdReq,
            completed:completedReq
        })
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
        const { titleReq, descriptionReq,completedReq } = request.payload;
        const todo = await Models.Todos.update({
            title: titleReq,
            description: descriptionReq,
            completed:completedReq,
        }, {
            where: {
                id: todo_id
            }
        })
   
        const dataRequest =  request.payload
        console.log('dataRequest');
        console.log(todo);
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
        const todo_id = request.params.id;
        await Models.Todos.destroy({
            where: {
                id: todo_id
            }
        })
        const response = {
            statusCode : 200,
            error : "",
            message : "Todo has been deleted.",
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

module.exports = [
    { method: 'GET', path: '/todos/list', handler: todosHandler },
    { method: 'POST',path: '/todos/create',handler: createTodoHandler },
    { method: 'PUT', path: '/todos/update/{id}', handler: updateTodoHandler },
    { method: 'DELETE', path: '/todos/delete/{id}', handler: deleteTodoHandler },
];