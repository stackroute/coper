const redis = require('redis');
const redisClient = redis.createClient();
const processUtterance = function(data){
  if(message.startTime === '')
  {
    const date = new Date();
    data.conversation.startTime = date.toUTCString();
    redisClient.publish('conversation::new::'+data.conversation.userToken,data.conversation);
    //TODO release data on kafka pipeline
  }
  else {
    //TODO release data on kafka pipeline
  }
}

module.exports = {
  processUtterance : processUtterance
}
