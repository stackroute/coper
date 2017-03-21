const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const users= require('./users');
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var config = require('./config');
var app = express();
app.set('superSecret', config.secret); // secret variable

var mongoose = require('mongoose');
var configDB = require('./services/config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

//   For logging each incoming requests
app.use(morgan('dev'));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
    console.log(profile);
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
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.google.avatar = profile.photos[0].value;
            console.log(token);
            newUser.save(function(err) {
                if (err)
                    return done(err);
                return done(null, newUser);
            });

            return done(null, false);
        });
    });
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',users);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/Home');
});
// gmail authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// app.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: '/#/UserHome',
//     failureRedirect: '/#/Home'
// }));
app.get( '/auth/google/callback',
        passport.authenticate('google', {
            //successRedirect: '/',
            failureRedirect: '/#/Home'
            , session: false
        }),
        function(req, res) {
            // console.log(req.user.google);
            //var token = jwt.encode(req.user);
            var token = jwt.sign(req.user.google, app.get('superSecret'), {
        });
            console.log(token);
            var decoded = jwtDecode(token);
            console.log(decoded);
            res.redirect("/#/UserHome?token=" + token);
        });

// gmail authentication end
// get user avatar
app.post('/Authenticate/:token', function(req, res) {
  try{
    console.log(req.params.token);
    if(req.params.token)
    res.status(200).send();
    else {
      res.status(500).send();
    }
  }catch(ex)
  {
    console.log(ex);
  }

});
app.get('/userAvatar', isLoggedIn, function(req, res) {
// console.log(req.user);
});

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
     if (req.isAuthenticated() === true)
         return next();
     res.status(201).send('');
     return 1;
}

module.exports = app;
