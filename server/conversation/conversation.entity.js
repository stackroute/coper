var mongoose = require('mongoose');

var Schema = mongoose.Schema;

 var dataModelSchema = new Schema({
     userName:{
     	type: String,
     	required: true,
     	unique: true
     },
     profileImage:{
     	type: String
     },
   	 conversationID:{
   	 	type: String,
   	 	required: true,
   	 },
     userAgent:{
     	type: String
     },
     startTime:{
     	type: String
     },
     endTime:{
     	type: String
     },
     context: {
     	type: {},
     	intent: {
     		type: String,
     		required: true
     	},
     	payload: {
     		type: [String]
     	}
     },
     interactions:[
     {
     	uttarance: {
     		type: String,
     		required: true
     	},
     	response: {
     		messages: []
     	},
     	action:[],
     	intent: {
     		type: String
     	}
     }]
 });

 module.exports = mongoose.model('Conversation', dataModelSchema, 'conversations');
 // 'conversations' is the name of our collection in database 'lucy'