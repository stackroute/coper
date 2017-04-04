// var mongoose = require('mongoose');
const ConversationModel = require('./conversation.entity');

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
        conversation.findOne({
            userName: userName,
            startTime: startTime
        }, function(err, conversation) {
            if (err)
                reject(err);
            if (!conversation) {
                reject({ error: 'No conversation found in mongo..!' });
            }
            resolve(conversation);
        });
    });
    return promise;
};
// this function saves the conversation in database
const saveUserConversation = function(objectTobeSaved) {
    let promise = new Promise(function(resolve, reject) {
        let data = new conversation(objectTobeSaved);
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
        conversation.update({
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

module.exports = {

    findUserConversation: findUserConversation,
    saveUserConversation: saveUserConversation,
    updateUserConversation: updateUserConversation

};
