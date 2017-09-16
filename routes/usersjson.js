var express = require('express');
var router = express.Router();
var User = require("../models/user");


router.get('/',function(req,res)
{
	// get all the users
	User.find({}, function(err, users) {
		if (err) throw err;
		console.log(users);   // object of all the users
		res.json(users);
		});

});

module.exports = router;