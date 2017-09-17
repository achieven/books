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

router.get('/search/:RoomId',function(req,res)
{
    var matchQuery = {
        room: req.params.RoomId,
        payload: new RegExp(req.query.Payload),
        date: {
            $gte: (new Date(req.query.FromDate)).setHours(0,0,0),
            $lte: (new Date(req.query.ToDate)).setHours(23,59,59),
        }
    };
    Message.count(matchQuery).then(
        function (Result) {
            var skip = 0;
            var limit = 0;
            if ('false' === req.query.ShouldShowAllMessages) {
                limit = 20;
                if (Result > 20) {
                    skip = Result - 20;
                }
            }
            Message.find(matchQuery).skip(skip).limit(limit).then(
                function (Messages) {
                    res.send(Messages);
                }
            );
        }
    );

});



module.exports = router;