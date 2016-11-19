var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var https = require('https');

var data_ella = JSON.stringify({
  api_key: 'e5f4990f',
  api_secret: 'nexmo123',
  to: '+358442992245',
  from: '+358442992809',
  text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
});

// var data_parth = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358452612720',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_ville = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358408619447',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_mikael = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358503227007',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });






// var data_ilkka = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358407275856',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_kenneth = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358400458395',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_hannu = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358405488489',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_kari = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358505464150',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

// var data_jarno = JSON.stringify({
//   api_key: 'e5f4990f',
//   api_secret: 'nexmo123',
//   to: '+358504357165',
//   from: '+358442992809',
//   text: 'VEHO: Input needed for service veho-mb.eu-gb.mybluemix.net/customer '
// });

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

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

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
  //console.log('someone connected 2');

  socket.on('feedback', function(feedback){
    io.emit('feedback', feedback);
	  //msgs.emit('feedback', feedback);
	  // console.log(feedback);
   //    console.log('should SMS be sent');

   //  if(feedback['send_sms']){
   //    console.log('SMS to be sent to all');
      

   //     // nexmo_sms_send(data_ella);
   //     // nexmo_sms_send(data_parth);
   //     // nexmo_sms_send(data_ilkka);
   //     // nexmo_sms_send(data_kari);
   //     // nexmo_sms_send(data_hannu);
   //     // nexmo_sms_send(data_kenneth);
   //     // nexmo_sms_send(data_jarno);

   //  }
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


http.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

// start server on the specified port and binding host
//app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  //console.log("server starting on " + appEnv.url);
//});
