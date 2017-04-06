const log4js = require('log4js');
const config = require('../../config/config.js');

log4js.loadAppender('console');
const logger = log4js.getLogger('utteranceReceiver');

//Get the input from the intents topic
//some more data analysis we might have to do
//resolve to a specific Task, by considering the intent, results of intent analys,
//Publish a message to Task's topic, with the necessary data (forward data from intents topics)
//If the tasks's topic does not exist, create it dynamically (kafka api call)

let commonActivityIntent = {
  map: {
    DEFAULT: 'TASK_INCOMPREHENSIBLE'
  },
  topic: config.KAFKA_TOPICS.COMMON
};

let scrumActivityIntent = {
  map: {
    DEFAULT: 'TASK_INCOMPREHENSIBLE',
    'create-project': 'TASK_CREATE_PROJECT'
  },
  topic: config.KAFKA_TOPICS.SCRUM
};

const processForAction = function(conversationObj, intentResult, callback) {
  logger.debug("Got request to analyze actions for : ", conversationObj, " with data ", JSON.stringify(intentResult));

  let actionResult = processActionForActionTopic(conversationObj, intentResult);

  let result = {
    conversation: conversationObj,
    intentResult: intentResult,
    actionResult: actionResult
  }

  logger.debug('Result of processing for actions: ', result);
  callback(null, result);
}

const processActionForActionTopic = function(conversationObj, intentResult) {
  let activityTopic = '';
  let activityTask = '';

  let activityType = intentResult.activity;
  let activityFound = intentResult.found;
  let activityIntent = intentResult.intent;
  let activityIntentStatus = intentResult.intention.status;
  let activityNextAction = intentResult.intention.nextAction;

  if (!activityFound) {
    // Activity is unidentified
    activityType = 'COMMON';
  }

  //Fetch the activity specific action resolver
  if (activityType == 'COMMON') {
    activityTopic = commonActivityIntent.topic;

    if (activityNextAction.intent) {
      activityTask = commonActivityIntent.map[activityNextAction.intent];
      if (!activityTask)
        activityTask = commonActivityIntent.map['DEFAULT'];
    } else {
      activityTask = commonActivityIntent.map['DEFAULT'];
    }

  } else if (activityType == 'SCRUM') {
    activityTopic = scrumActivityIntent.topic;

    if (activityNextAction.intent) {
      activityTask = scrumActivityIntent.map[activityNextAction.intent];
      if (!activityTask)
        activityTask = scrumActivityIntent.map['DEFAULT'];
    } else {
      activityTask = scrumActivityIntent.map['DEFAULT'];
    }
  }

  return {
    activityTopic: activityTopic,
    activityTask: activityTask,
    activityType: activityType,
    activityFound: activityFound,
    activityIntent: activityIntent,
    activityIntentStatus: activityIntentStatus,
    activityNextAction: activityNextAction,
    intentResult: intentResult
  }
}

module.exports = {
  processForAction: processForAction
};
