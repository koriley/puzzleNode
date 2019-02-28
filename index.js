const express = require('express');
var app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use(express.static('assets'));
io.on('connection', (socket)=>{
    socket.on('rotation', (e)=>{
        console.log(JSON.stringify(e, undefined, 2))
        io.emit('rotation', e);
    });
    console.log('A user has connected');
})
http.listen(port, () => console.log(`Example app listening on port ${port}!`))