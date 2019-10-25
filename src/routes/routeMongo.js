const Models = require('../../models/index') 
const Joi = require('@hapi/joi');

         
var MongoClient = require('mongodb').MongoClient;
const todosHandler = async (request, h) => {
        try {
            const response = {
                statusCode : 200,
                error : "",
                message : "List mongo", 
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
        { method: 'GET', path: '/mongo/list', handler: todosHandler },
        { method: 'POST',path: '/mongo/create',handler: todosHandler },
        { method: 'PUT', path: '/mongo/update/{id}', handler: todosHandler },
        { method: 'DELETE', path: '/mongo/delete/{id}', handler: todosHandler },
    ];