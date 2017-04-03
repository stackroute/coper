const socketIO = require('socket.io');
const ss = require('socket.io-stream');

const redis = require('redis');

const speechToTextProcessor = require('../speechToText');

const log4js = require('log4js');
log4js.loadAppender('console');
//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('wsService');

const utteranceReceiver = require('../utteranceReceiver');
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
        const userToken = '';
        clientSocket.on('send::userToken',function(uToken){
          userToken = uToken;
        })
        ss(clientSocket).on('stream::speech', function(stream) {
            stream.pipe(speechToTextProcessor.getSpeechRecognizeStream()).on('error', function(err) {
                //@TODO handle the error and communicate to client socket appropriately
                if (err) {
                    console.log(err);
                }
            }).on('data', function(data) {
                logger.debug(data.results);

                //@TODO On uttrance is complete, send the text to detect the intent and further processing

                if (data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED') {
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
        clientSocket.on('utterance',function(message){
          logger.debug('utterance : ',message);
          utteranceReceiver.processUtterance(message);
        });
        clientSocket.on('disconnect', function() {
            logger.debug('[*] Client socket disconnected ...!');
        });
        const redisClient = redis.createClient();
        redisClient.on('ready', function(){
          redisClient.subscribe('conversation::new::'+userToken);
        });
        redisClient.on('message',function(channel,message) {
          if(channel === 'conversation::new::'+userToken)
          {
            logger.debug(message);
            clientSocket.emit('conversation::start',message);
          }
        })
    });
}

module.exports = wsService;
