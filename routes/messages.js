var express = require('express');
var router = express.Router();
var Message = require("../models/messages");

router.get('/',function(req,res)
{
    Message.find({}).then(
        function (Messages) {
            res.send(Messages);
        }
    )
});

router.get('/:RoomId',function(req,res)
{
    Message.count({room: req.params.RoomId}).then(
        function (Result) {
            var skip = Result > 20 ? Result - 20 : 0;
            Message.find({room: req.params.RoomId}).skip(skip).limit(20).then(
                function (Messages) {
                    res.send(Messages);
                }
            );
        }
    );

});



module.exports = router;