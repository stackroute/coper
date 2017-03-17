import React from 'react';
import InstructionProcessor from './instructionProcessor';
import {Container, Grid, Row, Col, ScreenClassRender} from 'react-grid-system';

class Conversation extends React.Component {
    constructor()
    {
        super();
    }
    render() {
        const style = {
            textAlign: 'center'
        };

        return (
            <div>
                <h1 style={style}>Let your conversation begin...</h1>
                <Container fluid>
                <InstructionProcessor/>
                </Container>
            </div>
        );

    }
}
export default Conversation;
