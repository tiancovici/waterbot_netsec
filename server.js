//Import Passport configurations




var express           = require('express');     // Import Express //
var app               = express();            

var morgan            = require("morgan");  /* Some fancy way of logging requests */

var bodyParser        = require('body-parser') /* Extra BS needed to interface client and server  */
var cookieParser      = require('cookie-parser');   /* ??? */
var session      = require('express-session'); /* ??? */

const mqtt = require('mqtt') ;

app.use(cookieParser()); // read cookies (needed for auth)


app.use(bodyParser.json()); // get information from html forms

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;



// create application/json parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});