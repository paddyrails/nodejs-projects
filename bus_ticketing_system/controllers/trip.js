var mongoose =  require('mongoose'),
    BusRoute = mongoose.model('busroute'),
    controller = {};

controller.create = [
  function(req, res, next){
    //load busroute in question
    BusRoute.findById(req.param('busrouteId'), function(err, busroute){
      if(err) return next(err);
      //validate that the update does not have a blank item
      if(!busroute) return res.send(404);
      //passing todo to the next function below
      req.busroute = busroute;
      next();
    });
  },

  function(req, res, next){
    req.busroute.trips.push(req.body);
    req.busroute.save(function(err){
      res.redirect('/busroutes');
    });
  }
];

controller.delete = [
  function(req, res, next){
    BusRoute.findById(req.param('busrouteId'), function(err, busroute){
      if(err) return next();
      if(!busroute) return res.send(404);
      req.busroute = busroute;
      next();
    });
  },

  function(req, res, next){
    req.busroute.trips.pull(req.param('tripId'));
    req.busroute.save();
    res.redirect('/busroutes');
  }
];

module.exports = controller;
