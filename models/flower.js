
var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');


var Schema = mongo.Schema;
var flowerSchema = new Schema({ // create a schema
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true},
  picture: String,
  price: String
});

var Flower = db.model('Flower', flowerSchema);
module.exports = Flower;
