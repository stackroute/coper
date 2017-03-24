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


const client = new BinaryClient('ws://localhost:8080');
const session = {
    audio: true,
    video: false
};
let Stream = null;
let x = 0;
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
    Stream.write(convertFloat32ToInt16(left));
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
// client.on('open', function() {
//     console.log('client open');
//     Stream = client.createStream();
//     console.log('aas');
//     Stream.on('pause', function() {
//         console.log('paused');
//     })
// });

let decoder = null;
class InstructionProcessor extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            text: '',
            recorderOpen: false,
            paperColor: '#EEF3F2',
            iconColor: '#ccc',
            micColor: '#CCCCCC'
        }
    }
    componentDidMount()
    {
         const that = this;
        this.socket = new WebSocket('ws://localhost:8081/');

        this.socket.addEventListener('open', (e) => {
            this.socket.send('sending from client@browser', function(err) {
                if (err) {
                    console.log('Error: ', err);
                    this.setState({error: err});
                }
                console.log('Send message');
            });
        });

        this.socket.addEventListener('message', (newMsg) => {
          if(newMsg.data.length > 0 )
          {
            console.log(newMsg.data);
            that.setState({text : newMsg.data});
          }
        });
        client.on('open', function() {
            console.log('kkk');
            // for the sake of this example let's put the stream in the window
            Stream = client.createStream();
            that.handleRecord();
            Stream.on('pause', function() {
                console.log('paused');
            })

        })
    }

    handleChange(event)
    {
        this.setState({text: event.target.value});
    }
    handleFocus()
    {
        this.setState({paperColor: '#FFFFFF'});
    }
    handleBlur()
    {
        this.setState({paperColor: '#EEF3F2'});
    }
    handleRecord()
    {

        console.log('recording');
        this.setState({
            recorderOpen: !this.state.recorderOpen
        });
        if (x % 2 == 0) {
            Stream = client.createStream();
            navigator.getUserMedia(session, initializeRecorder, onError);
            this.setState({micColor: '#F7A808'});
        } else {
            Stream.end();
            this.setState({micColor: '#CCCCCC'});
        }
        x++;
    }
    handleSend()
    {
        console.log('sending');
        this.setState({text: ''});
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
