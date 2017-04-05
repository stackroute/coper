const conversation = require('../conversation');
const kafka = require('kafka-node');
const redis = require('redis');
const config = require('../../config/config');
const analysisFeeder = require('../analysisFeeder');
const log4js = require('log4js');
log4js.loadAppender('console');
//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('utteranceReceiver');

const processUtterance = function(userName, convStartTime, utteranceText) {
  if (!userName) {
    return;
  }
  logger.debug(userName);

  if (convStartTime === '' || !convStartTime) {
    let activity = 'SCRUM';
    //New conversation
    conversation
      .startNewConversation(userName, utteranceText, activity)
      .then(
        function(newConvObj) {
          const redisClient = redis.createClient();
          redisClient.publish('conversation::new::' + userName, JSON.stringify(newConvObj));

          //Post utterance to messaging pipeline for further analysis
          publishUtterance(newConvObj, utteranceText, publishUtteranceReceipt);
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

          //Post utterance to messaging pipeline for further analysis
          publishUtterance(convObj, utteranceText, publishUtteranceReceipt);
        },
        function(err) {
          logger.error('Error in creating new conversation ', err);
          return;
        });
  }
}

const publishUtterance = function(newConvObj, utteranceText, callback) {
  // let client = new kafka.Client(config.ZOOKEEPER.URL);
  // let producer = new kafka.Producer(client);
  //analysisFeeder.publishToAnalyse()
  // producer.on('ready', function() {
    let msgObj = {
        userName: newConvObj.userName,
        startTime: newConvObj.startTime,
        context: newConvObj.context,
        utterance: utteranceText
      }
      analysisFeeder.publishToAnalyze(config.KAFKA_TOPICS.UTTERANCES , msgObj , function(err, msgObj){
        console.log('Published utternace to ', config.KAFKA_TOPICS.UTTERANCES, ' with err: ', err, ' result: ', msgObj);
        });
       //return;
  //     // logger.debug('msgObj',msgObj);
  //   let payloads = [{ topic: config.KAFKA_TOPICS.UTTERANCES, messages: JSON.stringify(msgObj) }];
  //   logger.debug('payloads', payloads);
  //   producer.send(payloads, function(err, data) {
  //     if (err) {
  //       logger.error('Error in publishing new utterance ', payloads);
  //       return;
  //     }
  //     logger.debug('msgObjPublished utterance ', payloads);
  //     callback(newConvObj, utteranceText);
  //   });
  // });

  // producer.on('error', function(err) {
  //   if (err) {
  //     logger.error('Error in publishing new utterance ', err);
  //     return;
  //   }
  // });
}

const publishUtteranceReceipt = function(newConvObj, utteranceText) {
  const redisClient = redis.createClient();
  redisClient.publish('utterance::received::' + newConvObj.userName, JSON.stringify(utteranceText));
}

module.exports = {
  processUtterance: processUtterance
}
