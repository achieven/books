var User = require("./models/user");

// get all the users
User.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);   // object of all the users
});
