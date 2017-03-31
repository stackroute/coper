module.exports = {
    googleConfig :{
      config: {
          encoding: 'LINEAR16',
          sampleRate: 44100,
          languageCode: 'en-IN'
      },
      singleUtterance: false,
      interimResults: true
    },
    projectId: 'gothic-depth-160205',
    keyFilepath: './server/speechToText/googleKey.json'  
};
