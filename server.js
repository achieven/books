// reference the http module so we can create a webserver
//var http = require("http");


var express = require("express");
var recievedmessage = " ";
var nameSender = " ";
var emailSender = " ";

var app = express();
qs = require('querystring');




var users = [ { name : 'David' , username : 'dav' , password : 'dav1' , type: 'director' , firmId : ""},
                  { name : 'Benjamin' , username : 'ben' , password : 'ben1' , type: 'employee', firmId : "1"},
                  { name : 'Yitsrak' , username : 'yit' , password : 'yit1' , type: 'employee', firmId : "3" },
                  { name : 'Moshe' , username : 'mos' , password : 'mos1' , type: 'client', firmId : ""},
                  { name : 'Dan' , username : 'dan' , password : 'dan1' , type: 'client' , firmId : ""}];
				  
app.set('view engine','ejs');

app.use( express.static( "public" ) );

app.get('/',function(req,res)
{
    res.render('index');
});

app.get('/about',function(req,res)
{
    res.render('about');
});

app.post('/connection', function(req,res)
{
	var success = false;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                
            
			
	//var testons = 'dav';
	//var testp = "dav1"
	
	users.forEach(function(user) { 
	  if( Object.is(user.username,POST.user) && Object.is(user.password ,POST.pwd) )
	  {
		res.json({
		authsuccess: true,
		name: user.name,
		type: user.type
		 });
		success = true;
	  }
	  
	});
	
	if(!success)
	{res.json({
		authsuccess: false
		});
	}
	});
});

app.post('/addUser', function(req,res)
{
	var success = false;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                
           
				users.push({ name : POST.usr , username : POST.usrname , password : POST.password, type: POST.type , firmId : POST.firmId });
				success = true;
	
	if(success)
	{res.json({
		successe: true
		});
	}
	
	});
});

app.post('/delUser', function(req,res)
{
	var success = false;
	var index = -1;
	var i = 0;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                
           users.forEach(function(user) { 
	  if( Object.is(user.name,POST.usr) && Object.is(user.password ,POST.password) && Object.is(user.type ,POST.type) && Object.is(user.username ,POST.usrname) && Object.is(user.firmId ,POST.firmId) )
	  {
		success = true;
		index = i;
	  }
	  i++;
	  
	});
	          if(success)
			  {
				  users.splice(index, 1); 
				res.json({
					successe: true
						});
			  }
			else 
			{
			  res.json({
					successe: false
						});
			}
	
	
	});
});

app.post('/modUser', function(req,res)
{
	var success = false;
	var index = -1;
	var i = 0;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                
                      users.forEach(function(user) { 
	  if(Object.is(user.username ,POST.usrname))
	  {
		success = true;
		index = i;
	  }
	  i++;
	  
	});
	
	if(success)
			  {
				  users.splice(index, 1); 
				  users.push({ name : POST.usr , username : POST.usrname , password : POST.password, type: POST.type , firmId : POST.firmId });
				res.json({
					successe: true
						});
			  }
			else 
			{
			  res.json({
					successe: false
						});
			}
	
	});
});


app.post('/sendmessage', function(req,res)
{
	var success = false;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                
        nameSender = POST.name;
		emailSender = POST.mail;
		messageSender = POST.message;
		success = true;
			
	
	if(success)
	{res.json({
		successe: true
		});
	}
	else 
	{
		res.json({
		successe: false
		});
	}
	});
});

app.get('/usersjson',function(req,res)
{
				  
    res.json(users);
});

app.get('/users',function(req,res)
{
    res.render('users');
});

app.get('/flowers',function(req,res)
{
    res.render('flowers');
});

app.get('/flowersjson',function(req,res)
{
	var flowers = [ { name : 'תלתן' , color : 'כחול' , picture : 'Tiltan.jpg' , price: 30 },
                  { name : 'מרונית' , color : 'חום' , picture : 'maronite.jpg' , price: 15  },
                  { name : 'מציץ' , color : 'אדום' , picture : 'Matsitsphoto.JPG' , price: 15},
                  { name : 'ארביס' , color : 'ירוק' , picture : 'Arabisphoto.jpg' , price: 13 },
                  { name : 'ורד' , color : 'ורוד' , picture : 'Vered.JPG' , price: 20 }];
   res.json(flowers);
});

app.get('/communication',function(req,res)
{
    res.render('communication');
});

app.get('/firmsjson',function(req,res)
{
	var firms = [ { id : 1 , address : '95 רחוב הועד הלאומי' , city : 'ירושלים' , activity: 'yes' },
                  { id : 2 , address : '10 רחוב רוטשילד ' , city : 'תל אביב' , activity:'no'  },
                  { id : 3 , address : '2 רחוב אייזנברג' , city : 'חיפה' , activity: 'yes' },
                  { id : 4 , address : '8 רחוב כיכר ספרה' , city : 'נתניה' , activity: 'yes' },
                  { id : 5 , address : '1 רחוב עטיה מלכה' , city : 'ראשון לציון' , activity: 'yes' }];
				  
	//var names = [];
  //drinks.forEach(function(drink) { names.push(drink.name) });
  //res.json(names);
    res.json(firms);
});

app.get('/firms',function(req,res)
{
    res.render('firms');
});

app.listen(8001, function () {

    console.log('Example app listening on port 8001!');

});

// Console will print the message
console.log('Server running at http://127.0.0.1:8001/');