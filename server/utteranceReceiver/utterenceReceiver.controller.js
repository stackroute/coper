const conversation = require('../conversation');
const kafka = require('kafka-node');
const redis = require('redis');
const config = require('../../config/config');
const analysisFeeder = require('../analysisFeeder');
const log4js = require('log4js');
log4js.loadAppender('console');

//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('utteranceReceiver');

const processUtterance = function(userName, convStartTime, utteranceText,
  callback) {
  if (!userName) {
    logger.debug('username not available');
    return;
  }

  logger.debug('Processing utterance from ', userName, ' @ ', convStartTime,
    ' => [', utteranceText, ']');

  if (convStartTime === '' || !convStartTime) {
    let activity = 'SCRUM';
    //New conversation
    conversation
      .startNewConversation(userName, utteranceText, activity)
      .then(
        function(newConvObj) {
          logger.debug('Started new conversation for ', utteranceText);

          const redisClient = redis.createClient();
          redisClient.publish('conversation::new::' + userName, JSON.stringify(
            newConvObj));

          //Post utterance to messaging pipeline for further analysis
          publishUtterance(newConvObj, utteranceText,
            function(err, publishResult) {
              logger.debug('Published utterance to ', config.KAFKA_TOPICS.UTTERANCES,
                ' with err: ', err, ' result: ', publishResult);
              publishUtteranceReceipt(newConvObj, utteranceText);
              callback(newConvObj, utteranceText);
            });
        },
        function(err) {
          logger.error('Error in creating new conversation ', err);
          return;
        });
  } else {
    conversation.findUserConversation(userName, convStartTime)
      .then(
        function(convObj) {
          if (!convObj) {
            logger.error('Conversation object not found..!');
            return;
          }

          logger.debug('Attaching utterance ', utteranceText,
            ' to existing conversation ', convObj);
          //Post utterance to messaging pipeline for further analysis
          publishUtterance(convObj, utteranceText, function(err,
            publishResult) {
            logger.debug('Published utterance to ', config.KAFKA_TOPICS.UTTERANCES,
              ' with err: ', err, ' result: ', publishResult);
            publishUtteranceReceipt(convObj, utteranceText);
            callback(convObj, utteranceText);
          });
        },
        function(err) {
          logger.error('Error in creating lookup for existing conversation ',
            err);
          return;
        });
  }
}

const publishUtterance = function(convObj, utteranceText, callback) {
  let msgObj = {
    userName: convObj.userName,
    startTime: convObj.startTime,
    conversation: convObj,
    utterance: utteranceText
  }
  analysisFeeder.publishToAnalyze(config.KAFKA_TOPICS.UTTERANCES, msgObj,
    callback);
}

const publishUtteranceReceipt = function(convObj, utteranceText) {
  const redisClient = redis.createClient();
  logger.debug('lasdlfald');
  redisClient.publish('utterance::received::' + convObj.userName, JSON.stringify(
    utteranceText));
}

module.exports = {
  processUtterance: processUtterance
}
