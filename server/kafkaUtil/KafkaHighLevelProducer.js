const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.Client();
const producer = new HighLevelProducer(client);

const msg=function(payloads){
    payloads = [
        { topic: 'utterances', messages: 'hello heros' }
    ];

    producer.on('ready', function () {
	payloads.forEach(function(msg){
		producer.send([msg], function (err, data) {
        	if(err)
        		console.log(err)
        	else
        		console.log(data);
    	   });
	   });
    });
}
module.exports=msg;