const kafka = require('kafka-node');
const config = require('../../config/config.js');
const Consumer = kafka.Consumer;
const HighLevelConsumer = kafka.HighLevelConsumer;

const subscriberToTopic = function(topicName,groupId, callback) {
  const client = new kafka.Client(config.ZOOKEEPER.URL);

  consumer = new HighLevelConsumer(client,
  	[
      { topic: 'topicName'}
    ],
    { groupId: groupId }
  );

  consumer.on('message', callback);
}

module.exports = {subscriberToTopic};
