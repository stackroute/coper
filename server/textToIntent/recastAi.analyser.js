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

    let slugIntent = resolveIntentAction(recastAnalysisResult);
    let seekEntities = resolveEntities(recastAnalysisResult);
    let replyType = resolveReplytype(recastAnalysisResult, seekEntities);
    let reply = resolveReply(recastAnalysisResult);
    let analysisStatus = resolveAnalysisStatus(recastAnalysisResult, replyType);
    
    parsedResponse.utterance = recastAnalysisResult.source;
    parsedResponse.activity = conversationObj.activity;
    parsedResponse.language = recastAnalysisResult.language;
    parsedResponse.found = (recastAnalysisResult.action.slug !== '' || recastAnalysisResult.action.slug !== null);

    parsedResponse['intention'] = {
        intent: slugIntent.slug,
        confidence: slugIntent.confidence, 
        status: analysisStatus,
        replies: [
          {
            reply: recastAnalysisResult.action.reply,
            type: replyType
          }
        ],

        nextreplies: [
            {
              intent: recastAnalysisResult.next_actions[0].slug,
              reply: recastAnalysisResult.next_actions[0].reply,
              type: replyType
            }
        ],


        entities: resolveEntities(recastAnalysisResult)
    }

    return parsedResponse;
}

const resolveIntentAction = function(recastAnalysisResult) {
  let slugIntent = recastAnalysisResult.intents.find(function(intent){
    return (intent.slug == recastAnalysisResult.action.slug);
  });
  
  return slugIntent;  
}

const findMissingEntities = function(seekEntities) {
  let missingEntities = seekEntities.map(function(entity){
    if(entity.value === null) {
      return entity;
    }
  });

  console.log('Missing entities ', missingEntities);

  return missingEntities;
}

const resolveReplytype = function (recastAnalysisResult, seekEntities) {
  let repType = '';

  let missingEntities = findMissingEntities(seekEntities);

  if(missingEntities.length > 0) {
    repType = "missingInfo";
  } else {
    repType = "readyToAct";
  }

  return repType;
}

const resolveAnalysisStatus = function(recastAnalysisResult, replyType)  {
  let status = '';

  if(replyType == "missingInfo") {
    status = 'incomplete';
  } else {
    status = 'complete';
  }

  return status;
}

const resolveEntities = function(recastAnalysisResult) {
  let entities = Object.keys(recastAnalysisResult.memory).map(function(key){
    return {
      name: key,
      value: recastAnalysisResult.memory[key]
    };
  });

  return entities;
}

const resolveReply = function(recastAnalysisResult) {
  recastAnalysisResult;
  return {}
}

module.exports = {
    analyzeIntent: analyzeIntent
}
