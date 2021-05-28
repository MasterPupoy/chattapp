const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    name : {
        type : String
    },
    message : {
        type : String
    }
}, { timestamps : true });

module.exports = mongoose.model('Messages', messageSchema)