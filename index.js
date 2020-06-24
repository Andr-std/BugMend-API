const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan')
const response = 'message';

let messages = [];
let message = '';

const { getUser, addUser, removeUser } = require('./users');
const users = require('./users');

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', ({ name, isInstructor }) => {
        console.log(addUser)
        const user = addUser({ id: socket.id, name, isInstructor })
        console.log(user)
        console.log(messages)
        socket.emit('messages', messages)
    });

    socket.on('sendMessage', (message) => {
        messages = [...messages, message]
        console.log(messages)
        socket.emit('message', message)
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = process.env.Port || 8080;
http.listen(port, () => {
    console.log(`listening on ${port}`);
});
