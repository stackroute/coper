const highland = require('highland');
const serviceBase = require('./service.base')

const executeService = function() {

  let myProcessors = [];

  myProcessors.push(highland.map(function(msgObj) {
    const intentAnalyzer = require('../server/textToIntent');

    let promise = new Promise(function(resolve, reject) {
      intentAnalyzer.processForIntent(conversation, utteranceText,
        function(err, analysisResult) {
          if (err) {
            reject(err);
            return;
          }

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
        return result;
      },
      function(err) {
        //Don't publish any thing
        return err;
      })
  )));

  try {
    let subscribeTopic = "";
    let consumerGroup = "";
    let kafkaHost = "";

    let processPipeLine = highland.pipeline.apply(null, myProcessors);

    serviceBase.run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine);

    console.log('Services is now running..!');

  } catch (err) {
    console.log('Error in executing Intent Analysis service ', err);
  }
}

executeService();
