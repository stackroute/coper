const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const jsonRouter = jsonServer.router(path.resolve(__dirname, '../webclient/data','users.json'));
const passport = require("passport");
const passportJWT = require("passport-jwt");

// Create App
const app = express();
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
// setup Middlewares

//  For logging each incoming requests
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'lucy';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

 var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(passport.initialize());

const compression = require('compression');
app.use(compression());

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config.js');
const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(webpackCompiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));
function authorize(token)
{

}
app.use(express.static(path.resolve(__dirname, '../', 'webclient')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../', 'webclient', 'assets',
    'index.html', 'client'));
});



app.post('/auth', function(req, res){
  console.log(req.body.token.token);
  var userToken= jwt.verify(req.body.token.token,'lucy') ;
  console.log(userToken);
  var user=[{username: 'abc',password: '123'}];
  if(user.length === 0)
  {
    res.status(401).json({message:"no such user found"});
    return;
  }
  if(userToken.password === user[0].password)
  {
    res.status(200).json({message:"ok",user:{username: userToken.username}});
    return;
  }
  res.status(401).json({message:"no such user found"});
});

app.post("/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  var user = {username: 'abc',password: '123'};
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

 if(user.password === req.body.password) {
    var payload = {password: user.password, username:req.body.username};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.status(200).json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

app.use(jsonRouter);

app.use(function(req, res) {
  let err = new Error('Resource not found');
  err.status = 404;
  return res.status(err.status).json({
    error: err.message
  });
});

app.use(function(err, req, res) {
  logger.error('Internal error in watch processor: ', err);
  return res.status(err.status || 500).json({
    error: err.message
  });
});


module.exports = app;
const server = http.createServer();
server.listen(3000);
