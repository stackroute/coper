
var textToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var watsonConfig = require('../../config/config.js');
var fs = require('fs');
//This function is to convert the response text to speech.
var watsonTextToSpeech = new textToSpeechV1(watsonConfig.WATSON_SPEECH_TO_TEXT);
const params = watsonConfig.params;


watsonTextToSpeech.synthesize(params).pipe(fs.createWriteStream('output7.wav'));

//text_to_speech.synthesize(params).pipe(fs.createWriteStream('output7.wav'));

module.exports = {
  watsonTextToSpeech : watsonTextToSpeech,
  params : params
};
