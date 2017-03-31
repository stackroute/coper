import React from 'react';
import Paper from 'material-ui/Paper';
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
class ConversationView extends React.Component
{
		constructor()
		{
			super();
			this.state = {
				messages : [],
			}
			this.setNewMessage = this.setNewMessage.bind(this);
		}
		setNewMessage(msg)
		{
			const messages = this.state.messages;
			messages.push(msg);
			console.log('from tl ',msg);
			this.setState({messages});
		}
    render()
    {
        console.log("inside cv");
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
            <Container fluid>
                <Row>
                    <Hidden xs sm>
                        <Col md={2} lg={2} style={{
                            height: '100vh'
                        }}></Col>
                    </Hidden>
                    <Col xs={12} sm={12} md={10} lg={10} style={{
                        height: '100vh'
                    }}>
                        <Row>
                            <InteractionTimeLine/>
                            <Col xs={12} sm={12} md={12} lg={12} style={{
                                height: '90vh'
                            }}></Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
														<InstructionProcessor setNewMessage={this.setNewMessage}/></Col>
                        </Row>
                    </Col>
                </Row>

            </Container>

        );
    }
}
export default ConversationView;
