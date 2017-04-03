module.exports = {
  KAFKA_TOPICS: {
    UTTERANCES: 'LUCY_UTTERANCES',
    INTENTS: 'LUCY_INTENTS',
  },
  KAFKA_CONSUMER_GROUPS: {
    INTENT_ANALYSER: 'CG_INTENT_ANALYZERS',
    ACTION_HANDLERS: 'CG_ACTION_HANDLERS',
  },
  MONGO: {
    URL: 'mongodb://localhost:27017/lucy'
  },
  GOOGLE_SPEECH_TO_TEXT: {
    googleConfig: {
      config: {
        encoding: 'LINEAR16',
        sampleRate: 44100,
        languageCode: 'en-IN'
      },
      singleUtterance: false,
      interimResults: true
    },
    projectId: 'gothic-depth-160205',
    keyFilepath: './server/speechToText/googleKey.json';
  },
   WATSON_SPEECH_TO_TEXT: {
    'username': 'c011d12a-080e-466c-97d8-28a3d2bffc95',
    'password': 'Y7pdB42Cb0cI'
  },

  googleAuth: {
    clientID: '212833991044-l102mt5bjeqtmqap3kj976me3km8jr5i.apps.googleusercontent.com',
    clientSecret: 'aHR-3D-AvSDgeU3ne8BjIz6q',
    callbackURL: '/auth/google/callback'
  },
  JWT_AUTH: {
    secret: 'lucy'
  }
};
