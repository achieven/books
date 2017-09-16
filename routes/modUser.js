var express = require('express');
var router = express.Router();
var User = require("../models/user");
qs = require('querystring');

router.post('/', function(req,res)
{
	var success = false;
	 var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
				
				User.findOne({ username: POST.usrname }, function(err, user) {
  if (err) console.log(err);
			else 
			{
    				if (user === null) 
					{
						 res.json({
							successe: false
							});
						
					}
					else
					{
						success = true;
						user.name = POST.usr ;
						user.username = POST.usrname ;
						user.password = POST.password ;
						user.type = POST.type ;
						user.firmId = POST.firmId ;
						// save the user
						user.save(function(err) 
						{
						if (err) throw err;
						console.log('User successfully updated!');
							res.json({
							successe: true
								});
						});
					
					}
					
			}
											});

             
	
	});
});

module.exports = router;