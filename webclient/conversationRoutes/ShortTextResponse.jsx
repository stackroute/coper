import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {
    Container,
    Grid,
    Row,
    Col,
    ScreenClassRender,
    ClearFix
} from 'react-grid-system';
const ReactMarkdown = require('react-markdown');

export default class ShortTextResponse extends React.Component {
    constructor() {
        super();
    }

    static get contextTypes() {
        return {response: React.PropTypes.object.isRequired};
    }

    render() {
        let avatar = (
            <span size={40}>
                <Avatar src="../images/prem.jpg"/>
            </span>
        );
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div>
                            <div className='message'>
                                <ReactMarkdown source={this.context.response.content}></ReactMarkdown>
                            </div>{avatar}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
