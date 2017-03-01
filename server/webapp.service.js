const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Create App
const app = express();

// setup Middlewares

//  For logging each incoming requests
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const compression = require('compression');
app.use(compression());

// Setup Web pack only for non-production environments (like Development, Load Testing etc.,)
if (config.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackConfig = require('../webpack.config.js');
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
}


// Setup Static Routes
app.use(express.static(path.resolve(__dirname, '../', 'webclient')));


// ******************************
//  MOUNT YOUR REST ROUTES HERE
// ******************************

//  Eg: app.use('/resource', require(path.join(__dirname, './module')));

app.get('/ping', (req, res) => {
  res.send('PONG');
});

// ******************************
// END OF MOUNTING REST ROUTES
// ******************************

// Catch all route
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
