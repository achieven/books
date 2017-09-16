'use strict';

const session           = require('express-session');
const MongoStore        = require('connect-mongo')(session);
var mongo = require("mongoose");
var connection = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');

exports.GetSessionOptions = function (IsSecure) {
    return {
        secret				: 'SEKR37',
        //	Forces session to be saved even when unmodified
        resave				: false,
        rolling             : true,
        //	Forces session to be saved even when unmodified
        saveUninitialized	: false,
        //	Controls result of unsetting req.session (through delete, setting to null)
        unset				: 'destroy',
        cookie: {
            path: '/',
            proxy: IsSecure,
            secure: IsSecure,
            httpOnly: true,
        },
        store: new MongoStore({
            mongooseConnection: connection,
            ttl: 12 * 60 * 60 //12 hours
        })
    };
};

exports.saveSessionUsername = function (Request, User) {
    Request.session.user = User;

    return true;
};

exports.saveSessionId = function (Request, Id) {
    Request.session._id = Id;

    return true;
};