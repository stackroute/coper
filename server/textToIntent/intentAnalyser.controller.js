const recastAnalyzer = require('./recastAi.analyser.js');

const processForIntent = function(conversationObj, utteranceText, callback) {
	recastAnalyzer.analyzeIntent(conversationObj, utteranceText, callback);
}

module.exports = {
	processForIntent: processForIntent
};