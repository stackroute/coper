var session = {
    audio: true,
    video: false
};
var stopButton = document.getElementById('stop');
console.log(stopButton);
var client = new BinaryClient('ws://localhost:9001');
var audioInput = null;
var Stream=null;
function record() {
    navigator.getUserMedia(session, initializeRecorder, onError);
}
function stop(stream) {
    console.log('stop');
    stream.stop.bind(stream);
    audioInput.disconnect();
}
function onError() {
    console.log('error');
}
function initializeRecorder(stream) {
    var audioContext = window.AudioContext || window.webkitAudioContext;
    var context = new audioContext();
    audioInput = context.createMediaStreamSource(stream);
    var bufferSize = 2048;
    // create a javascript node
    var recorder = context.createScriptProcessor(bufferSize, 1, 1);
    // specify the processing function
    recorder.onaudioprocess = recorderProcess;
    // connect stream to our recorder
    audioInput.connect(recorder);
    // connect our recorder to the previous destination
    recorder.connect(context.destination);
}
function recorderProcess(e) {
    var left = e.inputBuffer.getChannelData(0);
    console.log('recorderProcess');
    Stream.write(convertFloat32ToInt16(left));
}
client.on('open', function() {
    // for the sake of this example let's put the stream in the window
    Stream = client.createStream();
    Stream.on('pause', function(){
      console.log('paused');
    })
});
function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
    }
    return buf.buffer;
}
