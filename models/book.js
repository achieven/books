
var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');


var Schema = mongo.Schema;
var bookSchema = new Schema({ // create a schema
  id: String,
  name: { type: String, required: true},
  author: { type: String, required: true},
  category: String,
  picture: String,
  price: String
});

var Book = db.model('Book', bookSchema);
module.exports = Book;
