var express = require('express');
var router = express.Router();
var messageSender = " ";
var nameSender = " ";
var emailSender = " ";

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


module.exports = router;
