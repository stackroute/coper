import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import {
    Container,
    Grid,
    Row,
    Col,
    ScreenClassRender,
    ClearFix
} from 'react-grid-system';
import './interaction.css';
//const BinaryClient = require('binaryjs').BinaryClient;
import io from 'socket.io-client';
import ss from 'socket.io-stream';


//import Speaker from 'speaker';
//import Readalong from 'react-readalong-component';
const styles = {
    paperStyle: {
        backgroundColor: '',
        width: 'auto',
        padding: '0px 20px 0px 20px',
        borderRadius: '4px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    },
    textFieldStyle: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        width: 'auto'
    },
    iconButtonStyle: {
        height: '28px',
        width: '28px',
        padding: '0px'
    },
    sendIconButtonStyle: {
        height: '30px',
        width: '30px',
        backgroundColor: '#FFFFFF',
        borderRadius: '30px'
    },
    hintStyle: {
        color: '#FFFFFF'
    },
    inputStyle: {
        color: '#FFFFFF'
    },
    progressStyle: {
      color: ''
    },
    linearProgressStyle: {
      height: '10px',
      marginTop: '10px'
    }
}
//const client = new BinaryClient('/');
const session = {
    audio: true,
    video: false
};
//let Stream = null;
let stream = null;
let x = 0;
let f = false;
const convertFloat32ToInt16 = function(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
    }
    return buf.buffer;
}
const recorderProcess = function(e) {
    const left = e.inputBuffer.getChannelData(0);
    //Stream.write(convertFloat32ToInt16(left));
    stream._write(convertFloat32ToInt16(left), 'LINEAR16', function() {});
}
const initializeRecorder = function(stream) {
    const audioContext = window.AudioContext || window.webkitAudioContext;
    const context = new audioContext();
    const audioInput = context.createMediaStreamSource(stream);
    const bufferSize = 2048;
    // create a javascript node
    const recorder = context.createScriptProcessor(bufferSize, 1, 1);
    // specify the processing function
    recorder.onaudioprocess = recorderProcess;
    // connect stream to our recorder
    audioInput.connect(recorder);
    // connect our recorder to the previous destination
    recorder.connect(context.destination);
}
const onError = function() {
    console.log('error');
}
class InstructionProcessor extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            text: '',
            conversation: {
                userToken: '',
                startTime: ''
            },
            utterance: '',
            recorderOpen: false,
            paperColor: 'rgba(233, 240, 238,0)',
            iconColor: '#ccc',
            micColor: '#CCCCCC',
            progressColor: '',
            quickReplies: [
                'Sure!!', 'Working on it :)', 'Looking into it..', 'Anything for you ;)', 'Okay sir, doing it for you'
            ],
            waitingReplies: ['Pardon me for delay', 'Please wait a little']
        }
    }

    componentDidMount()
    {
        this.socket = io();
        this.timeout = null;
        const that = this;
        const conv = this.state.conversation;
        let previous = '';
        conv.userToken = localStorage.getItem('lucytoken');
        this.setState({conversation: conv});
        // this.siriwave = new SiriWave({
        //     container: document.getElementById('siriwave'),
        //     style: 'ios9',
        //     width: '100%',
        //     height: 200,
        //     autostart: true
        // });
        //On receiving speech to text
        this.socket.on('send::text', (newText) => {
            if (newText.trim() !== '') {
                //Checking if it is repeating same text and is recorder open
                if (previous != newText && this.state.recorderOpen === true) {
                    this.setState({utterance: newText});
                    window.clearTimeout(this.timeout);
                    //Setting utterance gap and sending to sendUtterance
                    this.timeout = setTimeout(function() {
                        that.sendUtterance();
                    }, 2000);
                    previous = newText;
                }
            }
        });

        this.socket.emit('send::userToken', localStorage.getItem('lucytoken'));
        //On conversation start event
        this.socket.on('conversation::start', (convObj) => {
            this.onConversationStart(convObj);
        });
        //On conversation response event
        this.socket.on('conversation::response', (responseObj) => {
            responseObj.activityResponse.bot = true;
            console.log("**** conversation response: ", responseObj.activityResponse);
            this.props.setNewMessage(responseObj.activityResponse);
            //Setting response time
            const responseTime = this.responseTime;
            window.clearTimeout(this.responseTime);
            //Forwarding responsetime in conversationTL
            this.props.setResponseTime(this.getResponseTimeMSM(responseTime));
            //Forwarding response to conversationTL
            window.clearTimeout(this.delayTimeout);

        });
        //On conversation end event
        this.socket.on('conversation::end', (convObj) => {
            //resetting conversation object
            this.onConversationEnd();
        });
        //On utterance received event
        this.socket.on('utterance::received', (utterance) => {
            //for testing
            this.props.setResponseTime(this.getResponseTimeMSM(this.getRandomInt(10, 100101010)));
            //start counting response time
            this.setResponseTime();
            //Forwarding utterance to conversationTL
            this.props.setNewMessage({contentType: 'shorttext', content: utterance, purpose: 'Acknowledgement', bot: false});
            //Showing quick replies or Acknowledgement
            let index = this.getRandomInt(0, this.state.quickReplies.length - 1);
            setTimeout(function() {
                that.props.setNewMessage({contentType: 'shorttext', content: that.state.quickReplies[index], purpose: 'Acknowledgement', bot: true});
                that.textToSpeech(that.state.quickReplies[index]);
            }, 1000);
            //Starting audio stream
            this.startAudioStream();
        });

        ss(this.socket).on('stream::textToSpeech', (speechStream) => {
            //speechStream.pipe(this.speaker);
            speechStream.on('data', function(data) {
                //console.log(data);
            })
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getResponseTimeMSM(timeInMilis) {
        const min = Math.floor(timeInMilis / (60 * 1000));
        const sec = Math.floor((timeInMilis % (60 * 1000)) / 1000);
        const mili = timeInMilis % 1000;
        let timeString = '';
        if (min != 0) {
            timeString += (min + ' Min');
        }
        if (sec != 0) {
            timeString += (sec + ' Sec');
        }
        if (mili != 0) {
            timeString += (mili + ' MiliSec');
        }
        return timeString;
    }
    sendUtterance() {
        const that = this;
        // As the time pause elaspses, a new uttarance has to start, hence reset current stream
        this.stopAudioStream();
        console.log({contentType: 'shorttext', content: this.state.utterance, purpose: 'Acknowledgement'});
        //Communicate to parent about the new utterance
        //this.props.setNewMessage({contentType: 'shorttext', content: this.state.utterance, purpose: 'Acknowledgement'});
        //Send the uttarance to server too
        //On server update the utterance timestamp, accoridng to Server's time settings, so that it is consistent
        this.socket.emit('utterance::new', {
            conversation: this.state.conversation,
            utterance: this.state.utterance
        });

        this.setWaitingReply();
    }

    setResponseTime() {
        this.responseTime = setTimeout(function() {
            //Do nothing for now
        }, 10 * 60 * 1000);
    }

    setWaitingReply() {
        const that = this;
        this.delayTimeout = setTimeout(function() {
            let index = that.getRandomInt(0, that.state.waitingReplies.length - 1);
            that.props.setNewMessage({contentType: 'shorttext', content: that.state.waitingReplies[index], purpose: 'Acknowledgement', bot: true});
            that.textToSpeech(that.state.waitingReplies[index]);
        }, 8000);
    }

    setProgressColor() {
      this.setState({progressColor: 'rgb('+this.getRandomInt(0,255)+','+this.getRandomInt(0,255)+','+this.getRandomInt(0,255)+')'})
    }

    changeProgressColor() {
      const that = this;
      this.progressInterval = setInterval(function(){
        that.setProgressColor();
      },100);
    }
    onConversationStart(convObj) {
        console.log('convObj', convObj);
        this.setState({
            conversation: {
                startTime: convObj.startTime
            }
        });
    }

    onConversationEnd() {
        this.resetConversation();
    }

    resetConversation() {
        this.setState({
            conversation: {
                startTime: ''
            }
        });
    }

    textToSpeech(text)
    {
        console.log(text);
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.lang = 'en-US-male';
        msg.rate = .8;
        msg.volume = 2;
        if (typeof this.props.voice === 'object') {
            msg.voice = this.props.voice;
        }
        msg.addEventListener('end', this._speechDidEnd);
        msg.addEventListener('error', this._speechDidError);
        window.speechSynthesis.speak(msg);
    }

    stopAudioStream() {
        if (stream != null)
            stream.end();
        }

    startAudioStream() {
        stream = ss.createStream();
        ss(this.socket).emit('stream::speech', stream);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }
    handleFocus() {
        this.setState({paperColor: 'rgba(233, 240, 238,0.1)'});
    }
    handleBlur() {
        this.setState({paperColor: 'rgba(233, 240, 238,0)'});
    }
    handleRecord() {
        console.log('recording');
        this.setState({
            recorderOpen: !this.state.recorderOpen
        });
        if (x === 0) {
            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }
        if (x % 2 == 0) {
            // Stream = client.createStream();
            // navigator.getUserMedia(session, initializeRecorder, onError);
            stream = ss.createStream();
            ss(this.socket).emit('stream::speech', stream);
            navigator.getUserMedia(session, initializeRecorder, onError);
            this.setState({micColor: '#F7A808'});
            this.changeProgressColor();
        } else {
            stream.end();
            this.setState({micColor: '#CCCCCC'});
            window.clearInterval(this.progressInterval);
        }
        x++;
    }
    handleSend() {
        const that = this;
        if (this.state.text.trim() !== '') {
            this.setState({utterance: this.state.text, text: ''});
            setTimeout(function() {
                that.sendUtterance();
            }, 500)
        }
    }
    handleAttachment()
    {}
    handleKeyPress(event)
    {
        let that = this;
        if (event.charCode === 13) {
            this.handleSend();
            setTimeout(function() {
                that.setState({text: ''});
            }, 50)
        }
    }
    render()
    {
        styles.paperStyle.backgroundColor = this.state.paperColor;
        styles.progressStyle.color = this.state.progressColor;
        let icons = null;
        let inputField;
        if (this.state.recorderOpen) {
            inputField = (
              <LinearProgress mode="indeterminate" color={styles.progressStyle.color} style={styles.linearProgressStyle}/>
            );
        } else {
            inputField = (<TextField fullWidth={true} name='searchtext' className="message-input" value={this.state.text} hintText='Write something..' hintStyle={styles.hintStyle} inputStyle={styles.inputStyle} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>);
        }
        if (this.state.text === '') {
            icons = (
                <span>
                    <Col xs={2} sm={2} md={2} lg={2} style={{
                        textAlign: 'center'
                    }}>
                        <IconButton className="message-submit" style={styles.sendIconButtonStyle} onTouchTap={this.handleRecord.bind(this)}>
                            <svg fill={this.state.micColor} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </IconButton>
                    </Col>
                </span>
            );
        } else {
            icons = (
                <span >
                    <Col xs={2} sm={2} md={2} lg={2} style={{
                        textAlign: 'center'
                    }}>
                        <IconButton className="message-submit" style={styles.sendIconButtonStyle} onTouchTap={this.handleSend.bind(this)}>
                            <svg fill="#1CAB98" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </IconButton>
                    </Col>
                </span>
            );
        }
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Paper style={styles.paperStyle} zDepth={0}>
                            <div>
                                <Row>
                                    <Col xs={10} sm={10} md={10} lg={10}>
                                        {inputField}
                                    </Col>
                                    {icons}
                                    <ClearFix/>
                                </Row>
                            </div>
                        </Paper>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default InstructionProcessor;
