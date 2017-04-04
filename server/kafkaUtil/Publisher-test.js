const chai = require('chai');
const expect = chai.expect;
const publisher = require('./KafkaHighLevelProducer.js');
const subscriber = require('./kafkaHighLevelConsumer.js');

describe('Testing producer for publishing messages', function() {

  it('Testing typical publish message scenario', function(done) {

    let topicName = 'test';
    let messagePayload = 'Hello from Kaushal';

    publisher.publishMessageToTopic(topicName, messagePayload, function(err, result){
        subscriber.subscriberToTopic(topicName, groupId, function(err, message){
            expect(message).to.equal(messagePayload);
            done(err);
        })
    });

  });

});
