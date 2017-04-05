const recastAnalyzer = require('./recastAi.analyser.js');

const processForIntent = function(conversationObj, utteranceText, callback) {
	console.log("Got request to analyze intent for utterance: ", utteranceText, " with data ", conversationObj);

	recastAnalyzer.analyzeIntent(conversationObj, utteranceText, callback);
}

module.exports = {
	processForIntent: processForIntent
};