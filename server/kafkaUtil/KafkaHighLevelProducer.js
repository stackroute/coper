const kafka = require('kafka-node');


/*
 * Publish the given message to specified topic
 */
const publishMessageToTopic = function(topicName, messagePayload) {

  const HighLevelProducer = kafka.HighLevelProducer;
  const client = new kafka.Client();
  const producer = new HighLevelProducer(client);

  producer.on('ready', function() {
    // payloads.forEach(function(msg) {
      producer.send([topic:topicName, messages:messagePayload], function(err, data) {
        if (err)
          console.log(err)
        else
          console.log(data);
      });
    });
}

module.exports = messagePublisher;
