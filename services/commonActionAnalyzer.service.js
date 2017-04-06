const highland = require('highland');
const serviceBase = require('./service.base')
const config = require('../config/config')
const kafka = require('kafka-node')
const log4js = require('log4js');
const logger = log4js.getLogger('commonActionAnalyzer');
const analysisFeeder = require('../server/analysisFeeder')
const executeService = function() {
  let myProcessors = [];

  myProcessors.push(highland.map(function(msgObj) {
    const commonActionAnalyzer = require('../server/appTasks/commonActionHandler');

    let data = JSON.parse(msgObj.value);

    logger.debug('Recieved message from topic ', data);

    let promise = new Promise(function(resolve, reject) {
      commonActionAnalyzer.analyzeActivityAction(data.conversation, data.actionResult,
        function(err, analysisResult) {
          if (err) {
            reject(err);
            return
          }
          // console.log("inside promise", analysisResult);
          resolve(analysisResult);
          return;
          r
        });
    });

    return promise;
  }));

  myProcessors.push(highland.flatMap(promise => highland(
    promise.then(
      function(result) {
        //Publish message to Kafka with output topic, so that downstream service can pick it up
        logger.debug('Got result from common activity handler: ', result);

        let payload = {
          conversation: result.conversation,
          actionResult: result.actionResult,
          activityResponse: result.activityResponse
        }

        analysisFeeder.publishToAnalyze(config.KAFKA_TOPICS.RESPONSE, payload, function(err, res) {
          logger.debug('Published INTENTs to ', config.KAFKA_TOPICS.RESPONSE, ' with err: ', err, ' result: ', res);
        });
      },
      function(err) {
        //Don't publish any thing
        return err;
      })
  )));

  try {
    let subscribeTopic = config.KAFKA_TOPICS.COMMON;
    let consumerGroup = config.KAFKA_CONSUMER_GROUPS.COMMON_TASK;
    let kafkaHost = config.ZOOKEEPER.URL;

    let processPipeLine = highland.pipeline.apply(null, myProcessors);

    serviceBase.run(subscribeTopic, consumerGroup, kafkaHost, processPipeLine);

    logger.debug('Services is now running..!');

  } catch (err) {
    logger.debug('Error in executing Intent Analysis service ', err);
  }
}

executeService();
