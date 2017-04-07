const highland = require('highland');
const kafka = require('kafka-node');

/*
 * This is a KAFKA Consumer base service module, which subscribes to Kafka topic perpetually
 *
 * This module can be used as a base module method, wherever kafka topic subscription is needed
 */

// A client (calee) needs to specify
// - Topic name it wants to subscribe to
// - Consumer group it belongs to
// - Server host it wants to connect to, this should be Zookeeper Host
// - A highland Processing Pipeline, how the messages are processed

function run(subscribeTopic, consumerGroup, serverHost, processPipeLine) {
  if (!subscribeTopic || subscribeTopic == '') {
    throw new Error('Invalid subscription details for consumer..!');
    return;
  }

  serverHost = serverHost || '0.0.0.0:2181';
  consumerGroup = consumerGroup || '';

  console.log('Registering client to host ', serverHost);

  let topics = [{
    topic: subscribeTopic
  }];

  let options = {
    groupId: consumerGroup,
    autoCommit: true
  };

  console.log('Subscribing consumer to topic ', subscribeTopic, ' with consumergroup as ', consumerGroup);

  let client = new kafka.Client(serverHost);
  let consumer = new kafka.Consumer(client, topics, options);

  process.on('SIGINT', () => {
    consumer.close(true, ()=> {
      console.log('Closing consumer connection ..!');
      client.close(function(){
        process.exit();
      });
    });
  });


  highland(function(push, next) {
      consumer.on('message', function(message) {
        // logger.debug('Message received: ', message);

        //If message is not JSON, parse it as JSON here, before passing it to the rest of the pipeline

        //Push the message from kafka to rest of the pipeline
        push(null, message);

        //Start calling the generator again for listening to next message
        // next(); //Commenting this as processing is currently slower than message producer
      });

      consumer.on('error', function(err) {
        console.log("Error: ", err);
        push(err, null);
        next();
      });
    }).map(function(messageObj) {
      //Temporarily keeping this map method, to intermediary log and verify if messages are coming from Kafka or not
      //Once well tested, this method can be removed
      // console.log('[*] Received a message in pipeline: ', messageObj);
      console.log('[*] Received a message in pipeline: ');

      //If not returned, the message will not be propagated to next set of pipeline
      return messageObj;
    })
    .pipe(processPipeLine) //Assemble the calee's processing pipeline
    .errors(function(err) {
      //Listen to any error if happens
      console.log('Got errors: ', err);
      return err;
    })
    .each(function(messageObj) {
      //Drain the message from pipeline, so that next message can enter the pipeline
    });
}

module.exports = {
  run: run
}
