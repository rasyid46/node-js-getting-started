var Mongoose = require('./mongoConfig')

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
}); 

module.export = PersonModel;
 