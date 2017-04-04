
var textToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var watsonConfig = require('../../config/config.js');
var fs = require('fs');
//This function is to convert the response text to speech.
var text_to_speech = new textToSpeechV1(watsonConfig.WATSON_SPEECH_TO_TEXT);

var params = {
  text: 'hii i aa prem prakash',
  voice: 'en-US_AllisonVoice',
  accept: 'audio/wav'
};


text_to_speech.synthesize(params).pipe(fs.createWriteStream('output7.wav'));

module.exports = text_to_speech;