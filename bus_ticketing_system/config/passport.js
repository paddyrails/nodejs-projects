//config/passport.js

// load all the thins we need
var LocalStrategy = require('passport-local').Strategy,
//load user model
    User = require('../models/user.js'),
    Mail = require('../controllers/mail.js'),
    configAuth =  require('./auth');


//expose this function to our app using module.exports
module.exports =  function(passport){
  //================================================================
  //===========Passport session setup===============================
  //================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  //used to serialize the user for session
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  //used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  //================================================================
  //===========Local Signup===============================
  //================================================================
  // we are using names strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    //by default local strategy uses username and password, we will override it to use email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done){
    //asynchronous
    // User.findOne won't fire unless data is sent back
    process.nextTick(function(){
      //find a user whose email is same as the forms email
      // we are trying to check if the user who is trying to login exists
      User.findOne({'local.email':email}, function(err, user){
        //if there are errors, return the errors
        if(err) return done(err);

        //check to see if there is already a user with that email
        if(user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        }else{
          //if there is no user with that email
          //create the user
          var newUser = new User();

          //set user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          //save the user
          newUser.save(function(err){
            if(err) throw err;
            //setup email with unicade symbols
            var mailOptions = {
                  from: '"Popsy travels" <147popsy@gmail.com',
                  to: newUser.local.email, //list of receivers
                  subject: 'Welcome to Popsy Travels',
                  html: '<h2>Thanks for Registering with us!</h2>'
            }
            console.log("inside new user save");
            //send mail with the transport opject
            Mail.transporter.sendMail(mailOptions, function(err, info){
                  if(err) return console.log(err);
                  console.log('message sent : ' + info.response);
            });

            return done(null, newUser);
          });
        }
      });
    });
  }));

  //================================================================
  //===========Local Signup===============================
  //================================================================
  // we are using names strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy({
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true

  }, function(req, email, password, done){ //callback with email and password from form
      //find user whose email is present in database
      User.findOne({'local.email': email}, function(err, user){
        if(err) return done(err);

        //if no user found return message, no use exists
        if(!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));

        //if user is found and password is wrong
        if(!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        //if all is well
        return done(null, user);
      });
  }));
};
