var socket = io();

socket.on('connect', function(){
  console.log('Connected to server.')

  socket.emit('createMessage', {
    from: 'Dan',
    text: 'Hello everone!'
  });

});

socket.on('disconnect', function(){
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(msg){
  console.log("New email", msg);
});
