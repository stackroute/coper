
const textToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

const watsonConfig = require('../../config/config.js').WATSON_TEXT_TO_SPEECH;

const fs = require('fs');
//This function is to convert the response text to speech.

var watsonTextToSpeech = new textToSpeechV1(watsonConfig.auth);
const params = watsonConfig.params;


//watsonTextToSpsize(params).pipe(fs.createWriteStream('output7.wav'));

//text_to_speech.synthesize(params).pipe(fs.createWriteStream('output7.wav'));eech.synthe

module.exports = {
  watsonTextToSpeech : watsonTextToSpeech,
  params : params
};
