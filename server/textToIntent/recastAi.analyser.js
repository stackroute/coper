
  var recastConfig   = require('./config.js');


var intentJson = require('superagent');
intentJson
.post('https://api.recast.ai/v2/converse')
.send({
	text:'create project lucy with member jesica',
	language:'en'
       })

.set('Authorization', recastConfig.token)
	
 .end(function(err, res) {
  //  console.log(res.text);

    var json = JSON.parse(res.text);
    
   // // console.log(json);
    var filterObj = {
    	responseAction:{
    		intent: '',
    		status: false,
    		reply:''
           },
           nextAction:[{
             intent:'',
             status:false,
             reply:''

           }],

           botMemory:{
           	'storyName':'',
           	'sprintName':'',
           	'wishing':'',
           	
            'greeting':'',


            'projectName':{confidence:0.0 ,  value :''},
            'memberName' :{confidence:0.0 ,  value :''}
 
           },


           mainIntent :[{confidence : 0, intent :''}]
           


    };
       //responseAction
      filterObj.responseAction.intent = json.results.action.slug;
      filterObj.responseAction.status = json.results.action.done;
      filterObj.responseAction.reply = json.results.action.reply;

     //for nextAction
     filterObj.nextAction[0].intent = json.results.next_actions[0].slug;
     filterObj.nextAction[0].status = json.results.next_actions[0].done;
     filterObj.nextAction[0].reply = json.results.next_actions[0].reply;

    // bot memory
     filterObj.botMemory.storyName = json.results.memory["story-name"];
     filterObj.botMemory.sprintName = json.results.memory["sprint-name"];
     filterObj.botMemory.wishing = json.results.memory.wishing;
     filterObj.botMemory.greeting = json.results.memory.greeting;
     filterObj.botMemory.projectName.confidence = json.results.memory["project-name"].confidence;
     filterObj.botMemory.projectName.value = json.results.memory["project-name"].value;

    filterObj.botMemory.memberName.confidence = json.results.memory["member-name"].confidence;
    filterObj.botMemory.memberName.value = json.results.memory["member-name"].value;
    



  //mainIntent

   filterObj.mainIntent[0].confidence =  json.results.intents[0].confidence;
   filterObj.mainIntent[0].intent =  json.results.intents[0].slug;








console.log(filterObj);
  });


 module.exports = intentJson;
