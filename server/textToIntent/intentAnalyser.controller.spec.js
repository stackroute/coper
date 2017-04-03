const chai = require('chai');
const expect = chai.expect;

describe('Test plan for Text-To-Inent Analys', function() {
	it('Testing for processing a incomplete Utterance Text', function(done){
		this.timeout(3000);

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
	})
})