// var mongoose = require('mongoose');
const conversation = require('./conversation.entity');


// this function is to find or check for the existence of conversation details in our database
const findUserConversation = function(userName, startTime){
  let promise = new Promise(function(resolve, reject){
    conversation.findOne({
      userName: userName,
      startTime: startTime
    }, function(err, conversation){
      if (err)
        reject(err);
      if (!conversation){
        reject({error: 'No conversation found in mongo..!'});
      }
      resolve(conversation);
    });
  });
  return promise;
};
// this function saves the conversation in database
const saveUserConversation = function(objectTobeSaved){
   let promise = new Promise(function(resolve, reject){
let data=new conversation(objectTobeSaved);

    data.save(function(err, objectTobeSaved){
      if (err)
        reject(err);
      resolve(objectTobeSaved);
    });
  });
  return promise;
};

const updateUserConversation = function(userName, startTime,modifiedObjToBeSaved){
  let promise = new Promise(function(resolve, reject){
      console.log(userName);
        conversation.update({
          userName: userName,
          startTime: startTime
        },{$set:{context:modifiedObjToBeSaved}},function(err, conversation1){
          if(err)
          {
            reject(err);
          }
          else
          {
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
  updateUserConversation:updateUserConversation


};
