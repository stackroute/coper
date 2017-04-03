const googleSpeechToText = require('./googleText');

const conversionAPI = 'google';

const getSpeechRecognizeStream = function() {
  if(conversionAPI === 'google') {
    return googleSpeechToText.createRecognizeStream();
  }
}

module.exports = {
  getSpeechRecognizeStream : getSpeechRecognizeStream
};
