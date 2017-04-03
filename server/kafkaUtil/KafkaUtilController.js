const messagePublisher = require('./KafkaHighLevelProducer');
//const topic = require('');

const publishMessageToTopic = function() {

  let publisher = messagePublisher();
  return publisher
}
module.exports = publishMessageToTopic;
