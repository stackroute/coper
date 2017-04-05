const chai = require('chai');
const expect = chai.expect;
describe('Test plan for Utterence Receiver', function() {
    it('Testing for processing an  Utterance Text with starttime', function(done) {
        this.timeout(5000);

        const analyzer = require('./');
        let userName = 'abc';

        let conversation = {
            "activity": "SCRUM"
        };
        let utteranceText = 'hello how are you';

        //let convStartTime = new Date();
        let convStartTime = new Date('2017-04-04T09:56:21.402Z');

        analyzer.processUtterance(userName, convStartTime, utteranceText, function(err, newConvObj) {
           // console.log("processUtterance result: ", JSON.stringify(analyzer.processUtterance));
            expect('abc').to.equal(analyzer.processUtterance.userName);

            done();

        }, function(err) {
            console.log(err);
        });
    });

    /*it('Testing for processing an  Utterance Text without starttime', function(done) {
        this.timeout(8000);

        const analyzer = require('./utterenceReceiver.controller.js');

        let userName = 'abc';

        let conversationModel = {
            "activity": "SCRUM"
        };
        let utteranceText = 'hello how are you';

        let convStartTime = '';

        analyzer.processUtterance(userName, convStartTime, utteranceText, function(err, newConvObj) {
            console.log("processUtterance result: ", JSON.stringify(newConvObj));
            //expect(object).to.equal(newConvObj.user);
            done();

        }, function(err) {
            console.log(err);
        });
    });*/
});
