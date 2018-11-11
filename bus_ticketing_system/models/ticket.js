var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var JourneySchema = new Schema({
  name:String,
  from:String,
  to:String,
  date:Date,
  time:String,
  bus_type:String
});

var TicketSchema = new Schema({
  seatno: Number,
  passengername: String,
  age: Number,
  reserved: Boolean,
  journey: JourneySchema,
  user: [User.schema]
});

mongoose.model('ticket', TicketSchema);
mongoose.model('journey', JourneySchema);
