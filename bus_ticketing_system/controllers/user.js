var mongoose =  require('mongoose'),
    User = mongoose.model('user'),
    Ticket = mongoose.model('ticket'),
    controller = {};

controller.index = function(req, res, next){
      User.find({}, function(err, users){
            if(err) return done(err);
            res.render('./users/index', {users:users, user:req.user});
      });
};

controller.getUserTickets = function(req, res, next){
      Ticket.find({'user._id':req.user._id}, function(err, tickets){
            if(err) return next(err);

            res.render('./users/profile.ejs', {tickets:tickets, user:req.user})
      });
};

controller.delete = [function(req, res){
  User.findById(req.param('userId'), function(err, user){
    if(err) return next(err);
    user.remove(function(err){
      res.redirect('/users');
    });
  });
}];

module.exports = controller;
