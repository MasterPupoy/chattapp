const Messages = require('../models/messages');


module.exports.sendMessage = (params) => {
    console.log(params)
    const message = new Messages({
        name : params.name,
        message : params.message
    });

    return message.save().then((message, err) => {
        if (err) return console.log(err);
    });
};