

var Flower = require("./models/flower");
var flower = new Flower({
  name: 'תלתן',
  color: 'כחול',
  picture: 'Tiltan.jpg',
  price: '30',
});


flower.save(function(err) {
  if (err) throw err;
  console.log('Flower saved successfully!');
});




Flower({
  name: 'מרונית',
  color: 'חום',
  picture: 'maronite.jpg',
  price: '15',
}).save(function(err) {
  if (err) throw err;
  console.log('Flower created!');
});

Flower.create({
  name: 'מציץ',
  color: 'אדום',
  picture: 'Matsitsphoto.JPG',
  price: '15',
}, function(err, Flower) {
  if (err) throw err;
  console.log('Flower created:' + Flower);
});


Flower({
  name: 'ארביס',
  color: 'ירוק',
  picture: 'Arabisphoto.jpg',
  price: '13',
}).save(function(err) {
  if (err) throw err;
  console.log('Flower created!');
});


Flower({
  name: 'ורד',
  color: 'ורוד',
  picture: 'Vered.JPG',
  price: '20',
}).save(function(err) {
  if (err) throw err;
  console.log('Flower created!');
});
