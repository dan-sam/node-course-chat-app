const express = require("express");
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");

  //socket.emit from Admin text Welcome to the chat app
  //socket.broadcast.emit from Admin text new user joined.

  //send message to this socket only
  socket.emit('welcomeMsg', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });

  //send or broadcast to everyone except for this socket that joined ==> io.on('connection')
  socket.broadcast.emit('newUserJoined', {
    from: 'Admin',
    text: 'New User joined the chat room.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (msg)=>{
    console.log(msg);
    //send the message to everyone including the socket that emitted the event 'createMessage'
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });

    //send to everyone except for this socket that emitted the event 'createMessage'
    // socket.broadcast.emit('newMessage', {
    //     from: msg.from,
    //     text: msg.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log("User disconnected.");
  });


});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
