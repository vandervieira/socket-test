var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('A new WebSocket connection has been established');
});

setInterval(function() {
  var stockprice = Math.floor(Math.random() * 1000);
  io.emit('stock price update', stockprice);
}, 50);

http.listen(21073, function() {
    console.log('Listening on 21073');
});
