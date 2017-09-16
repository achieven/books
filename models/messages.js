
var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');


var Schema = mongo.Schema;
var messageSchema = new Schema({ // create a schema
  id: String,
  room: String,
  payload: String,
  sender: String,
  likes: [String],
  unlikes: [String],
  date: Date
});

var Message = db.model('Message', messageSchema);
module.exports = Message;
