//Get the input from the intents topic
//some more data analysis we might have to do
//resolve to a specific Task, by considering the intent, results of intent analys,
//Publish a message to Task's topic, with the necessary data (forward data from intents topics)
//If the tasks's topic does not exist, create it dynamically (kafka api call)
// const config = require(../../config/config)
const log4js = require('log4js');
log4js.loadAppender('console');
const taigaTask = require('../appTasks/taigaTask');
const generalisedTask = require('../appTasks/generalisedTask');

const result = {
	activity:'create project'.

}
const processForAction = function(result){
	logger.debug('result from intent to text',JSON.stringify(result));
   	let data={
   	activity: result.activity
   	}
   if(activity ==='undefined')
   {
   		generalisedTask.taskAnalyzer(result);
   }
}
module.exports = {
	processForAction : processForAction
};