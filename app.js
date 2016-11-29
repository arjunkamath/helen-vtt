var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var https = require('https');

const PORT = process.env.PORT || 3000;

var data_ella = JSON.stringify({
  api_key: 'e5f4990f',
  api_secret: 'nexmo123',
  to: '+358442992245',
  from: '+358442992809',
  text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
});

var options = {
  host: 'rest.nexmo.com',
  path: '/sms/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data_ella)
  }
};

//get css files
app.use(express.static('public'));

//mechanic view
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//foreman view
app.get('/foreman', function(req, res){
  res.sendFile(__dirname + '/foreman.html');
});

//customer view
app.get('/customer', function(req, res){
  res.sendFile(__dirname + '/customer.html');
});

//helen view
app.get('/helen', function(req, res){
  res.sendFile(__dirname + '/helen.html');
});

//logistics view
app.get('/logistics', function(req, res){
  res.sendFile(__dirname + '/logistics.html');
});


// var msgs = io.of('/messages');

// msgs.on('connection', function(socket){
//   console.log('someone connected 1');
// });

io.on('connection', function(socket){

  socket.on('feedback', function(feedback){
    io.emit('feedback', feedback);

  });
});

function nexmo_sms_send(data_to_send){

    var req = https.request(options);

    req.write(data_to_send);
    req.end();

    var responseData = '';
    req.on('response', function(res){
      res.on('data', function(chunk){
        responseData += chunk;
      });

      res.on('end', function(){
        console.log(JSON.parse(responseData));
      });
    });

}


http.listen(PORT, function(){
  console.log("server starting on " + PORT);
});

