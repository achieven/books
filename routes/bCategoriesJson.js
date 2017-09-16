var express = require('express');
var router = express.Router();
var BCategory = require("../models/booksCategory");


router.get('/',function(req,res)
{
	
	BCategory.find({}, function(err, cats) {
		if (err) throw err;
		console.log(cats);   
		res.json(cats);
		});

});

module.exports = router;