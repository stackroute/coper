const recastConfig = require('../../config/config.js');
const superAgent = require('superagent');

const analyzeIntent = function(conversationObj, utteranceText, callback) {
  let start = new Date();
  requestRecast(utteranceText, function(err, res) {
    console.log('Recast result: ', JSON.stringify(res.body));

    let errors = [];
    if (err) {
      errors.push(err);
    };

    let result = {
      result: parseRecastResponse(conversationObj, res.body.results),
      "conversation": conversationObj,
      "start": start,
      "end": new Date(),
      "errors": errors
    }

    callback(err, result);
  });
}

const requestRecast = function(utteranceText, callback) {
  console.log('Got utterance ', utteranceText, ' for analysis');
  // let recastBaseURL = config.RECASTAI_API_BASE_URL;
  // let authToken = config.recast.authToken;

  let authToken = recastConfig.RECAST.token;
  let recastBaseURL = 'https://api.recast.ai/v2';

  superAgent
    .post((recastBaseURL + '/converse'))
    .send({
      text: utteranceText,
      language: 'en'
    })
    .set('Authorization', authToken)
    .end(callback);
}

// Parses, recast.ai response to the required format of Lucy
const parseRecastResponse = function(conversationObj, recastAnalysisResult) {

  let parsedResponse = {};

  parsedResponse.utterance = recastAnalysisResult.source;
  parsedResponse.activity = conversationObj.context.activity;
  parsedResponse.language = recastAnalysisResult.language;

  parsedResponse.found = (recastAnalysisResult.action !== null && (recastAnalysisResult.action.slug !== '' || recastAnalysisResult.action.slug !== null));

  let slugIntent = resolveIntentAction(recastAnalysisResult);
  let seekEntities = resolveEntities(recastAnalysisResult);
  let replyType = resolveReplytype(recastAnalysisResult, seekEntities);
  let analysisStatus = resolveAnalysisStatus(recastAnalysisResult, replyType);

  if (parsedResponse.found) {
    parsedResponse['intention'] = {
      intent: slugIntent.slug || '',
      confidence: slugIntent.confidence,
      status: analysisStatus,
      replies: [{
        reply: recastAnalysisResult.action.reply,
        type: replyType
      }],
      nextAction: resolveNextAction(recastAnalysisResult),
      entities: resolveEntities(recastAnalysisResult)
    }
  } else {
    parsedResponse['intention'] = {
      intent: '',
      confidence: '',
      status: '',
      replies: [{
        reply: recastAnalysisResult.replies[0],
        type: replyType
      }],
      nextAction: resolveNextAction(recastAnalysisResult),
      entities: {}
    }
  }

  return parsedResponse;

}

const resolveIntentAction = function(recastAnalysisResult) {
  let slugIntent = recastAnalysisResult.intents.find(function(intent) {
    return (intent.slug == recastAnalysisResult.action.slug);
  });

  return slugIntent;
}

const findMissingEntities = function(seekEntities) {
  let missingEntities = seekEntities.map(function(entity) {
    if (entity.value === null) {
      return entity;
    }
  });

  return missingEntities;
}

const resolveReplytype = function(recastAnalysisResult, seekEntities) {
  let replyType = '';

  let missingEntities = findMissingEntities(seekEntities);

  if (missingEntities.length > 0) {
    replyType = "missingInfo";
  } else {
    replyType = "readyToAct";
  }

  return replyType;
}

const resolveAnalysisStatus = function(recastAnalysisResult, replyType) {
  let status = '';

  if (replyType == "missingInfo") {
    status = 'incomplete';
  } else {
    status = 'complete';
  }

  return status;
}

const resolveNextAction = function(recastAnalysisResult) {
  let nextAction = {};

  if (recastAnalysisResult.next_actions.length > 0) {
    //Fetch the first undone next action
    let action = recastAnalysisResult.next_actions.find(function(reply) {
      return !reply.done;
    });

    if (action) {
      nextAction = {
        intent: action.slug,
        reply: action.reply,
      }
    } else {
      //Assuming if no undone actions found, the activity is done
      nextAction = {
        intent: 'conclude',
        reply: 'Done..!',
      }
    }
  } else if (recastAnalysisResult.action && (!recastAnalysisResult.action.done)) {
    nextAction = {
      intent: recastAnalysisResult.action.slug,
      reply: recastAnalysisResult.action.reply,
    };
  } else if (recastAnalysisResult.replies.length > 0) {
    nextAction = {
      intent: 'unknown',
      reply: recastAnalysisResult.replies[0],
    };
  } else {
    nextAction = {};
  }

  return nextAction;
}

const resolveEntities = function(recastAnalysisResult) {
  let entities = Object.keys(recastAnalysisResult.memory).map(function(key) {
    return {
      name: key,
      value: recastAnalysisResult.memory[key]
    };
  });

  return entities;
}

module.exports = {
  analyzeIntent: analyzeIntent
}
