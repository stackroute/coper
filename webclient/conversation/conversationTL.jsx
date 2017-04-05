import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Card, CardMedia, CardHeader, CardActions} from 'material-ui/Card';
import ScrollArea from 'react-custom-scrollbars';
import InteractionTimeLine from './InteractionTimeLine.jsx';
import InstructionProcessor from './instructionProcessor.jsx';
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
            <Container >

                <div style={{
                    height: '10px'
                }}></div>
                <Row>
                    <Hidden xs sm>
                        <Col md={2} lg={2} style={{
                            height: '100vh'
                        }}></Col>
                    </Hidden>
                    <Col xs={12} sm={12} md={8} lg={8} style={{
                        height: '100vh'
                    }}>
                        <Row>
                            <ScrollArea universal ref="scrollbars" style={{height: '70vh'}}>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <InteractionTimeLine responses={this.state.messages}/>
                                </Col>
                            </ScrollArea>
                            <Col xs={12} sm={12} md={8} lg={8} style={{
                                position: 'fixed',
                                bottom: '5px'
                            }}>
                                <InstructionProcessor setNewMessage={this.setNewMessage}/>
                            </Col>
                        </Row>
                    </Col>
                    <Hidden xs sm>
                        <Col md={2} lg={2} style={{
                            height: '100vh'
                        }}></Col>
                    </Hidden>
                </Row>
            </Container>

        );
    }
}

export default ConversationView;
