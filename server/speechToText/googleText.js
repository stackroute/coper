const Speech = require('@google-cloud/speech');

const createRecognizeStream = function() {
    const googleSpeechToTextConfig = require('../../config/googleSpeechToText');
    // Instantiate Speec client
    const speechClient = Speech({projectId: googleSpeechToTextConfig.projectId, keyFilename: googleSpeechToTextConfig.keyFilepath});
    //Instantiate speech stream
    return speechClient.createRecognizeStream(googleSpeechToTextConfig.googleConfig);
}

module.exports = {
    createRecognizeStream: createRecognizeStream
};
