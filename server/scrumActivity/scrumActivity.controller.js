const config = require('../../config/config.js');
const log4js = require('log4js');
const taigaTaskCtrl = require('../appTasks/taigaTasks');

log4js.loadAppender('console');
const logger = log4js.getLogger('actionHandler');

let SCRUM_ACTION_CONSTS = {
  TASK_INCOMPREHENSIBLE: 'TASK_INCOMPREHENSIBLE',
  TASK_CREATE_PROJECT: 'TASK_CREATE_PROJECT',
  TASK_CREATE_SPRINT: 'TASK_CREATE_SPRINT',
  TASK_CREATE_STORY: 'TASK_CREATE_STORY',
  TASK_WISH: 'TASK_WISH',
  TASK_INTRODUCTION: 'TASK_INTRODUCTION',
  TASK_FUNCTIONALITY: 'TASK_FUNCTIONALITY'
};

const analyzeActivityAction = function(conversationObj, actionResult, callback) {
  logger.debug("Got request to process common action response for : ", conversationObj);
  logger.debug(" with data ", actionResult);

  processActionForActivity(conversationObj, actionResult, function(err, activityResponse) {
    let result = {
      conversation: conversationObj,
      actionResult: actionResult,
      activityResponse: activityResponse

    }

    logger.debug('Result of processing for actions: ', result);

    callback(null, result);
  });
}

const processActionForActivity = function(conversationObj, actionResult, callback) {
  logger.debug('Got ', actionResult.activityTask, ' Action results: ', actionResult);

  if(actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_INCOMPREHENSIBLE) {
    logger.debug('Processing task ', SCRUM_ACTION_CONSTS.TASK_INCOMPREHENSIBLE);

    let activityResponse = {
          purpose: 'ACTIVITY_RESPONSE',
          content: actionResult.activityNextAction.reply,
          contentType: 'shorttext',
          speech: actionResult.activityNextAction.reply,
        };
        callback(null, activityResponse);
  } else if (actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_CREATE_PROJECT) {
    logger.debug('Processing task ', SCRUM_ACTION_CONSTS.TASK_CREATE_PROJECT);
    //check status
    if (actionResult.activityIntentStatus == 'complete') {
      logger.debug('Processing create project task');

      //Have to execute a task
      //Here call taiga task controller for the specific task
      let projectName = actionResult.intentResult.intention.entities['projectname'].value.value;
      let members = actionResult.intentResult.intention.entities['membersname'].value.value;

      //Split members name with and, or comma whatever the way it is captured

      taigaTaskCtrl.createNewProject({name: projectName, members: [members]}, function(err, result) {
        logger.debug('Got result from taiga for project create ', result);
        let activityResponse = {
          purpose: 'ACTIVITY_RESPONSE',
          content: actionResult.activityNextAction.reply,
          contentType: 'shorttext',
          speech: actionResult.activityNextAction.reply,
          taskResult: result
        };
        callback(null, activityResponse);
      })

    } else {
      let activityResponse = {
        purpose: 'ACTIVITY_RESPONSE',
        content: actionResult.activityNextAction.reply,
        contentType: 'shorttext',
        speech: actionResult.activityNextAction.reply
      };
      callback(null, activityResponse);
    }

  } else if (actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_CREATE_SPRINT) {
    //check status
    logger.debug('Processing task ', SCRUM_ACTION_CONSTS.TASK_CREATE_SPRINT);

    if (actionResult.activityIntentStatus == 'complete' && actionResult.intentResult.intention.intent == 'create-project') {
      logger.debug('Processing create project task ', JSON.stringify(actionResult));

      //Have to execute a task
      //Here call taiga task controller for the specific task
      let projectName = actionResult.intentResult.intention.entities.find((entity) => {
        return (entity.name == 'projectname')
      }).value.value;
      let members = actionResult.intentResult.intention.entities.find((entity) => {
        return (entity.name == 'membersname')
      }).value.value;
      let payload = {name: projectName, members: [members]};
      logger.debug('Project create payload ', payload);

      //Split members name with and, or comma whatever the way it is captured

      taigaTaskCtrl.createNewProject(payload, function(err, result) {
        logger.debug('Got result from taiga for project create ', result);
        let activityResponse = {
          purpose: 'ACTIVITY_RESPONSE',
          content: actionResult.activityNextAction.reply,
          contentType: 'shorttext',
          speech: actionResult.activityNextAction.reply,
          taskResult: result
        };
        callback(null, activityResponse);
      }).intent == 'create-project'

    } else {
      let activityResponse = {
        purpose: 'ACTIVITY_RESPONSE',
        content: actionResult.activityNextAction.reply,
        contentType: 'shorttext',
        speech: actionResult.activityNextAction.reply
      };
      callback(null, activityResponse);
    }

  } else if (actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_CREATE_STORY) {
    //check status
    logger.debug('Processing task ', SCRUM_ACTION_CONSTS.TASK_CREATE_STORY);
    let activityResponse = {
      purpose: 'ACTIVITY_RESPONSE',
      content: actionResult.activityNextAction.reply,
      contentType: 'shorttext',
      speech: actionResult.activityNextAction.reply
    };

    callback(null, activityResponse);

  } else if (actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_WISH || actionResult.activityTask === SCRUM_ACTION_CONSTS.TASK_FUNCTIONALITY) {
    //check status
    logger.debug('Processing task ', SCRUM_ACTION_CONSTS.TASK_WISH, ' or ', SCRUM_ACTION_CONSTS.TASK_FUNCTIONALITY);
    let activityResponse = {
      purpose: 'ACTIVITY_RESPONSE',
      content: actionResult.activityNextAction.reply,
      contentType: 'shorttext',
      speech: actionResult.activityNextAction.reply
    };

    callback(null, activityResponse);
  } else {
    logger.debug('Processing task ', TASK_INCOMPREHENSIBLE);

    let activityResponse = {
      purpose: 'ACTIVITY_RESPONSE',
      content: actionResult.activityNextAction.reply,
      contentType: 'shorttext',
      speech: actionResult.activityNextAction.reply
    };

    callback(null, activityResponse);
  }
}

module.exports = {
  analyzeActivityAction: analyzeActivityAction
}
