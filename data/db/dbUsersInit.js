

var User = require("./models/user");
// create a new user called David
var user = new User({
  name: 'David',
  username: 'dav',
  password: 'dav1',
  type: 'director',
  picture : ""
});


user.save(function(err) {
  if (err) throw err;
  console.log('User saved successfully!');
});




User({
  name: 'Benjamin',
  username: 'ben',
  password: 'ben1',
  type: 'employee',
  firmId : "1"
}).save(function(err) {
  if (err) throw err;
  console.log('User created!');
});

User.create({
  name: 'Yitsrak',
  username: 'yit',
  password: 'yit1',
  type: 'employee',
  firmId : "3"
}, function(err, user) {
  if (err) throw err;
  console.log('User created:' + user);
});


User({
  name: 'Moshe',
  username: 'mos',
  password: 'mos1',
  type: 'client',
  firmId : ""
}).save(function(err) {
  if (err) throw err;
  console.log('User created!');
});


User({
  name: 'Dan',
  username: 'dan',
  password: 'dan1',
  type: 'client',
  firmId : ""
}).save(function(err) {
  if (err) throw err;
  console.log('User created!');
});
