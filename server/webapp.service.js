const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const _ = require('lodash');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// const jwt = require('jsonwebtoken');
const users= require('./users');


const jsonServer = require('json-server');
const jsonRouter = jsonServer.router(path.resolve(__dirname, '../webclient/data', 'users.json'));

var mongoose = require
('mongoose');
var configDB = require('./services/config/database.js');
var flash = require('connect-flash');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);
// passport
const passport = require('passport');
// const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./users/users.entity');
const configAuth = {

    googleAuth: {
        clientID: '212833991044-l102mt5bjeqtmqap3kj976me3km8jr5i.apps.googleusercontent.com',
        clientSecret: 'aHR-3D-AvSDgeU3ne8BjIz6q',
        callbackURL: '/auth/google/callback'
    }
};
//  used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
//  used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//  Google Strategy
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
}, function(token, refreshToken, profile, done) {
    // console.log(profile);
    process.nextTick(function() {
        User.findOne({
            email: profile.email
        }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            }
            var newUser = new User();
            newUser.username = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.profilePic = profile.photos[0].value;
            newUser.save(function(err) {
                if (err)
                    return done(err);
                return done(null, newUser);
            });

            return done(null, false);
        });
    });
}));
// passport end
//  Create App
const app = express();

//  const ExtractJwt = passportJWT.ExtractJwt;
//  const JwtStrategy = passportJWT.Strategy;

//   For logging each incoming requests
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//  const jwtOptions = {};
//  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
//  jwtOptions.secretOrKey = 'lucy';

app.use(session({secret: '7march2017', resave: true, saveUninitialized: true}));
//  defined a strategy for Passport JWT
//  const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
//    //  payload acknowledgement
//    console.log('payload received', jwtPayload);
//    //  database call
//    const user = users[_.findIndex(users, {id: jwtPayload.id})];
//    if (user) {
//      next(null, user);
//    } else {
//      next(null, false);
//    }
//  });

// passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const compression = require('compression');
app.use(compression());
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const webpackCompiler = webpack(webpackConfig);

//  setup middlewares
app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(webpackCompiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
function authorize(token) {}
app.use(express.static(path.resolve(__dirname, '../', 'webclient')));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../', 'webclient', 'assets', 'index.html', 'client'));
});
app.use('/users',users);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/Home');
});
// gmail authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#/UserHome',
    failureRedirect: '/#/Home'
}));
// gmail authentication end
// get user avatar
app.get('/Authenticate', isLoggedIn, function(req, res) {
  res.status(200).send();
});
app.get('/userAvatar', isLoggedIn, function(req, res) {
// console.log(req.user);
});
app.use(jsonRouter);

app.use(function(req, res) {
    let err = new Error('Resource not found');
    err.status = 404;
    return res.status(err.status).json({error: err.message});
});

app.use(function(err, req, res) {
    logger.error('Internal error in watch processor: ', err);
    return res.status(err.status || 500).json({error: err.message});
});
//  route middleware
function isLoggedIn(req, res, next) {
  // console.log('check log status');
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated() === true)
        return next();
    // console.log('false');
    res.status(201).send('');
    return 1;
}

module.exports = app;
