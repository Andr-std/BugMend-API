const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan')
const response = 'message';

let messages = [];
let message = '';
let helps = [];

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
        // console.log(user)
        // console.log(messages)
        socket.emit('messages', messages)
        socket.emit('helps', helps)
    });

    socket.on('sendMessage', (message) => {
        messages = [...messages, message]
        // console.log(messages)
        socket.emit('message', message)
        socket.broadcast.emit('message', message)
    })

    socket.on('askHelp', (help) => {
        helpIds = helps.map(i => i.userId)
        if (helpIds.includes(help.userId) && !help.isSolved) {
            helps = [...helps.slice(0, helpIds.indexOf(help.userId)), help, ...helps.slice(helpIds.indexOf(help.userId) + 1)]
        } else if (helpIds.includes(help.userId) && help.isSolved) {
            helps = [...helps.slice(0, helpIds.indexOf(help.userId)), ...helps.slice(helpIds.indexOf(help.userId) + 1)]
        }
        else {
            helps = [...helps, help]
        }
        console.log('help', help)
        console.log('helps', helps)
        socket.emit('helps', helps)
        socket.broadcast.emit('helps', helps)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = process.env.Port || 8080;
http.listen(port, () => {
    console.log(`listening on ${port}`);
});
