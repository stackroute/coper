const conversation = require('../conversation/conversation.controller')
const kafka = require('kafka-node');
const redis = require('redis');
const config = require('../../config/config');

const log4js = require('log4js');
log4js.loadAppender('console');
//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('utteranceReceiver');

const processUtterance = function(userName, convStartTime, utteranceText) {
    if (!userName) {
        return;
    }

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
                    publishUtterance(userName, newConvObj, utteranceText, publishUtteranceReceipt);
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
                    publishUtterance(userName, newConvObj, utteranceText, publishUtteranceReceipt);
                },
                function(err) {
                    logger.error('Error in creating new conversation ', err);
                    return;
                });
    }
}

const publishUtterance = function(userName, newConvObj, utteranceText, callback) {
    let client = new kafka.Client(config.KAFKA_HOST);
    let producer = new kafka.Producer(client);

    producer.on('ready', function() {
        let msgObj = {
            userName: newConvObj.userName,
            startTime: newConvObj.startTime,
            context: newConvObj.context,
            utterance: utteranceText
        }

        let payloads = [{ topic: config.KAFKA_TOPICS.UTTERANCES, messages: msgObj }];

        producer.send(payloads, function(err, data) {
            if (err) {
                logger.error('Error in publishing new utterance ', payloads);
                return;
            }

            callback(userName, newConvObj, utteranceText);
        });
    });

    producer.on('error', function(err) {
        if (err) {
            logger.error('Error in publishing new utterance ', payloads);
            return;
        }
    });
}

const publishUtteranceReceipt = function(userName, newConvObj, utteranceText) {
    const redisClient = redis.createClient();
    redisClient.publish('utterance::received::' + userName, JSON.stringify({utteranceTime: new Date().toUTCString()}));
}

module.exports = {
    processUtterance: processUtterance
}
