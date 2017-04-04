const highland = require('highland');
const kafka = require('kafka-node');
const config = require('../config/config');

// A consumer needs to specify
// - Topic name it wants to subscribe to
// - Consumer group it belongs to
// - Kafka host it wants to connect to
// - A highland Processing Pipeline, how the messages are processed

function run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine) {
  if (!subscribeTopic || subscribeTopic == '') {
    throw new Error('Invalid subscription details for consumer..!');
    return;
  }

  kafkaHost = kafkaHost || config.KAFKA_HOST;
  consumerGroup = consumerGroup || '';

  highland(function(push, next) {
      let client = new kafka.Client(kafkaHost);
      let topics = [{
        topic: subscribeTopic
      }];
      let options = {
        groupId: consumerGroup,
        autoCommit: false
      }

      let consumer = new kafka.Consumer(client, topics, options);

      consumer.on('message', function(message) {
        console.log('Message received: ', message);

        push(null, dataObj);
        next();
      });

      consumer.on('error', function(err) {
        console.log("Error: ", err);

        push(err, null);
        next();
      });
    }).map(function(messageObj) {
      console.log('Received a message: ', messageObj);
    })
    .pipe(processPipeLine)
    .errors(function(err) {
      console.log('Got errors: ', err);
    })
    .each(function(messageObj) {});

}

module.exports = {
  run: run
}
