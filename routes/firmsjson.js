var express = require('express');
var router = express.Router();
var Firm = require("../models/firm");


router.get('/',function(req,res)
{
	
	Firm.find({}, function(err, firms) {
		if (err) throw err;
		console.log(firms);   // object of all the users
		res.json(firms);
		});

/*	var firms = [ { id : 1 , address : '95 רחוב הועד הלאומי' , city : 'ירושלים' , activity: 'yes' },
                  { id : 2 , address : '10 רחוב רוטשילד' , city : 'תל אביב' , activity:'no'  },
                  { id : 3 , address : '2 רחוב אייזנברג' , city : 'חיפה' , activity: 'yes' },
                  { id : 4 , address : '8 רחוב כיכר ספרה' , city : 'נתניה' , activity: 'yes' },
                  { id : 5 , address : '1 רחוב עטיה מלכה' , city : 'ראשון לציון' , activity: 'yes' }];*/
				  
});

module.exports = router;