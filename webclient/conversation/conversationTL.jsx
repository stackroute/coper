import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ScrollArea from 'react-custom-scrollbars';
import InteractionTimeLine from './InteractionTimeLine.jsx';
import InstructionProcessor from './instructionProcessor.jsx';
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
const style = {
    avatar: {
        display: 'inline-block',
        float: 'left'
    },
    paperStyle: {
        //backgroundcolor: '#154726'
    }
}
class ConversationView extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            messages: []
        }

        this.setNewMessage = this.setNewMessage.bind(this);
    }
    componentWillMount()
    {
      window.addEventListener('load',this.changeChatHeight.bind(this));
      window.addEventListener('resize',this.changeChatHeight.bind(this));
      //this.changeChatHeight();
    }
    changeChatHeight()
    {
      console.log(window.innerHeight-80);
      this.setState({chatHeight:window.innerHeight-80});
    }
    setNewMessage(msg)
    {
        const messages = this.state.messages;
        console.log('msg', msg);
        messages.push(msg);
        this.setState({messages: messages});
        this.refs.scrollbars.scrollToBottom();
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
        return (
          <Container fluid style={{padding : '0px'}}>
            <Row >
            <Hidden xs sm>
                <Col md={2} lg={2} style={{
                    height: this.state.chatHeight
                }}></Col>
            </Hidden>
            <Col xs={12} sm={12} md={8} lg={8}>
            <div className="chat" style={{height: this.state.chatHeight, marginTop: '5px'}}>
                <div className="chat-title">
                    <span>Conversations...</span>
                    <figure className="avatar">
                        <img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg"/></figure>
                </div>
                <ScrollArea ref="scrollbars" >
                <div className="messages">
                    <InteractionTimeLine responses={this.state.messages}/>
                </div>
                </ScrollArea>
                <div className="message-box">
                    <InstructionProcessor setNewMessage={this.setNewMessage}/>
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
        );
    }
}

export default ConversationView;
