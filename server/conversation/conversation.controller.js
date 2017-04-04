// var mongoose = require('mongoose');
const ConversationModel = require('./conversation.entity');
let log4js = require('log4js');
let logger = log4js.getLogger();


const startNewConversation = function(userName, utteranceText, activity) {
    //Starting a new conversation involves attaching the conversation timestamp freshly on server side, i.e., controller will do it
    let promise = new Promise(function(resolve, reject) {
        let convObj = new ConversationModel({
            userName: userName,
            startTime: new Date(),
            context: {
                activity: activity
            },
            interactions: [{
                utterance: utteranceText,
                timestamp: new Date(),
            }]
        });

        convObj.save(function(err, savedConvObj) {
            if (err) {
               logger.error('Error in saving new conversation object ', err);
                reject(err);
            }
            resolve(savedConvObj);
        });
    });
    return promise;
}

// this function is to find or check for the existence of conversation details in our database
const findUserConversation = function(userName, startTime) {
    let promise = new Promise(function(resolve, reject) {
        ConversationModel.findOne({
            userName: userName,
            startTime: startTime
        }, function(err, ConversationModel) {
            if (err)
                reject(err);
            if (!ConversationModel) {
                reject({ error: 'No conversation found in mongo..!' });
            }
            resolve(ConversationModel);
        });
    });
    return promise;
};

// this function saves the conversation in database
const saveUserConversation = function(objectTobeSaved) {
    let promise = new Promise(function(resolve, reject) {
        let data = new ConversationModel(objectTobeSaved);
        data.save(function(err, objectTobeSaved) {
            if (err)
                reject(err);
            resolve(objectTobeSaved);
        });
    });
    return promise;
};

const updateUserConversation = function(userName, startTime, modifiedObjToBeSaved) {
    let promise = new Promise(function(resolve, reject) {
        console.log(userName);
        ConversationModel.update({
            userName: userName,
            startTime: startTime
        }, { $set: { context: modifiedObjToBeSaved } }, function(err, conversation1) {
            if (err) {
                reject(err);
            } else {
                resolve(conversation1);
                console.log(conversation1);

            }


        });
    });
    return promise;
};

const findLastUserConversation = function(userName){
  let promise = new Promise(function(resolve, reject){
    ConversationModel.find({
      userName: userName
    }).sort({startTime: -1}).limit(1).exec(function(err, ConversationModel){
      if (err)
        reject(err);
      if (!ConversationModel){
        reject({error: 'No ConversationModel found in mongo..!'});
      }
      console.log(ConversationModel);
      resolve(ConversationModel);

    });
  });
  return promise;
};


module.exports = {

  findUserConversation: findUserConversation,
  saveUserConversation: saveUserConversation,
  updateUserConversation:updateUserConversation,
  findLastUserConversation:findLastUserConversation,
  startNewConversation:startNewConversation

};
