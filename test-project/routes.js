//Load all things you need
var basicAuth = require("basic-auth-connect");

//Load controllers
var busrouteController = require('./controllers/busroute');
var tripController = require('./controllers/trip');
var journeyController = require('./controllers/journey');
var userController = require('./controllers/user');

module.exports = function(app, passport){

  //show login form
  app.get('/login', function(req, res){
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  //show signup form
  app.get('/signup', function(req, res){
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });

  //process signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash    : true //allow flash messages
  }));

  //process login form
  /*
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/journeys',
    failureRedirect : '/login',
    failureFlash    : true //allow flash messages
  }));*/

app.post('/login', passport.authenticate('local-login'),  function(req, res) {
    if(req.user.local.isAdmin){
      res.redirect(req.session.returnTo || '/busroutes');
    }else{
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    }
});

  app.get('/', function(req, res){
    res.redirect('/journeys');
  });

  //journeys
  app.get('/journeys', journeyController.index)
  app.get('/journeys/:journeyId', journeyController.showSeats)
  app.post('/journeys/:journeyId/:seatno', isLoggedIn, journeyController.bookSeats)
  app.get('/journeys/:journeyId/:seatno', isLoggedIn, journeyController.getSeatInfo)
  app.get('/profile', isLoggedIn, userController.getUserTickets);


  //routes
  //app.use(basicAuth('admin','admin'));
  app.get('/journeys/delete/:journeyId', isAdmin , journeyController.delete)
  app.get('/busroutes', isAdmin, busrouteController.index)
  app.post('/busroutes', isAdmin, busrouteController.create)
  //app.get('/busroutes/:busrouteId', articleController.display);
  app.put('/busroutes/:busrouteId', isAdmin, busrouteController.update);
  app.get('/busroutes/delete/:busrouteId', isAdmin, busrouteController.delete);

  //trips
  app.post('/busroutes/:busrouteId', isAdmin, tripController.create);
  app.get('/busroutes/:busrouteId/:tripId', isAdmin, tripController.delete);

  //users
  app.get('/users', isAdmin, userController.index);
  app.get('/users/delete/:userId', isAdmin , userController.delete)

  //logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

};


//route middleware to mafe sure user is logged in
function isLoggedIn(req, res, next){
  //if user is authenticated in the sessions, carry on
  if(req.isAuthenticated()){
    console.log('req.user : ' + req.user.local.email);
    return next();
  }
  //if they aren't redirect them to home page
  res.redirect('/login');
}

//route middleware to mafe sure user is logged in
function isAdmin(req, res, next){
  //if user is authenticated in the sessions, carry on
  if(req.isAuthenticated()){
    if(req.user.local.isAdmin);
    return next();
  }
  //if they aren't redirect them to home page
  res.redirect('/');
}
