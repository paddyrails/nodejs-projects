// app/models/user.js

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

//define schema for User model
var userSchema = mongoose.Schema({
    local         :{
      email       : String,
      password    : String,
      isAdmin     : { type: Boolean, default: false }
    }
});

// methos ===========================
// generating a hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

//create model for users and expose it to app
module.exports = mongoose.model('user', userSchema);
