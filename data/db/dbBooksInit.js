
var Book = require("./models/Book");

Book({
  id: '1',
  name: "נתיבות עולם",
  author: "המהר&quot;ל מפראג",
  category: "אמונה",
  picture: "netivotOlam.jpg",
  price: "60",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});


Book({
  id: '2',
  name: "דרך חיים",
  author: "מהר &quotל מפראג",
  category: "אמונה",
  picture: "derehHaim.jpg",
  price: "60",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});

Book({
  id: '3',
  name: "נצח ישראל",
  author: "מהר &quotל מפראג",
  category: "אמונה",
  picture: "netsarYisrael.jpg",
  price: "60",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});


Book({
  id: '4',
  name: "תפארת ישראל",
  author: "מהר &quotל מפראג",
  category: "אמונה",
  picture: "tiferetYisrael.jpg",
  price: "60",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});

Book({
  id: '5',
  name: "באר הגולה",
  author: "מהר &quotל מפראג",
  category: "אמונה",
  picture: "beerHagola.jpg",
  price: "60",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});


Book({
  id: '6',
  name: "שמירת הלשון",
  author: "חפץ חיים",
  category: "מוסר",
  picture: "chmiratHalachone.jpg",
  price: "50",
}).save(function(err) {
  if (err) throw err;
  console.log('Book created!');
});