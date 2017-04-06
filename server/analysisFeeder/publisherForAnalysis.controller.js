const kafka = require('kafka-node');
const config = require('../../config/config');
const async = require('async');
const log4js = require('log4js');
log4js.loadAppender('console');


const logger = log4js.getLogger('AnalysisFeeder');

const publishToAnalyze = function(analysisTopic, dataToPublish, callback) {
  logger.debug('Request received to publish to ', analysisTopic);

  publishToKafkaTopic(analysisTopic, dataToPublish, callback);
}

const publishToKafkaTopic = function(topicName, dataPayload, publishCallback) {
  async.waterfall([
      function(callback) {
        upsertKafkaTopic(topicName, callback)
      },
      function(prevStepResult, callback) {
        publishToKafka(topicName, dataPayload, callback);
      }
    ],
    function(err, publishResults) {
      logger.debug('Finished publishToKafkaTopic with ', ' err: ', err,
        ' result: ', publishResults);
      publishCallback(err, publishResults);
    });
}

const upsertKafkaTopic = function(topicName, callback) {
  try {
    logger.debug('Connecting to ', config.ZOOKEEPER.URL);
    let client = new kafka.Client(config.ZOOKEEPER.URL);

    client.once('connect', function(err) {
      if (err) {
        logger.error('Error in connecting for upsertKafkaTopic', err);
        callback(err, null);
        return;
      }

      client.loadMetadataForTopics([topicName], (err, resp) => {
        logger.debug("Topic upsert finish with err: ", err,
          " result: ",
          JSON.stringify(resp));

        callback(err, resp);
      });
    });
  } catch (err) {
    logger.error('unexpected error in upsertKafkaTopic ', err);
    callback(err, null);
  }
}

const publishToKafka = function(topicName, dataPayload, callback) {
  logger.debug('Publishing to topic ', topicName, ' with data: ', dataPayload);

  let client = new kafka.Client(config.ZOOKEEPER.URL);
  let producer = new kafka.Producer(client);

  producer.on('ready', function() {
    let payloads = [{
      topic: topicName,
      messages: JSON.stringify(dataPayload)
    }];

    producer.send(payloads, function(err, data) {
      if (err) {
        logger.error(
          'Error in publishing message to messaging pipeline ', err
        );
        callback(err, null)
        return;
      }
      logger.debug('Published message to messaging pipeline topic ',
        topicName, ' with result: ', data);
      callback(null, data);
      return;
    });
  });
}

module.exports = {
  publishToAnalyze: publishToAnalyze
}
