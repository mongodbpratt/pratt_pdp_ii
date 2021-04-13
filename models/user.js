const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true },
    rank: {type: String, required: true },
    dodemail: {type: String, required: true },
    location: {type: String, required: true },
    password: {type: String, required: true },
    property: [{ type: Schema.Types.ObjectId, ref: “property” }]
    // why the red squiggly lines?
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);