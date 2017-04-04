const chai = require('chai');
let mongoose = require('mongoose');
const expect = chai.expect;
const conversation = require('./conversation.entity');
const conversationController = require('./conversation.controller');
const conversationRouter = require('./conversation.router');
 mongoose.connect("mongodb://localhost:27017/lucy");

 var datetime = new Date();
        var dataModelValues = new conversation({
           userName: "lalala",
           userAgent: "chrome",
           startTime: datetime,
           endTime: datetime,
           context: {
              intent: "Create Project",
              language: 'en',
              payload: ["asdasd"]
          },
          interactions:[
          {
              utterance: "create project named lala",
              timestamp: datetime,
              intention: {
                intent: "create project",
                status: true,
                confidence: .90
            },
            replies: [
            {
               reply: "please provide member names",
               type: "incomplete",
               payload: ["asdafsd"]
           }
           ],
           action: {
            name: "projectCreation",
            tasks: [
            {
              topic: "scrum",
              payload: {},
              response: {}
          }
          ]
      }
  }]
  });


describe('Test plan for conversation Analys', function() {
    it('Testing for saving a conversation', function(done){
        this.timeout(5000);

        const analyzer = require('./conversation.controller');

        analyzer.saveUserConversation(dataModelValues).then(function(analysisRes){

            //console.log("saveUserConversation result: ", JSON.stringify(analysisRes));
            expect(analysisRes).to.not.equal(null);
            expect(analysisRes).to.not.equal(undefined);
            expect('lalala').to.equal(analysisRes.userName);
            // expect(utteranceText).to.equal(analysisRes.result.utterance);
            // expect('object').to.equal(typeof analysisRes.result.intention);
            // expect('create-project').to.equal(analysisRes.result.intention.intent);
            done();
        },function(err)
        {
            console.log(err);

        });
    });
        });
