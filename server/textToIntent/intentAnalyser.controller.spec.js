const chai = require('chai');
const expect = chai.expect;

    describe('Test plan for Text-To-Inent Analysis', function() {
	it('Testing for processing an incomplete Utterance Text', function(done){
		this.timeout(5000);

		const analyzer = require('./');

		let conversation = {
			"activity": "SCRUM"
		};
		let utteranceText = 'create project lucy';

		analyzer.processForIntent(conversation, utteranceText, function(err, analysisRes){
			console.log("processForIntent result: ", JSON.stringify(analysisRes));

			expect('object').to.equal(typeof analysisRes.result);
			expect(utteranceText).to.equal(analysisRes.result.utterance);
			expect('object').to.equal(typeof analysisRes.result.intention);
			expect('create-project').to.equal(analysisRes.result.intention.intent);
			done(err);
		});
	});


    it('Testing for adding members in project', function(done){
		this.timeout(5000);

		const analyzer = require('./');

		let conversation = {
			"activity": "SCRUM"
		};
		let utteranceText = 'add members inder';

		analyzer.processForIntent(conversation, utteranceText, function(err, analysisRes){
			console.log("processForIntent result: ", JSON.stringify(analysisRes));

			expect('object').to.equal(typeof analysisRes.result);
			expect(utteranceText).to.equal(analysisRes.result.utterance);
			expect('object').to.equal(typeof analysisRes.result.intention);
			expect('add-member').to.equal(analysisRes.result.intention.intent);
			done(err);
		});
	});


it('Testing for text for creating stories', function(done){
        this.timeout(5000);
        const analyzer = require('./');
        let conversation = {
            "activity": "SCRUM"
        };
        let utteranceText = 'create story all api of watson';
        analyzer.processForIntent(conversation, utteranceText, function(err, analysisRes){
            console.log("processForIntent result: ", JSON.stringify(analysisRes));
            expect('object').to.equal(typeof analysisRes.result);
            expect(utteranceText).to.equal(analysisRes.result.utterance);
            expect('object').to.equal(typeof analysisRes.result.intention);
            expect('create-story').to.equal(analysisRes.result.intention.intent);
            done(err);
        });
    });
it('Testing for text refering to adding of tasks', function(done){
        this.timeout(6000);
        const analyzer = require('./');
        let conversation = {
            "activity": "SCRUM"
        };
        let utteranceText = 'add task all api of recast';
        analyzer.processForIntent(conversation, utteranceText, function(err, analysisRes){
            console.log("processForIntent result: ", JSON.stringify(analysisRes));
            expect('object').to.equal(typeof analysisRes.result);
            expect(utteranceText).to.equal(analysisRes.result.utterance);
            expect('object').to.equal(typeof analysisRes.result.intention);
            expect('add-task').to.equal(analysisRes.result.intention.intent);
            done(err);
        });
    });
it('Testing for processing an out of context utterence', function(done){
        this.timeout(6000);
        const analyzer = require('./');
        let conversation = {
            "activity": "SCRUM"
        };
        let utteranceText = 'i am going to sleep';
        analyzer.processForIntent(conversation, utteranceText, function(err, analysisRes){
            console.log("processForIntent result: ", JSON.stringify(analysisRes));
            expect('object').to.equal(typeof analysisRes.result);
            expect(utteranceText).to.equal(analysisRes.result.utterance);
            expect('object').to.equal(typeof analysisRes.result.intention);
            expect('no-intent').to.equal(typeof analysisRes.result.intention.intent);
            done(err);
        });
    });






});