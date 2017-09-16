var express = require('express');
var router = express.Router();
var User = require("../models/user");
qs = require('querystring');
var sessionHelper = require('../middlwares/session-helper');


router.post('/', function(req,res)
{
	var success = true ;
	User.findOne({ username: req.body.user , password: req.body.pwd }, function(err, user) {
		    if (err) throw err;
			else
			{
				
			  if(user === null)
			  {
			    res.json({
				authsuccess: false
						})
						
						success = false ;
			  }
			  
			 if(success)
			 {
				 sessionHelper.saveSessionId(req, user._id);
				 sessionHelper.saveSessionUsername(req, user.username);
				 res.json({
					 authsuccess: true,
					 name: user.name,
					 username: user.username,
					 type: user.type,
					 _id: user._id
				 });
		success = true;	 
		console.log(user);
			 }		// object of the user
			}
		});
});

module.exports = router;