const config = require('../../config/config.js');
const log4js = require('log4js');

log4js.loadAppender('console');
const logger = log4js.getLogger('actionHandler');

const analyzeActivityAction = function(conversationObj, actionResult, callback) {
  logger.debug("Got request to process common action response for : ", conversationObj);
  logger.debug(" with data ", actionResult);

  let activityResponse = processActionForActivity(conversationObj, actionResult);

  let result = {
    conversation: conversationObj,
    actionResult: actionResult,activityResponse: activityResponse

  }

  logger.debug('Result of processing for actions: ', result);

  callback(null, result);
}

const processActionForActivity = function(conversationObj, actionResult) {
  let activityResponse = {};

  logger.debug('Action results: ', actionResult);

  if (actionResult.activityTask === 'TAKS_INCOMPREHENSIBLE') {
    activityResponse = {
      purpose: 'ACTIVITY_RESPONSE',
      results: [{
        content: actionResult.activityNextAction.reply,
        contentType: 'shorttext'
      }, {
        content: actionResult.activityNextAction.reply,
        contentType: 'speech'
      }]
    };
  } else if (actionResult.activityTask === 'TASK_CREATE_PROJECT') {
      activityResponse = {
      purpose: 'ACTIVITY_RESPONSE',
      results: [{
        content: actionResult.activityNextAction.reply,
        contentType: 'shorttext'
      }, {
        content: actionResult.activityNextAction.reply,
        contentType: 'speech'
      }]
    };
  }

  logger.debug('Returning activity response ', activityResponse);

  return activityResponse;
}

module.exports = {
  analyzeActivityAction: analyzeActivityAction
}
