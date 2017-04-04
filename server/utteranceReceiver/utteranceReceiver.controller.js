const conversation = require('../conversation/conversation.controller')
const redis = require('redis');
const redisClient = redis.createClient();
console.log("at top");
const processUtterance = function(data) {
    if (data.conversation.startTime === '') {
        const date = new Date();
        data.conversation.startTime = date.toUTCString();
        redisClient.publish('conversation::new::' + data.conversation.userToken, JSON.stringify(data.conversation));
        console.log('data', date);
        //saving new conversation to db
       conversation.saveUserConversation()
            .then(function(data) {
                return data;
            })
            .then(function(error) {
                return  err;
                console.log(err);
            })


        //TODO release data on kafka pipeline

    }
    else {
        conversation.findUserConversation()
            .then(function(userName, startTime) {
                return data;

            })
            .then(function(err) {
                console.log(err);
            })
            //TODO release data on kafka pipeline
    }
}

 // module.exports = {
 //     processUtterance: processUtterance
 //      }
