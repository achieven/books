
var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/targ5db');//myfirstdatabase
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');


var Schema = mongo.Schema;
var userSchema = new Schema({ // create a schema
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theType: String,
  firmId: String
});

var User = db.model('User', userSchema);

module.exports = User;
