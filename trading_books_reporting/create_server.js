var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config');
var reportingConfig = config.get('reporting.config');

// Setup Express sessions.
const expressSession = require('express-session');
  // Use FileStore in development mode.
  const FileStore = require('session-file-store')(expressSession);
  app.use(expressSession({
    resave: false,
    saveUninitialized: true, // true in dev to  inspect session data
    secret: 'unguessable',
    store: new FileStore(),
  }));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./banking_routes')(app);

app.get('/api/session', (req, res) => {
    const session = {auth: req.isAuthenticated()}
    res.status(200).json(session);
});

app.get('/heartbeat', function(req, res){
  var status = {
    success: true,
    address: server.address().address,
    port: server.address().port
   };
  res.send(status);
});

/*var server = app.listen(reportingConfig.port, reportingConfig.host, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server Running On: http://%s:%s', host, port);
});*/

app.listen(3005);
