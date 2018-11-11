var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  time:String,
  bus_type:String
});

var BusRouteSchema = new Schema({
  name:String,
  from:String,
  to:String,
  days:String,
  trips: [TripSchema]
});

mongoose.model('busroute', BusRouteSchema);
