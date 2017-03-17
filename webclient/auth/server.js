'use strict';
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');
const fs = require('fs');
const Speech = require('@google-cloud/speech');
const projectId = 'gothic-depth-160205';
const speechClient = Speech({
  projectId: projectId,
  keyFilename: './key.json'
});
//var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

// Your Google Cloud Platform project ID

var server = binaryServer({port: 9001});

server.on('connection', function(client) {
  console.log('connected');
  var fileWriter = null;

 client.on('stream', function(stream, meta) {
  //console.log(stream);
  var fileWriter = new wav.FileWriter('demo.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

 stream.pipe(fileWriter);

 stream.on('end', function() {
    console.log('end');

   fileWriter.end();
  });
});

 client.on('close', function() {
    console.log('close');
    console.log('test');

// Instantiates a client
fs.createReadStream('./demo.wav')
  .on('error', console.error)
  .pipe(speechClient.createRecognizeStream({
    config: {
      encoding: 'LINEAR16',
      sampleRate: 48000,
      languageCode:'en-IN'
    },
    singleUtterance: false,
    interimResults: false
  }))
  .on('error', console.error)
  .on('data', function(data) {
    if(data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED')
    console.log(data.results);
  });//sourav end

// // Promises are also supported by omitting callbacks.
// speech.recognize('./audio.raw', {
//   encoding: 'LINEAR16',
//   sampleRate: 16000
// }).then(function(data) {
//   var transcript = data[0];
// });
//
// // It's also possible to integrate with third-party Promise libraries.
// // var speech = require('@google-cloud/speech')({
// //   promise: require('bluebird')
// // });
if (fileWriter != null) {
  fileWriter.end();
}
});
});
