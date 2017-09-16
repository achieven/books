
var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');


var Schema = mongo.Schema;
var firmSchema = new Schema({ // create a schema
  id: String,
  address: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  activity: String,
});

var Firm = db.model('Firm', firmSchema);
module.exports = Firm;
