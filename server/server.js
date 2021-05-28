const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const messageRoutes = require('./routes/chatRoutes');

const http = require('http').Server(app);
const socketio = require('socket.io')(http);

const path = require('path');

const Message = require('./models/messages')
const mongoose = require('mongoose');
const { send } = require('process');


require('dotenv').config();
const PORT = process.env.PORT || 5000

const DB_URI = process.env.DB_URI


mongoose.connect(`${DB_URI}`, { useUnifiedTopology : true, useNewUrlParser : true });

mongoose.connection.once('open', () => console.log('connected to mongodb atlas'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));


socketio.on('connection', (socket) => {
    Message.find().sort({createdAt : -1}).exec((err, message) => {
        if (err) return console.log(err);

        socket.emit('init', message);
    });

    socket.on('message', (msg) => {

        console.log(msg)
        const message = new Message({
            name: msg.name,
            message: msg.content,
          });
      
          // Save the message to the database.
          message.save((err) => {
            if (err) return console.error(err);
          });
       
        socket.broadcast.emit('push', msg);
    });
});

http.listen(PORT, () => {
    console.log(`listening on Port : ${PORT}`)
})