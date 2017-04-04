const redis = require('redis');

const log4js = require('log4js');
log4js.loadAppender('console');
//log4js.addAppender(log4js.appenders.file('./logs/binaryjs.log'), 'binaryServer');
const logger = log4js.getLogger('utteranceReceiver');

const redisClient = redis.createClient();

const processUtterance = function(data) {
    if (data.conversation.startTime === '') {
        const date = new Date();
        data.conversation.startTime = date.toUTCString();
        redisClient.publish('conversation::new::' + data.conversation.userToken, JSON.stringify(data.conversation));
        console.log('data', data);
        //TODO release data on kafka pipeline
    } else {
        //TODO release data on kafka pipeline
    }
}

module.exports = {
    processUtterance: processUtterance
}
