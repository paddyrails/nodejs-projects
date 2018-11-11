var mongoose =  require('mongoose'),
    BusRoute = mongoose.model('busroute'),
    Journey = mongoose.model('journey'),
    Ticket = mongoose.model('ticket'),
    journeyController = require('../controllers/journey'),
    controller = {};

controller.index = [
  function(req, res, next){
    BusRoute.find({}, function(err, busroutes){
      if(err) return next(err);
      res.render('./busroutes/index', {busroutes:busroutes, user:req.user});
    });
  }
];

controller.delete = [function(req, res){
  BusRoute.findById(req.param('busrouteId'), function(err, busroute){
    if(err) return next(err);
    busroute.remove(function(err){
      res.redirect('/busroutes');
    });
  });
}];

controller.update = [
  function(req, res, next){
    BusRoute.findById(req.param('busrouteId'), function(err, busroute){
      if(err) return next(err);
      if(!busroute) return res.send(404);
      req.busroute = busroute;
      next();
    });
  },

  function(req, res, next){
    for(key in req.body){
      req.busroute[key] = req.body[key];
    }
    req.busroute.save(function(err, busroute){
      res.json(busroute);
    });
  }
];

controller.create = [
  function(req, res, next){
    if(("name" in req.body && req.body.name !== '') &&
       ("from" in req.body && req.body.from !== '') &&
       ("to" in req.body && req.body.to !== '') &&
       ("days" in req.body && req.body.days !== '')){
         next();
       }
       else{
         res.send(400);
       }
  },
  function(req, res, next){
    BusRoute.create(req.body, function(err, busroutes){
      if(err) return next(err);
      res.redirect('/busroutes')
    });
  }
];


/* SCHEDULED JOB TO GENERATE TICKETS FOR EACH DAY */

controller.job = function(){
      var weekday=new Array(7);
      weekday[1]="Mon";  weekday[2]="Tue";  weekday[3]="Wed";  weekday[4]="Thu";  weekday[5]="Fri";  weekday[6]="Sat";  weekday[0]="Sun";
      var d = new Date();
      var day = weekday[d.getDay()];

      BusRoute.find({}, function(err, busroutes){
        if(err) return next(err);
        for(var i=0; i<busroutes.length;i++){
          if(busroutes[i].days.includes(day)){
            CreateJourney(busroutes[i]);
          }else{
            console.log("No trips today!" + "BusRoutes.days : " +  busroutes[i].days + "day :" + day);
          }
        }
      });
}

function CreateJourney(busroute){
  for(var i=0; i<busroute.trips.length; i++){
    console.log("generate for time : " + busroute.trips[i].time);
    var newJourney = Journey({
      name:busroute.name,
      from:busroute.from,
      to:busroute.to,
      date:(new Date()).setHours(0,0,0,0),
      time:busroute.trips[i].time,
      bus_type:busroute.trips[i].bus_type
    });
    newJourney.save(function(err, journey){
      if(err) console.log(err);
      GenerateTickets(journey);
    });
  }
}

function GenerateTickets(journey){
  var seats = [];
  if(journey.bus_type == "Volvo")
    seats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
  else if(journey.bus_type == "MiniBus")
    seats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  for(var i=0; i<seats.length; i++){
    newTicket = Ticket({
      seatno:seats[i],
      passengername:"",
      Age:0,
      reserved:0,
      journey:journey
    });

    newTicket.save(function(err, ticket){
      if(err) console.log(err);
    });
  }
}

/*controller.delete = [
  function(req, res, next){
    //load busroute in question
    res.send(req.param('busrouteId'));
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
    req.busroute.remove();
    res.send("removed");
  }
];*/

module.exports = controller;
