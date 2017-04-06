const socketIO = require('socket.io');
const ss = require('socket.io-stream');

const redis = require('redis');

const log4js = require('log4js');
log4js.loadAppender('console');
//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('wsService');

const utteranceReceiver = require('../utteranceReceiver');
const speechToTextProcessor = require('../speechToText');
const textToSpeech = require('../textToSpeech');
const authController = require('../authentication/authentication.controller');
const config = require('../../config/config').REDIS_CLIENT;

const redisClient = redis.createClient(config.REDIS_CLIENT);

const wsService = function(server) {

  const wsServer = socketIO(server);

  wsServer.on('connection', function(clientSocket) {
    console.log('[*] Got new client socket connection ');
    // PING is the event name
    clientSocket.on('PING', function(message) {
      console.log('received: %s', message);

      let now = new Date();

      // PONG is the event name
      clientSocket.emit('PONG', 'pong ping');
    });
    let username = '';
    clientSocket.on('send::userToken', function(uToken) {
      userToken = authController.authenticatePage(uToken).then(
        function(user) {
          username = user.username;
          redisClient.subscribe('conversation::new::' + user.username);
          redisClient.subscribe('conversation::response::' + username);
        },
        function(err) {
          logger.error(err);
        });

    })

    ss(clientSocket).on('stream::speech', function(stream) {
      stream.pipe(speechToTextProcessor.getSpeechRecognizeStream()).on(
        'error',
        function(err) {
          //@TODO handle the error and communicate to client socket appropriately
          if (err) {
            console.log(err);
          }
        }).on('data', function(data) {
        logger.debug(data.results);

        //@TODO On uttrance is complete, send the text to detect the intent and further processing

        if (data.endpointerType ===
          'ENDPOINTER_EVENT_UNSPECIFIED') {
          clientSocket.emit('send::text', data.results);
        }
      }).on('close', function() {
        logger.debug('pipe close');
      }).on('end', function() {
        logger.debug('pipe end');
      });
      stream.on('data', function(data) {
        //logger.debug(data);
      });
      stream.on('end', function() {
        logger.debug('streaming end');
      });
    });
    clientSocket.on('utterance::new', function(message) {
      logger.debug('utterance : ', message);
      utteranceReceiver.processUtterance(username, message.conversation
        .startTime, message.utterance,
        function(newConvObj, utteranceText) {
          logger.debug('Conversation for [', utteranceText,
            '] registered ', newConvObj, utteranceText);
        });
    });
    clientSocket.on('disconnect', function() {
      logger.debug('[*] Client socket disconnected ...!');
    });

    redisClient.on('ready', function() {
      logger.debug('ready');

    });

    const speechStream = ss.createStream();
    ss(clientSocket).emit('stream::textToSpeech', speechStream);

    redisClient.on('message', function(channel, message) {

      if (channel === 'conversation::new::' + username) {
        logger.debug(message);
        clientSocket.emit('conversation::start', JSON.parse(message));
      } else if (channel === 'utterance::received::' + username) {
        logger.debug('conversation::received::');
        clientSocket.emit('utterance::received', JSON.parse(message));
      } else if (channel === 'conversation::response::' + username) {
        logger.debug("Got message from channel " + channel + ": " + message);
        clientSocket.emit('conversation::response', JSON.parse(message));
      }
    });
  });
}

module.exports = wsService;
