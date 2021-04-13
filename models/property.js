const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema[{
    // I made this an array
    name: {type: String, rquired: true},
    serialnumber: {type: String, required: true },
    picture: {type: String, required: true },
    location: {type: String, required: true },
    primaryhandreceiptholder: {type: String, required: true },    
    // how do I make this only the logied in user?
    subhandreceiptholder: {type: String, required: true },
    quantity: {type: Interger, require: true},
}];

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

