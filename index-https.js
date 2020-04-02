var app = require('express')();
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('/./privkey.pem'),
  cert: fs.readFileSync('./cert.pem')
};

var serverPort = 21248;
var server = https.createServer(options, app);
var io = require('socket.io')(server);

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

server.listen(serverPort, function() {
    console.log('Listening on ', serverPort);
});
