'use strict';

//Binary socket
const binaryServer = require('binaryjs').BinaryServer;
const WebSocket = require('ws');
const wav = require('wav');
const fs = require('fs');
const Speech = require('@google-cloud/speech');
const projectId = 'gothic-depth-160205';
const speechClient = Speech({projectId: projectId, keyFilename: './server/websockets/key.json'});

const webSocketServer = function(server) {
  try {
    const bServer = binaryServer({server});
    //Websocket server
    const wss = new WebSocket.Server({port: 8081});
    wss.on('connection', function connection(ws) {
        console.log('wss+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        ws.send('sss')

        bServer.on('connection', function(client) {
            console.log('connected ****************************************************');

            client.on('stream', function(stream, meta) {
                stream.pipe(speechClient.createRecognizeStream({
                    config: {
                        encoding: 'LINEAR16',
                        sampleRate: 44100,
                        languageCode: 'en-IN'
                    },
                    singleUtterance: false,
                    interimResults: true
                })).on('error', console.error).on('data', function(data) {
                    console.log(data.results);
                    ws.send(data.results)
                    if (data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED')
                        console.log(data.results);

                    }
                ); //sourav end
                stream.on('write', function() {
                    console.log('write');
                })
                stream.on('end', function() {
                    console.log('end...');
                    console.log('file end');
                });
            });

            client.on('close', function() {
                console.log('close');
                console.log('test');
            });
        });
    });
  } catch (e) {
    console.log(e);
  } finally {

  }

}

module.exports = webSocketServer;
