const chai = require('chai');
let mongoose = require('mongoose');
const expect = chai.expect;
const conversation = require('./conversation.entity');
const conversationController = require('./conversation.controller');
const conversationRouter = require('./conversation.router');
 mongoose.connect("mongodb://localhost:27017/lucy");

 var datetime = new Date();
        var dataModelValues = new conversation({
           userName: "lollol",
           userAgent: "chrome",
           startTime: datetime,
           endTime: datetime,
           context: {
              activity: "Create Project",
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
            expect('lollol').to.equal(analysisRes.userName);
            // expect(utteranceText).to.equal(analysisRes.result.utterance);
            // expect('object').to.equal(typeof analysisRes.result.intention);
            // expect('create-project').to.equal(analysisRes.result.intention.intent);
            done();
        },function(err)
        {
            console.log(err);

        });
    });

    it ('Testing for find the a conversation', function(done){
      this.timeout(5000);
      let strtdate = new Date('2017-04-06T18:42:10.679Z');
      let userName = 'lollol';
      const analyser = require('./conversation.controller');
      console.log(strtdate);
      analyser.findUserConversation(userName,strtdate).then(function(analysisRes){
        expect(analysisRes).to.not.equal(null);
        expect(analysisRes).to.not.equal(undefined);
        expect('lalalal').to.not.equal(analysisRes.userName);
        expect(strtdate).to.not.equal(analysisRes.startTime);
        done();

      },function(err)
      {
        console.log(err);
      });
    });

    it('testing for update the context of a converstaion', function(done){
      this.timeout(5000);
      let startdate= new Date('2017-04-06T19:43:19.760Z');
      let userName = 'lollol';
      const analyser = require('./conversation.controller');
      let context={ activity: 'create project Lui', language: 'en', payload: [ 'luccy' ] };
      analyser.updateUserConversation(userName,startdate,context).then(function(analysisRes){
        expect(analysisRes).to.not.equal(null);
        expect(analysisRes).to.not.equal(undefined);
        expect(analysisRes.nModified).to.not.equal(0);
        done();
      },function(err)
      {
        console.log(err);
        throw err;
      });
    });

     it ('Testing for find User Last conversation', function(done){
      this.timeout(5000);
      // let strtdate = new Date('2017-04-04T09:56:21.402Z');
      let userName = 'lollol';
      const analyser = require('./conversation.controller');
     // console.log(strtdate);
      analyser.findLastUserConversation(userName).then(function(analysisRes){
        expect(analysisRes).to.not.equal(null);
        expect(analysisRes).to.not.equal(undefined);
        expect('lollol').to.not.equal(analysisRes.userName);
       // expect(strtdate).to.not.equal(analysisRes.startTime);
        done();

      },function(err)
      {
        console.log(err);
      });
    });


          it ('Testing for find User interaction', function(done){
      this.timeout(10000);
      // let strtdate = new Date('2017-04-04T09:56:21.402Z');
      let utterance = 'create project named lala';
      let startdate= new Date('2017-04-06T19:50:32.982Z');
      const analyser = require('./conversation.controller');
     // console.log(strtdate);
      analyser.findSpecificInteraction(utterance,startdate).then(function(analysisRes){
        expect(analysisRes).to.not.equal(null);
        expect(analysisRes).to.not.equal(undefined);
        console.log(analysisRes.interactions[0].utterance);
        expect('create project named lala').to.equal(analysisRes.interactions[0].utterance);
       // expect(strtdate).to.not.equal(analysisRes.startTime);
       console.log(analysisRes);
        done();

      },function(err)
      {
        console.log(err);
      });
    });


      it('testing for update the interaction of a converstaion', function(done){
      this.timeout(5000);
      let startdate= new Date('2017-04-06T19:43:19.760Z');
     let utterance = 'create project named lala';
      const analyser = require('./conversation.controller');
      let interactions={
              utterance: "do something else",
              timestamp: datetime,
              intention: {
                intent: "create project",
                status: true,
                confidence: .90
            },
            replies: [
            {
               reply: "add someone else",
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
      }};
      analyser.updateSpecificInteraction(utterance,startdate,interactions).then(function(analysisRes){
        expect(analysisRes).to.not.equal(null);
        expect(analysisRes).to.not.equal(undefined);
        expect(analysisRes.nModified).to.not.equal(0);
        console.log("analyysisis >>> "+analysisRes);
        done();
      },function(err)
      {
        console.log(err);
        throw err;
      });
    });

  });