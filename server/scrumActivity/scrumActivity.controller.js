const config = require('../../config/config.js');
const log4js = require('log4js');

log4js.loadAppender('console');
const logger = log4js.getLogger('actionHandler');

const analyzeActivityAction = function(conversationObj, actionResult, callback) {
  logger.debug("Got request to analyze actions for : ", conversationObj, " with data ", actionResult);

  let activityResponse = processActionForActivity(conversationObj, actionResult);

   let result = {
      conversation: conversationObj,
      actionResult: actionResult,
      activityResponse: activityResponse
   }
   callback(null, result);
}

const processActionForActivity = function(conversationObj, actionResult) {
  return {
    response: 'Project Lucy Created'
  }
}


module.exports = {
  analyzeActivityAction: analyzeActivityAction
}