import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Container,Grid,Row,Col,ScreenClassRender,ClearFix} from 'react-grid-system';
const ReactMarkdown = require('react-markdown');
const styles = {
    paperStyle: {
        padding: '0px 20px 0px 20px',
        borderRadius: '4px',
        backgroundColor: '#EBEDEF'
    },
    dataDisplay:{
        width:'auto',
        display:'inline-block',
         backgroundColor: '#EBEDEF'
    }
}
export default class ShortTextResponse extends React.Component {
    constructor() {
        super();
    }

    static get contextTypes() {
        return { response: React.PropTypes.object.isRequired };
    }


    render() {
       let avatar=(
                <span>
                  <Avatar src="../images/prem.jpg" />
                </span>
                );
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Paper style={styles.paperStyle}>
                            <div>{avatar}
                            <Paper style={styles.dataDisplay}>
                                <ReactMarkdown source={this.context.response.content}>
                                </ReactMarkdown>
                                </Paper>
                                <ClearFix />
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}