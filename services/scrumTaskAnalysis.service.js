const highland = require('highland');
const serviceBase = require('./service.base')
const config = require('../config/config')
const kafka = require('kafka-node')
const analysisFeeder = require('../server/analysisFeeder')
const executeService = function() {

  let myProcessors = [];

  myProcessors.push(highland.map(function(msgObj) {
    const scrumAnalyzer = require('../server/scrumActivity');

    let data = JSON.parse(msgObj.value);

    console.log('message to be published', data.action);

    let promise = new Promise(function(resolve, reject) {
      scrumAnalyzer.analyseAction(data, data.action,
        function(err, analysisResult) {
          if (err) {
            reject(err);
            return
          }
          // console.log("inside promise", analysisResult);
          resolve(analysisResult);
          return;r
        });
    });

    return promise;
  }));

  myProcessors.push(highland.flatMap(promise => highland(
    promise.then(
      function(result) {
        //Publish message to Kafka with output topic, so that downstream service can pick it up
        console.log('Got result from intent analysis: ', result);

        analysisFeeder.publishToAnalyze(config.KAFKA_TOPICS.SCRUM, result, function(err, result){
          console.log('Published INTENTs to ', config.KAFKA_TOPICS.INTENTS, ' with err: ', err, ' result: ', result);
        });
      },
      function(err) {
        //Don't publish any thing
        return err;
      })
  )));

  try {
    let subscribeTopic = config.KAFKA_TOPICS.ACTION;
    let consumerGroup = config.KAFKA_CONSUMER_GROUPS.SCRUM_TASK;
    let kafkaHost = config.ZOOKEEPER.URL;

    let processPipeLine = highland.pipeline.apply(null, myProcessors);

    serviceBase.run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine);

    console.log('Services is now running..!');

  } catch (err) {
    console.log('Error in executing Intent Analysis service ', err);
  }
}

executeService();
