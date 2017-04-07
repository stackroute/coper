const highland = require('highland');
const serviceBase = require('./service.base')
const config = require('../config/config')
const kafka = require('kafka-node')
const analysisFeeder = require('../server/analysisFeeder')
const executeService = function() {

  let myProcessors = [];

  myProcessors.push(highland.map(function(msgObj) {
    const actionAnalyzer = require('../server/actionHandler');

    let data = JSON.parse(msgObj.value);

    console.log('Recieved message from topic ');

    let promise = new Promise(function(resolve, reject) {
      actionAnalyzer.processForAction(data.conversation, data.intentResult,
        function(err, actionResult) {
          if (err) {
            reject(err);
            return
          }

          resolve(actionResult);
          return;r
        });
    });

    return promise;
  }));

  myProcessors.push(highland.flatMap(promise => highland(
    promise.then(
      function(result) {
        // Publish message to Kafka with output topic, so that downstream service can pick it up
        console.log('Got result from action handler: ');

        let payload = {
          conversation: result.conversation,
          intentResult: result.intentResult,
          actionResult: result.actionResult
        }

        analysisFeeder.publishToAnalyze(result.actionResult.activityTopic, payload, function(err, res){
          console.log('Published ACTIONs to ', result.actionResult.activityTopic, ' with err: ', err, ' result: ', res);
        });

      },
      function(err) {
        //Don't publish any thing
        console.log('Got error in action handler ', err);
        return err;
      })
  )));

  try {
    let subscribeTopic = config.KAFKA_TOPICS.INTENTS;
    let consumerGroup = config.KAFKA_CONSUMER_GROUPS.ACTION_HANDLERS;
    let kafkaHost = config.ZOOKEEPER.URL;

    let processPipeLine = highland.pipeline.apply(null, myProcessors);

    serviceBase.run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine);

    console.log('Services is now running..!');

  } catch (err) {
    console.log('Error in executing Intent Analysis service ', err);
  }
}

executeService();
