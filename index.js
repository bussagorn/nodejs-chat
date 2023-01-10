const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); //รับรีเคสต่อยอดจาดhttp
const io = new Server(server);

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (Socket) => {
    // console.log('connection from user');
    Socket.on('chat message to commandline', (msg) => {
        console.log('message:' + msg);
        io.emit('chat message to page', msg);
    })
})

server.listen(3000,()=> {
    console.log('listening on *:3000');
});