import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import ScrollArea from 'react-custom-scrollbars';
import InteractionTimeLine from './InteractionTimeLine.jsx';
import InstructionProcessor from './instructionProcessor.jsx';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import './interaction.css';
import {
    Container,
    Grid,
    Row,
    Col,
    ScreenClassRender,
    Hidden
} from 'react-grid-system';
import './interaction.css';
const ReactMarkdown = require('react-markdown');
const styles = {
    responseTimeStyle: {
        float: 'right',
        right: '10px'
    },
    welcomePaperStyle: {
        width: '50%',
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    welcomeHeaderText: {
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: '900',
        fontFamily: 'Georgia'
    }
}
class ConversationView extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            messages: [],
            tempMessages: [],
            timeString: ''
        }

        this.setNewMessage = this.setNewMessage.bind(this);
        this.setResponseTime = this.setResponseTime.bind(this);
    }
    componentWillMount()
    {
        window.addEventListener('load', this.changeChatHeight.bind(this));
        window.addEventListener('resize', this.changeChatHeight.bind(this));
        //this.changeChatHeight();
    }

    changeChatHeight()
    {
        console.log(window.innerHeight - 95);
        this.setState({
            chatHeight: window.innerHeight - 95
        });
    }

    setNewMessage(msg)
    {
        let tempMessages = this.state.tempMessages;
        tempMessages.push(msg);
        this.setState({messages: tempMessages, tempMessages: tempMessages});
        this.refs.scrollbars.scrollToBottom();
    }

    setResponseTime(timeString) {
        this.setState({
            timeString: 'Response Time: ' + timeString
        });
    }

    setWelcomeMessage() {
        console.log('setWelcomeMessage', this.state.messages.length);
        if (this.state.messages.length === 0) {
            return (
                <div>
                    <Paper style={styles.welcomePaperStyle} zDepth={2}>
                        <span style={styles.welcomeHeaderText}>Welcome to Lucy</span>
                        <h1>What I can do ?</h1>
                        <Stepper orientation="vertical">
                            <Step>
                                <StepLabel>Scrum facilities</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel tooltip="Coming Soon..">Code review</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel tooltip="Coming Soon..">Karaoke</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel tooltip="Coming Soon..">and more..</StepLabel>
                            </Step>
                        </Stepper>
                    </Paper>
                </div>
            );
        }

    }

    handleChange(event) {
        this.setState({searchInput: event.target.value});
        this.findSimilar(value);
    }
    handleKeyPress(event) {
      if(event.charCode == 13)
      {
        //this.searchMessage();
      }
    }
    render()
    {
        const styleFunction = (screenClass) => {
            if (screenClass === 'xl')
                return {height: '95vh', width: '100vw', marginLeft: '20%', textAlign: 'center', display: 'inline-block'};
            if (screenClass === 'lg')
                return {height: '95vh', width: '100vw', marginLeft: '20%', textAlign: 'center', display: 'inline-block'};
            if (screenClass === 'md')
                return {
                    height: '95vh', width: '100vw',
                    // marginLeft: '20%',
                    textAlign: 'center',
                    display: 'inline-block'
                };
            if (screenClass === 'sm')
                return {
                    height: '95vh', width: '100vw',
                    // marginLeft: '20%',
                    textAlign: 'center',
                    display: 'inline-block'
                };
            return {
                height: '95vh', width: '100vw',
                // marginLeft: '20%',
                textAlign: 'center',
                display: 'inline-block'
            };
        };
        const welcome = this.setWelcomeMessage();
        return (
            <Container fluid style={{
                padding: '0px'
            }}>
                <Row >
                    <Hidden xs sm>
                        <Col md={2} lg={2} style={{
                            height: this.state.chatHeight
                        }}></Col>
                    </Hidden>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <div className="chat" style={{
                            height: this.state.chatHeight,
                            marginTop: '0px'
                        }}>
                            <div className="chat-title">
                                <span>Conversations...</span>

                                <span style={styles.responseTimeStyle}>{this.state.timeString}</span>

                            </div>
                            <ScrollArea ref="scrollbars">
                                <div className="messages">
                                    <InteractionTimeLine responses={this.state.messages}/>
                                </div>
                            </ScrollArea>
                            <div className="message-box">
                                <InstructionProcessor setNewMessage={this.setNewMessage} setResponseTime={this.setResponseTime}/>
                            </div>

                        </div>
                    </Col>
                    <Hidden xs sm>
                        <Col md={2} lg={2} style={{
                            height: this.state.chatHeight
                        }}></Col>
                    </Hidden>
                </Row>
            </Container>
        )
    }
}

export default ConversationView;
