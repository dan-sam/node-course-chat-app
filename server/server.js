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

  socket.emit('newMessage', {
    from: 'Mr. Server',
    text: 'Hello client.',
    createdAt: new Date()
  });

  socket.on('createMessage', (msg)=>{
    console.log(msg);
  });

  socket.on('disconnect', ()=>{
    console.log("User disconnected.");
  });


});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
