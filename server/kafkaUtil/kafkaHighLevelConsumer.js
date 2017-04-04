const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const HighLevelConsumer = kafka.HighLevelConsumer;

const subscriberToTopic = function() {


  const client = new kafka.Client("127.0.0.1:2181"),

    consumer = new HighLevelConsumer(

      client, [
        { topic:'topicName', partition: 0 }]
        { groupId:'actionhandler'}
    );

  consumer.on('message', function(message) {

    console.log(message);
  });
}
module.exports = subscriberToTopic;
