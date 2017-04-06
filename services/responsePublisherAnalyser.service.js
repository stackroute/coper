const highland = require('highland');
const serviceBase = require('./service.base')
const config = require('../config/config')
const kafka = require('kafka-node')
const analysisFeeder = require('../server/analysisFeeder')
const executeService = function() {

  let myProcessors = [];

  myProcessors.push(highland.map(function(msgObj) {
    const responseHandler = require('../server/responseHandler');

    let data = JSON.parse(msgObj.value);

    console.log('message to be published', data.action);

    let promise = new Promise(function(resolve, reject) {
      responseHandler.processActivityResponse(data.conversation, data.actionResult,
        function(err, analysisResult) {
          if (err) {
            reject(err);
            return
          }
          // console.log("inside promise", analysisResult);
          resolve(analysisResult);
          return;
        });
    });

    return promise;
  }));

  myProcessors.push(highland.flatMap(promise => highland(
    promise.then(
      function(result) {
        //Publish message to Kafka with output topic, so that downstream service can pick it up
        console.log('Got result from response handler: ', result);
      },
      function(err) {
        //Don't publish any thing
        return err;
      })
  )));

  try {
    let subscribeTopic = config.KAFKA_TOPICS.RESPONSE;
    let consumerGroup = config.KAFKA_CONSUMER_GROUPS.RESPONSE_HANDLERS;
    let kafkaHost = config.ZOOKEEPER.URL;

    let processPipeLine = highland.pipeline.apply(null, myProcessors);

    serviceBase.run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine);

    console.log('Services is now running..!');

  } catch (err) {
    console.log('Error in executing Intent Analysis service ', err);
  }
}

executeService();
