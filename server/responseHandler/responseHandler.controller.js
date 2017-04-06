const log4js = require('log4js');
const redis = require('redis');
const config = require('../../config/config');

log4js.loadAppender('console');
const logger = log4js.getLogger('responseHandler');

const processActivityResponse = function(conversationObj, activityResponse, callback){
   logger.debug("Got request to process action response for : ", conversationObj, " with data ", activityResponse);

   let result = {
      conversation: conversationObj,
      activityResponse: activityResponse
   }

   let channelName = 'conversation::response::' + conversationObj.userName;
   logger.debug('Publishing response to redis channel ', channelName, ' data: ', result);

   const redisClient = redis.createClient();
   redisClient.publish(channelName, JSON.stringify(result));

   callback(null, result);
}


module.exports = {
	processActivityResponse : processActivityResponse
};