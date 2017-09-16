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
               

		   User.findOne({ name: POST.usr , username: POST.usrname , password: POST.password , type: POST.type,firmId: POST.firmId },
		   function(err, user) {
			if(err) throw err;
			if (user === null) {
			console.log('User does not exist!');
			       res.json({
					successe: false
					});
			    
                    }
			else 				 
			{
			    success = true;			  
				user.remove(function(err) {
				if (err) console.log(err);
				else
				{   console.log('User successfully deleted!');
					res.json({
						successe: true
						});
				}
			
					});
			}
			
			});

        
				
	
	});
});


module.exports = router;