const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');

// create an http server that creates an instance of express
const httpServer = require('http').createServer(app);
// enable a web socket server  
const io = require('socket.io')(httpServer, {
    cors: {
        // web socket will accept request from origin 
        origin: ['http://localhost:3000']
    }
});

const PORT = process.argv[2] || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create a server instance passing express server configuration inside.
httpServer.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});


io.on('connect', (socket) => {
    console.log(socket.id);
    
    socket.on('message', (message) => {
        console.log(message);
        socket.broadcast.emit('receive', (message));
    })
});


