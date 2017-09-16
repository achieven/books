var express = require('express');
var router = express.Router();
var Flower = require("../models/flower");
var multer  = require('multer');
qs = require('querystring');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
 
router.post('/',upload.any(), function (req, res, next) {
	
	if (typeof (req.body.name != "undefined") && typeof (req.body.price != "undefined")  && typeof (req.body.color != "undefined")  && typeof (req.files[0].filename != "undefined") )
	{
		Flower.create({
					name: req.body.name,
					color: req.body.color ,
					picture : req.files[0].filename,
					price: req.body.price
					}, function(err, flower) {
					if (err) throw err;
					console.log('Flower created:' + flower);
					success = true;
					});
			
			
		console.log(req.files[0].filename);
        console.log(req.body.name);		
	}
	else 
	 res.render ("error");
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  res.render ('flowers');
});

module.exports = router;