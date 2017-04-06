const log4js = require('log4js');
const config = require('../../config/config.js');

log4js.loadAppender('console');
const logger = log4js.getLogger('utteranceReceiver');

//Get the input from the intents topic
//some more data analysis we might have to do
//resolve to a specific Task, by considering the intent, results of intent analys,
//Publish a message to Task's topic, with the necessary data (forward data from intents topics)
//If the tasks's topic does not exist, create it dynamically (kafka api call)
// const config = require(../../config/config)

const processForAction = function(conversationObj, intentResult, callback){
   logger.debug("Got request to analyze actions for : ", conversationObj, " with data ", intentResult);

   let actionResult = processActionForActionTopic(conversationObj, intentResult);

   let result = {
      conversation: conversationObj,
      intentResult: intentResult,
      actionResult: actionResult
   }
   callback(null, result);
}

const processActionForActionTopic = function(conversationObj, intentResult) {
   return {activityTopic : config.KAFKA_TOPICS.SCRUM};
}

module.exports = {
	processForAction : processForAction
};