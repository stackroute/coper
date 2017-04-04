
const textToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const watsonConfig = require('../../config/config.js').WATSON_SPEECH_TO_TEXT;
const fs = require('fs');
//This function is to convert the response text to speech.
const watsonTextToSpeech = new textToSpeechV1(watsonConfig.auth);

const params = watsonConfig.params;


//watsonTextToSpeech.synthesize(params).pipe(fs.createWriteStream('output7.wav'));



module.exports = {
  watsonTextToSpeech : watsonTextToSpeech,
  params : params
};
