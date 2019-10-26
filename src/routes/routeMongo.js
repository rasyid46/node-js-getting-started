const Joi = require('@hapi/joi');
const Mongoose = require('../../mongoModel/mongoConfig')
const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});   
const todosHandler = async (request, h) => {
        try {
            var person = await PersonModel.find().exec();
            let statucCode = 200;
            let messageRes = "Data Person";
            if(person.length == 0){
                statucCode = 404;
                messageRes = "Data Not found"
            }
            const response = {
                statusCode : statucCode,
                error : "",
                message : messageRes,
                content : person
            } 
            return h.response(response).code(statucCode)
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
                    message : "List Person", 
                    content : result
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
    const updateHandler = async (request,h) => {
         try{
            var result = await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
            let statucCode = 200;
            let messageRes = "Delete Person";
            if(!result){
                statucCode = 404;
                messageRes = "Data Not found"
            }
            const response = {
                statusCode : statucCode,
                error : "",
                message :messageRes,
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
            let statucCode = 200;
            let messageRes = "Delete Person";
            if(!person){
                statucCode = 404;
                messageRes = "Data Not found"
            }
            const response = {
                statusCode : statucCode,
                error : "",
                message : messageRes,
                content : person
            } 
            return h.response(response).code(statucCode)
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
            let statucCode = 200;
            let messageRes = "Delete Person";
            if(!result){
                statucCode = 404;
                messageRes = "Data Not found"
            }
            const response = {
                statusCode : statucCode,
                error : "",
                message :messageRes,
                content : result
            } 
            return h.response(response).code(statucCode)
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
        { method: 'GET', path: '/profile/list', handler: todosHandler },
        { method: 'GET', path: '/profile/detail/{id}', handler: getMonogDetail },
        { method: 'POST',path: '/profile/create',handler: insertHandler },
        { method: 'PUT', path: '/profile/update/{id}', handler: updateHandler },
        { method: 'GET', path: '/profile/delete/{id}', handler: deletePerson },
    ];