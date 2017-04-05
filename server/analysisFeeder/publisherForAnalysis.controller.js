

const kafka = require('kafka-node');
const config = require('./config/config');

const async = require('async');

const publishToAnalyze = function(analysisTopic, dataToPublish) {
    logger.debug('AnalyzeObject:', dataToPublish);
    let topicName = config.KAFKA_TOPICS;
    let dataPayload = {
        analysisTopic: topicName,
        dataToPublish: dataToPublish

    };


    publishToKafkaTopic(topicName, dataPayload, function(err, publishResult) {
        logger.info('Done publishing, with result ', publishResult);
        callback(err, publishResult);
    });
}

const publishToKafkaTopic = function(topicName, dataPayload, callback) {
    let client = new kafka.Client(config.ZOOKEEPER.URL);

    async.waterfall([function(callback) {
        upsertKafkaTopic(topicName, callback)
    }, function(prevStepResult, callback) {
        publishToKafka(topicName, dataPayload, callback);
    }], function(err, publishResults) {
        logger.debug('Finished publishToKafkaTopic with ', ' err: ', err, ' result: ', publishResults);
        callback(err, publishResults)
    });
}

const upsertKafkaTopic = function(topicName, callback) {
    let client = new kafka.Client(config.ZOOKEEPER.URL);
    client.once('connect', function() {
        client.loadMetadataForTopics([topicName], (err, resp) => {
            logger.debug("Topic upsert result:", JSON.stringify(resp));
            callback(err, resp);
        });
    });
}

const publishToKafka = function(topicName, dataPayload, callback) {
    logger.debug('Publishing to topic ', topicName, ' with data: ', dataPayload);

    let client = new kafka.Client(config.ZOOKEEPER.URL);
    let producer = new kafka.Producer(client);

    producer.on('ready', function() {
        let payloads = [{
            topic: topicName,
            messages: dataPayload
        }];

        producer.send(payloads, function(err, data) {
            if (err) {
                logger.error(
                    'Error in publishing message to messaging pipeline ', err
                );
                callback(err, null)
                return;
            }

            logger.debug('Published message to messaging pipeline topic ', topicName, ' with result: ', data);

            callback(null, data);
            return;
        });
    });
}

module.exports = {
    publishForProfileAnalysis: publishToAnalyze
}
