const Joi = require('@hapi/joi');
const Mongoose = require('../../mongoModel/mongoConfig')
const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});   

const todosHandler = async (request, h) => {
        try {

            var person = await PersonModel.find().exec();
            const response = {
                statusCode : 200,
                error : "",
                message : "List mongo", 
                content : person
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
    const insertHandler = async (request, h) => {
            try {
           
                var person = new PersonModel(request.payload);
                var result = await person.save();
                const response = {
                    statusCode : 200,
                    error : "",
                    message : "List mongo", 
                    content : result
                } 
                return h.response(result).code(200)
            } catch (error) {
                const response = {
                    statusCode : 400,
                    error : "",
                    message : error.message, 
                } 
                return h.response(response).code(400)
            }
    }
    const updateHandler = async (request,h) => {
         try{
            var result = await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
            const response = {
                statusCode : 200,
                error : "",
                message : "List update",
                content : result
            } 
            return h.response(response).code(200)
         }catch(error){
            const response = {
                statusCode : 400,
                error : "",
                message : error.message, 
            } 
            return h.response(response).code(400)
         }
    }    
    const getMonogDetail = async(request, h) => {
        try{
            var person = await PersonModel.findById(request.params.id).exec();
            const response = {
                statusCode : 200,
                error : "",
                message : "List update",
                content : person
            } 
            return h.response(response).code(200)
         }catch(error){
            const response = {
                statusCode : 400,
                error : "",
                message : error.message, 
            } 
            return h.response(response).code(400)
         }
    }
    const deletePerson = async(request, h) => {
        try {
            // var person = await PersonModel.findById(request.params.id).exec();
            var result = await PersonModel.findByIdAndDelete(request.params.id);
            const response = {
                statusCode : 200,
                error : "",
                message : "Delete Person",
                content : result
            } 
            return h.response(response).code(200)
        } catch (error) {
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
        { method: 'GET', path: '/mongo/list/{id}', handler: getMonogDetail },
        { method: 'POST',path: '/mongo/create',handler: insertHandler },
        { method: 'PUT', path: '/mongo/update/{id}', handler: updateHandler },
        { method: 'DELETE', path: '/mongo/delete/{id}', handler: deletePerson },
    ];