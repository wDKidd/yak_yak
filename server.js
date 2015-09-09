var express = require('express'),
    exp = express(),
    http = require('http'),
    jade = require('jade');


var app = http.createServer(exp);
var io = require('socket.io').listen(app);

var port = 3030;

exp.set('views', __dirname + '/views');
exp.set('view engine', 'jade');
exp.set('view options', { layout: false });
exp.use(express.static(__dirname + '/public')); //this is where our static files live (js, css, img)

exp.get('/', function(req, res){
  res.render('home.jade');
});

app.listen(port);

io.sockets.on('connection', function(socket){
  socket.on('setPseudo', function(data){
    socket.set('pseudo', data);
  });

  socket.on('message', function(message){
    socket.get('pseudo', function(error, name){
      var data = {
        'message': message,
        psuedo: name
      };
      socket.broadcast.emit('message', data);
      console.log("user " + name + " send this: " + message);
    })
  })
});
