let mongoose = require('mongoose');
const CONVERSATION_LANGUAGES = ['en', 'fr'];
const CONVERSATION_REPLIES =['incomplete'];

let schema = new mongoose.Schema({
     userName: { type: String, required: true},
     userAgent: { type: String },
     startTime: { type: Date, default: Date.now(), required: true },
     endTime: { type: Date, default: Date.now() },
     context: {
          activity: { type: String },
          language: { type: String, enum: CONVERSATION_LANGUAGES },
          payload: []
     },
     interactions:[
     {
          utterance : { type: String, required: true },
          timestamp: { type: Date, default: Date.now, required: true},
          intention: {
               intent: { type: String},
               status: { type: Boolean },
               confidence: { type: Number }
          },
          replies: [
          {
               reply: { type: String },
               type: { type: String, enum: CONVERSATION_REPLIES },
               payload: []
          }
          ],
          action: {
               name: { type: String },
               tasks: [
               {
                    topic: { type: String },
                    payload: {},
                    response: {}
               }
               ]
          }
     }
     ]
}, {collection: 'conversations'});

module.exports = mongoose.model('Conversations', schema, 'conversations');
