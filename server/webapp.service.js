const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./users');
const auth = require('./authentication');
const configJwt = require('../config/config.js');
const app = express();
const mongoose = require('mongoose');
const configDB = require('../config/config.js');

// setting secret variable for JWT encode and decode
app.set('superSecret', configJwt.JWT_AUTH.secret);
mongoose.Promise = global.Promise;
mongoose.connect(configDB.MONGO.url);

// using morgan for logging each incoming requests
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const compression = require('compression');
app.use(compression());

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const webpackCompiler = webpack(webpackConfig);

// setting up webpack developement middlewares
app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

// setting up webpack hot middlewares
app.use(webpackHotMiddleware(webpackCompiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
app.use(express.static(path.resolve(__dirname, '../', 'webclient')));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../', 'webclient', 'assets', 'index.html', 'client'));
});
app.use('/auth', auth);
app.use('/users', users);

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
