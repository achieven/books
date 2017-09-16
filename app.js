var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require("fs");
var session = require('express-session');
var SessionHelper = require('./middlwares/session-helper');



var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var home = require('./routes/home');
var users = require('./routes/users');
var firms = require('./routes/firms');
var books = require('./routes/books');
var sendmessage = require('./routes/sendmessage');
var connection = require('./routes/connexion');
var about = require('./routes/about');
var groups = require('./routes/groups');
var messages = require('./routes/messages');
var communication = require('./routes/communication');
var usersjson = require('./routes/usersjson');
var addUser = require('./routes/addUser');
var delUser = require('./routes/delUser');
var modUser = require('./routes/modUser');
var firmsjson = require('./routes/firmsjson');
var flowersjson = require('./routes/flowersjson');
var bCategoriesJson = require('./routes/bCategoriesJson');
var booksJson = require('./routes/booksJson');
var addFlower = require('./routes/addFlower');
var registering = require('./routes/registering');
var paiement = require('./routes/paiement');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));
app.use(cookieParser());*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(SessionHelper.GetSessionOptions()));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));


app.use('/', index);
app.use('/home', home);
app.use('/users', users);
app.use('/firms', firms);
app.use('/books', books);
app.use('/connection', connection);
app.use('/sendmessage', sendmessage);
app.use('/about', about);
app.use('/communication', communication);
app.use('/usersjson', usersjson);
app.use('/firmsjson', firmsjson);
app.use('/flowersjson', flowersjson);
app.use('/addUser', addUser);
app.use('/delUser', delUser);
app.use('/modUser', modUser);
app.use('/addFlower', addFlower);
app.use('/groups', groups);
app.use('/messages', messages);
app.use('/registering', registering);
app.use('/bCategoriesJson', bCategoriesJson);
app.use('/booksJson', booksJson);
app.use('/paiement', paiement);

var http = require('http');
var server = http.createServer(app);
server.listen(8002);
var IO = require('socket.io').listen(server);
app.IO = IO;

var chatServer = require('./chatServer')(app.IO);

var User = require("./models/user");


User.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);   // object of all the users
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(err, req, res, next) {
res.writeHead(200);
   req.on('data', function(stuff) {
     console.log(stuff.toString());
   });
   req.on('end', function(stuff) {
     res.end('Done');
   });

});
app.listen(8001, function (){
	
});

// Console will print the message
console.log('Server running at http://127.0.0.1:8001/');

module.exports = app;
