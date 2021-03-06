const config = {
    KAFKA_TOPICS: {
        UTTERANCES: 'LUCY_UTTERANCES',
        INTENTS: 'LUCY_INTENTS',
        ACTION: 'LUCY_ACTIONS',
        COMMON: 'LUCY_ACTIVITY_COMMON',
        SCRUM: 'LUCY_ACTIVITY_SCRUM',
        RESPONSE: 'LUCY_RESPONSE_HANDLER'
    },
    KAFKA_CONSUMER_GROUPS: {
        INTENT_ANALYSER: 'CG_INTENT_ANALYZERS',
        ACTION_HANDLERS: 'CG_ACTION_HANDLERS',
        SCRUM_TASK: 'CG_SCRUM_HANDLER',
        RESPONSE_HANDLERS: 'CG_RESPONSE_HANDLER',
        COMMON_TASK: 'CG_COMMON_HANDLER'
    },
    ZOOKEEPER: {
        HOST: '0.0.0.0',
        PORT: '2181'
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
        keyFilepath: './server/speechToText/googleKey.json'
    },

    WATSON_TEXT_TO_SPEECH: {
        auth: {
            'username': 'c011d12a-080e-466c-97d8-28a3d2bffc95',
            'password': 'Y7pdB42Cb0cI'
        },
        params: {
            text: '',
            voice: 'en-US_AllisonVoice',
            accept: 'audio/wav'
        }
    },

    GOOGLE_AUTH: {
        clientID: '212833991044-l102mt5bjeqtmqap3kj976me3km8jr5i.apps.googleusercontent.com',
        clientSecret: 'aHR-3D-AvSDgeU3ne8BjIz6q',
        callbackURL: '/auth/google/callback'
    },

    JWT_AUTH: {
        secret: 'lucy'
    },

    RECAST: {
        token: 'Token 275b6b3c7467bc43237b4617d99fd1df'
    },

    TAIGA: {
        apiUrlAuth: 'https://api.taiga.io/api/v1/auth',
        userName: 'lucywave16',
        password: 'lucy@123',

        apiUrl: 'https://api.taiga.io/api/v1/',
        apiUrlProject: 'https://api.taiga.io/api/v1/projects',
        apiUrlMember: 'https://api.taiga.io/api/v1/memberships',
        apiUrlUserStories: 'https://api.taiga.io/api/v1/userstories',
        apiUrlTask: 'https://api.taiga.io/api/v1/tasks',
        apiUrlSprint: 'https://api.taiga.io/api/v1/milestones',

        token: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    },
    REDIS_CLIENT: {
        host: 'localhost',
        port: 6379
    }
};

config.ZOOKEEPER['URL'] = config.ZOOKEEPER.HOST + ":" + config.ZOOKEEPER.PORT;

module.exports = config;
