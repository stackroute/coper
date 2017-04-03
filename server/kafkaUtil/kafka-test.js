const chai = require('chai');
const expect = chai.expect;
const publisher = require('./KafkaUtilController.js');
const subscriber = require('./kafkaHighLevelConsumer.js');


describe('kafkaHighLevelConsumer.js', function() {
  it('subscriberToTopic() should return message', function(done) {
    expect('subscriber.subscriberToTopic').then(
    	function(result) {
            result.should.equal("hello heros");
        		done();
        }, function(err) {
            done(err);
        });
    });
  });
