var express = require('express');
var router = express.Router();
var Book = require("../models/book");


router.get('/',function(req,res)
{
	
	Book.find({}, function(err, books) {
		if (err) throw err;
		console.log(books);   
		res.json(books);
		});

});

module.exports = router;