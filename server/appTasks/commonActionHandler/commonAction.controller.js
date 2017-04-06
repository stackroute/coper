const config = require('../../../config/config');
const log4js = require('log4js');
const logger = log4js.getLogger('commonAction');

const analyzeActivityAction = function(conversationObj, actionResult, callback) {
  logger.debug("Got request to process common action response for : ", conversationObj);
  logger.debug(" with data ", actionResult);

  let activityResponse = processActionForActivity(conversationObj, actionResult);

  let result = {
    conversation: conversationObj,
    actionResult: actionResult,
    activityResponse: activityResponse
  }

  logger.debug('Result of processing for actions: ', result);

  callback(null, result);
}

const processActionForActivity = function(conversationObj, actionResult) {
  let activityResponse = {};

  if (actionResult.activityTask === 'TAKS_INCOMPREHENSIBLE') {
    activityResponse = {
      purpose: 'ACITIVITY_RESPONSE',
      results: [{
        content: actionResult.activityNextAction.reply,
        contentType: 'shorttext'
      }, {
        content: actionResult.activityNextAction.reply,
        contentType: 'speech'
      }]
    };
  }

  return activityResponse;
}

module.exports = {
  analyzeActivityAction: analyzeActivityAction
};
