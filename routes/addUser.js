var express = require('express');
var router = express.Router();
var User = require("../models/user");
var sessionHelper = require('../middlwares/session-helper');

qs = require('querystring');

router.post('/', function(req,res)
{
	var user = new User(
		{
			name: req.body.name,
			username: req.body.username,
			password: req.body.password,
			email: req.body.password,
			type: req.body.type,
			picture: 'hello world'
		}
	)
	user.save().then(
		function (User) {
			res.send('1');
		}
	).catch(
		function (Err) {
			var a = 0
		}
	)
});


module.exports = router;