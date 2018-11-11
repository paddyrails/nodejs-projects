var mongoose =  require('mongoose'),
    BusRoute = mongoose.model('busroute'),
    Ticket = mongoose.model('ticket'),
    Journey = mongoose.model('journey'),
    _ = require('underscore'),
    Mail = require('./mail.js'),
    controller = {};


controller.index = [
  function(req, res, next){
    Journey.find({ "date":{ $gte:(new Date().setHours(0,0,0,0))} }, function(err, journeys){
      if(err) return next(err);
      var modjourneys = _
                        .chain(journeys)
                        .groupBy('name')
                        .map(function(value, key){
                          return{
                            name: key,
                            from: _.pluck(value, 'from'),
                            to: _.pluck(value, 'to'),
                            date: _.pluck(value, 'date'),
                            time: _.pluck(value, 'time'),
                            journeyId: _.pluck(value, '_id')
                          }
                        }).value()

      for(i=0; i<modjourneys.length; i++){
            var strdate = String(modjourneys[i].date[0]);
            modjourneys[i].newdate = strdate.substr(0,15);
      }

      //res.send(modjourneys);
      res.render('./journey/index.ejs',{journeys:modjourneys, user:req.user});
    });
  }
];

controller.delete = [
  function(req, res, next){
    Journey.findById(req.param('journeyId'), function(err, journey){
      if(err) return next(err);
      journey.remove(function(err){
        res.redirect('/journeys');
      });
    });
  }
];

controller.showSeats = [
  function(req, res, next){
    req.session.returnTo = req.path;
    var ljourney = null;
    Journey.findById(req.param('journeyId'), function(err, journey){
      ljourney = journey;

      var strdate = String(journey.date);
      ljourney.newdate = strdate.substr(0,15);
    });

    Ticket.find({'journey._id':req.param('journeyId')}, function(err, tickets){
      if(err) return next(err);
      var reserverdTickets = _.where(tickets, {reserved:true});
      var reservedSeats = [];
      for (var id in reserverdTickets) {
          reservedSeats.push(reserverdTickets[id]["seatno"]);
          if(reservedSeats.length == 0)
            reservedSeats.push(0);
      }
      res.render('./journey/showseats.ejs', {reserverdTickets:reservedSeats, journey:ljourney, user:req.user});
    });
  }
];

/*
controller.bookSeats = [
  function(req, res, next){
    Ticket.find({'journey._id':req.param('journeyId'), 'seatno':req.param('seatno')}, function(err, ticket){
      if(err) return next(err);
      if(!ticket[0]) return res.send(404);
      req.ticket = ticket[0];
      next();
    });
  },
  function(req, res, next){
    req.ticket["passengername"] = req.body['passengername'];
    req.ticket["age"] = req.body['age'];
    req.ticket["reserved"] = true;
    req.ticket.save(function(err){
      if(err) return next(err);
    });
    res.redirect('/journeys/' + req.param('journeyId'));
  }
];*/

controller.bookSeats = [
  function(req, res, next){
        console.log(req.body);
    //Book MUltiple Seats
    if(req.body["seatno"].length>1){
          console.log("in first IF condition");
      var newarr = [];
      for(i=0; i<req.body["seatno"].length; i++){
        newarr.push( { "seatno":req.body["seatno"][i],
                       "update":{ "passengername":req.body["passengername"][i], "age":req.body["age"][i], "reserved":req.body["reserved"][i], "user":req.user }});
      }

      for(i=0; i<newarr.length; i++){
        var query = {'journey._id':req.param('journeyId'), 'seatno':newarr[i]["seatno"]};
        var options = {multi:false};
        Ticket.update(query, newarr[i]["update"], options, function(err, tickets){
          if(err) return next(err);
          console.log(newarr);
        });
      }
      res.redirect('/journeys/' + req.param('journeyId'));
    }
    //Book Single Seat
    else if (req.body["seatno"].length==1) {
          console.log("in second IF condition");
      var query = {'journey._id':req.param('journeyId'), 'seatno':req.param('seatno')};
      var options = {multi:false};
      Ticket.update(query, _.extend(req.body, {'user':req.user}), options, function(err, ticket){
        if(err) return next(err);

      });
      res.redirect('/journeys/' + req.param('journeyId'));
    }
  }
];

controller.getSeatInfo = [
  function(req, res, next){
    Ticket.find({'journey._id':req.param('journeyId'), 'seatno':req.param('seatno')}, function(err, ticket){
      if(err) return next(err);
      if(!ticket) return res.send(404);
      res.send(JSON.stringify(ticket[0]));
    });
  }
];

function sendEmail(ticketsUpdated, user){
      console.log(ticketsUpdated);
      var body = "<h3>Please find your ticket details below<h3><br/>"
                    //+ "<b>" + ticketsUpdated[0].journey.name +  " - " + ticketsUpdated[0].journey.date  + "</b><table>"
      for(i=0;i<ticketsUpdated.length;i++){
            body += "<tr>\
                          <td>" + ticketsUpdated[i]["seatno"] + "</td>\
                          <td>" + ticketsUpdated[i]["passengername"] + "</td>\
                          <td>" + ticketsUpdated[i]["age"] + "</td></tr>"
                    }
      body += "</table><br/><br/><h2>Happy journey!</h2>";

      var mailOptions = {
            from: '"Popsy travels" <147popsy@gmail.com',
            to: user.local.email, //list of receivers
            subject: 'Your tickets are booked!',
            html: body
     }
     //send mail with the transport opject
     Mail.transporter.sendMail(mailOptions, function(err, info){
            if(err) return console.log(err);
            console.log('message sent : ' + info.response);
     });
}

module.exports = controller;
