var Mongoose = require('./mongoConfig')

const PersonModelz = Mongoose.model("personz", {
    firstname: String,
    lastname: String
}); 

module.export = PersonModelz;
 