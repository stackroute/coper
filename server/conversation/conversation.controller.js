 var mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost:27017/lucy");

 var db = mongoose.connection;

 db.on("error", console.error.bind(console, "connection error"));
 db.once("open", function(callback) {
     console.log("Connection succeeded.");
});

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

 var Temp = mongoose.model("Temp", dataModelSchema);

 var dataModelValues = new Temp({
     userName: "shaan",
     profileImage: "/home/workspace/123.jpg",
   	 conversationID: "qwerty12345",
     userAgent: "chrome",
     startTime: "12:39:34",
     endTime: "00:00",
     context: {
     	intent: "Create Project",
     	payload: [{"sdgfdsfsd":"asdasdkag"}]
     },
     interactions:[
     {
     	uttarance: "create project named lucy",
     	response: {
     		messages: ["what members you want to add","String"]
     	},
     	action: ["String"],
     	intent: "create Project"
     }]
});
dataModelValues.createModel(function(error) {
    console.log("Your dataModelValues has been saved!");
if (error) {
     console.error(error);
  }
 });