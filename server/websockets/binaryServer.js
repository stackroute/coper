const binaryServer = require('binaryjs').BinaryServer;
const wav = require('wav');
const fs = require('fs');
const Speech = require('@google-cloud/speech');
const projectId = 'gothic-depth-160205';
const speechClient = Speech({projectId: projectId, keyFilename: './server/websockets/key.json'});

const binaryServerFunc = function(server){
  const bServer = binaryServer({server});
  bServer.on('connection', function(client) {

      client.on('stream', function(stream, meta) {
          stream.pipe(speechClient.createRecognizeStream({
              config: {
                  encoding: 'LINEAR16',
                  sampleRate: 44100,
                  languageCode: 'en-IN'
              },
              singleUtterance: false,
              interimResults: true
          }))
          .on('error', function(err){
            //@TODO handle the error and communicate to client socket appropriately
            console.error(err);
          })
          .on('data', function(data) {
              if(data.results.length > 0)
                client.send({data:data.results});

                //@TODO On uttrance is complete, send the text to detect the intent and further processing

              // if (data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED')
              //     console.log(data.results);
              }
          );

          stream.on('end', function() {

            //TODO something
          });
      });

      client.on('close', function() {
          bServer.close();
      });
  });
}

module.exports = binaryServerFunc;
