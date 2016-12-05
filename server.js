//Import Passport configurations




var express           = require('express');     // Import Express //
var app               = express();            

var morgan            = require("morgan");  /* Some fancy way of logging requests */

var bodyParser        = require('body-parser') /* Extra BS needed to interface client and server  */
var cookieParser      = require('cookie-parser');   /* ??? */
var session      = require('express-session'); /* cookie sessions  */
var sleep = require('sleep'); //zZzZ

/* Extra protection  */
var helmet = require('helmet');
app.use(helmet());

app.disable('x-powered-by');    //Turn off the header


var router = express.Router();


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;


// create application/json parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//////////////
//Setup MQTT
//////////////
var exec = require('child_process').exec;

// set the view engine to ejs
app.set('view engine', 'ejs');
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
// set the home page route
app.get('/', function(req, res) {
    // ejs render automatically looks in the views folder
    res.render('index');
});



///
var getIP = require('ipware')().get_ip;
const ipPort = '192.168.1.134';
const child = require('child_process');


//======[Back-End <- Front-End, User Login Info ]==========//
var count = 0;
var lastIp;
app.post("/wqdjo123ji/user/", function(req, res){
   var user = req.body;
   //console.log(user);

  //Connect to mqtt Broker/Waterbot
  var ipInfo = getIP(req);
  var logged;

  someChild1 = child.execFile("/usr/local/bin/mosquitto_pub", 
  ['-p', '1202', '-h', ipPort, '-t', 'test/test', '-m', '1',
   //'--key', './RPI3_POWER_clients/certs/client2.key', 
   //'--cert','./RPI3_POWER_clients/certs/client2.crt',
   '-u', user.name, '-P', user.passw],
  function(err, stdout, stderr) 
  {
      console.log(stderr); 
      if(stderr)
      {
          logged = false;
          console.log("Failed to log in")
          count++;
      }
      else{
          logged = true;
          count = 0;
      }
      console.log(logged);
      res.json({counter: count, status: logged});
  });
  sleep.usleep(1000000);
  someChild1.kill();
});


///[     Water pump buton ]///
app.post("/ejtlqwjmv/act/", function(req, res){

  var user = req.body;
  someChild2 = child.execFile("/usr/local/bin/mosquitto_pub", 
  ['-p', '1202', '-h', ipPort, '-t', 'act/water', '-m', '0',
   '-u', user.name, '-P', user.passw],
  function(err, stdout, stderr) 
  {
      console.log(stdout)
  });
  sleep.usleep(1000000);
  someChild2.kill();
});

///[     Water pump buton ]///
app.post("/rtiuvnxjued/act/", function(req, res){

  var user = req.body;
 someChild3 = child.execFile("/usr/local/bin/mosquitto_pub", 
  ['-p', '1202', '-h', ipPort, '-t', 'light_ctrl', '-m', user.lightstateBool,
   '-u', user.name, '-P', user.passw],
  function(err, stdout, stderr) 
  {
      console.log(stdout)
  });

  sleep.usleep(1000000);
  someChild3.kill();
});



app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});