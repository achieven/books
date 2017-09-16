var express = require('express');
var router = express.Router();
var Flower = require("../models/flower");


router.get('/',function(req,res)
{
	// get all the flowers
	Flower.find({}, function(err, flowers) {
		if (err) throw err;
		console.log(flowers);   // object of all the flowers
		res.json(flowers);
		});
		

});

module.exports = router;