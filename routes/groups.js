var express = require('express');
var router = express.Router();
var Group = require("../models/groups");


router.get('/',function(req,res)
{
    res.render('groups');
});

router.get('/getGroups',function(req,res)
{
    return Group.find({}).then(
        function (Response) {
            res.send(Response);
        }
    )
});

router.post('/addNewGroup/:GroupName/:Admin',function(req,res)
{
    var newGroup = new Group(
        {
            name: req.params.GroupName,
            admin: req.params.Admin
        }
    );
    return newGroup.save().then(
        function (Response) {
            return res.send(Response);
        }
    );
});



module.exports = router;