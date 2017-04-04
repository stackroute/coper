import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {
    Container,
    Grid,
    Row,
    Col,
    ScreenClassRender,
    ClearFix
} from 'react-grid-system';
//const BinaryClient = require('binaryjs').BinaryClient;

import io from 'socket.io-client';
import ss from 'socket.io-stream';

const styles = {
    paperStyle: {
        backgroundColor: '',
        width: 'auto',
        padding: '0px 20px 0px 20px',
        borderRadius: '4px'
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
        height: '40px',
        width: '40px',
        padding: '0px',
        backgroundColor: '#FFFFFF',
        borderRadius: '30px'
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
    console.log('fff');
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
            conversation: { userToken: '',
              startTime: ''
            },
            utterance: '',
            recorderOpen: false,
            paperColor: '#EEF3F2',
            iconColor: '#ccc',
            micColor: '#CCCCCC'
        }
    }

    onConversationStart(convObj) {
      this.setState({
        conversation: { startTime: convObj.startTime }
      });
    }

    onConversationEnd() {
        this.resetConversation();
    }

    resetConversation() {
      this.setState({
        conversation: { startTime: '' }
      });
    }

    componentDidMount()
    {
        this.socket = io();
        this.timeout = null;
        const that = this;
        const conv = this.state.conversation;
        conv.userToken = localStorage.getItem('lucytoken');
        this.setState({conversation: conv});
        this.socket.on('send::text', (newText) => {
            if (newText.trim() !== '') {
                this.setState({
                  utterance: newText
                });
                window.clearTimeout(this.timeout);
                console.log(this.timeout);
                this.timeout = setTimeout(function() {
                    that.sendUtterance();
                }, 2000);
            }
        });
        this.socket.emit('send::userToken',localStorage.getItem('lucytoken'));
        this.socket.on('conversation::start',(convObj) => {
          this.onConversationStart(convObj);
        });
        this.socket.on('conversation::start',(convObj) => {
          this.onConversationEnd();
        });
    }

    sendUtterance() {
        // As the time pause elaspses, a new uttarance has to start, hence reset current stream
        this.resetAudioStream();

        //Communicate to parent about the new utterance
        this.props.setNewMessage(this.state.utterance);
        console.log('utterance');
        //Send the uttarance to server too
        //On server update the utterance timestamp, accoridng to Server's time settings, so that it is consistent
        this.socket.emit('utterance::new', {
          conversation: this.state.conversation,
          utterance: this.state.utterance
        });
    }

    resetAudioStream() {
      if (stream != null)
          stream.end();

      stream = ss.createStream();

      ss(this.socket).emit('stream::speech', stream);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleFocus() {
        this.setState({paperColor: '#FFFFFF'});
    }

    handleBlur() {
        this.setState({paperColor: '#EEF3F2'});
    }

    handleRecord() {
        console.log('recording');
        this.setState({
            recorderOpen: !this.state.recorderOpen
        });
        if (x % 2 == 0) {
            // Stream = client.createStream();
            // navigator.getUserMedia(session, initializeRecorder, onError);
            stream = ss.createStream();
            ss(this.socket).emit('stream::speech', stream);
            navigator.getUserMedia(session, initializeRecorder, onError);

            this.setState({micColor: '#F7A808'});
        } else {
            stream.end();
            this.setState({micColor: '#CCCCCC'});
        }
        x++;
    }
    handleSend() {
        console.log('sending');
        const message = this.state.message;
        utterance.text = this.state.text;
        this.setState({message: message,text: ''});
        this.sendUtterance();
    }
    handleAttachment()
    {
        console.log('attachment');
    }
    handleKeyPress(event)
    {
        if (event.charCode === 13) {
            this.handleSend();
            this.setState({text: ''});
        }
    }
    render()
    {

        styles.paperStyle.backgroundColor = this.state.paperColor;
        let icons = null;
        if (this.state.text === '') {
            icons = (
                <span>
                    <IconButton style={styles.iconButtonStyle} onTouchTap={this.handleRecord.bind(this)}>
                        <svg fill={this.state.micColor} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </IconButton>
                    <IconButton style={styles.iconButtonStyle} onTouchTap={this.handleAttachment.bind(this)}>
                        <svg fill={this.state.iconColor} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </IconButton>
                </span>
            );
        } else {
            icons = (
                <span >
                    <IconButton style={styles.sendIconButtonStyle} onTouchTap={this.handleSend.bind(this)}>
                        <svg fill="#1CAB98" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </IconButton>
                </span>
            );
        }
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Paper style={styles.paperStyle} zDepth={2}>
                            <div>
                                <TextField fullWidth={true} name='searchtext' value={this.state.text} multiLine={true} rowsMax={4} hintText='Write something..' onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/> {icons}
                                <ClearFix/>
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default InstructionProcessor;
