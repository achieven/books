

var Firm = require("./models/firm");
// create a new user called David
var firm = new Firm({
  id: '1',
  address: '95 רחוב הועד הלאומי',
  city: 'ירושלים',
  activity: 'yes',
});


firm.save(function(err) {
  if (err) throw err;
  console.log('Firm saved successfully!');
});




Firm({
  id: '2',
  address: '10 רחוב רוטשילד',
  city: 'תל אביב',
  activity: 'no',
}).save(function(err) {
  if (err) throw err;
  console.log('Firm created!');
});

Firm.create({
  id: '3',
  address: '2 רחוב אייזנברג',
  city: 'חיפה',
  activity: 'yes',
}, function(err, firm) {
  if (err) throw err;
  console.log('Firm created:' + firm);
});


Firm({
  id: '4',
  address: '8 רחוב כיכר ספרה',
  city: 'נתניה',
  activity: 'yes',
}).save(function(err) {
  if (err) throw err;
  console.log('Firm created!');
});


Firm({
  id: '5',
  address: '1 רחוב עטיה מלכה',
  city: 'ראשון לציון',
  activity: 'yes',
}).save(function(err) {
  if (err) throw err;
  console.log('Firm created!');
});
