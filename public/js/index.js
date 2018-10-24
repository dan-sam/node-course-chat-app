var socket = io();

socket.on('connect', function(){
  console.log('Connected to server.')

});

socket.on('disconnect', function(){
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(msg){
  console.log("New email", msg);
});

socket.on('welcomeMsg', function(msg){
  console.log('Welcome Message', msg);
});

socket.on('newUserJoined', function(msg){
  console.log('New User Message', msg);
});
