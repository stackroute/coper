const Speech = require('@google-cloud/speech');

const createRecognizeStream = function() {
    const googleSpeechToTextConfig = require('../../config/config').GOOGLE_SPEECH_TO_TEXT;
    // Instantiate Speec client
    const speechClient = Speech({projectId: googleSpeechToTextConfig.projectId, keyFilename: googleSpeechToTextConfig.keyFilepath});
    //Instantiate speech stream
    return speechClient.createRecognizeStream(googleSpeechToTextConfig.googleConfig);
}

module.exports = {
    createRecognizeStream: createRecognizeStream
};
