var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    cron = require('node-schedule'),
    session = require('express-session'),
    basicAuth = require("basic-auth-connect");

mongoose.connect('mongodb://localhost/BusTicketingSystem');
require('./config/passport')(passport);
require('./models/busroute');
require('./models/ticket');

var busrouteController = require('./controllers/busroute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.use(session({secret: 'BhamburJackMasterBlasterDammuSidhu'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes.js')(app, passport);

var rule = new cron.RecurrenceRule();
//rule.dayOfWeek = [0,1,2,3,4,5,6];
//rule.hour = 2;
//rule.minute = 10;
//rule.second = 10;
//cron.scheduleJob(rule, busrouteController.job);


app.listen(port, function(err){
  console.log("listening at %s", port);
});
