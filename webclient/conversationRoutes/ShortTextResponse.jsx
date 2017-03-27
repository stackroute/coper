import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {Container,Grid,Row,Col,ScreenClassRender,ClearFix} from 'react-grid-system';
const ReactMarkdown = require('react-markdown');
const styles = {
    cardStyle: {
        backgroundColor: '',
        width: 'auto',
        padding: '0px 20px 0px 20px',
        borderRadius: '4px'
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

        return (
            <div>
            <Row>
            <Col>
            <Card style={styles.cardStyle} zDepth={2}>
            <CardHeader
            title="Prem"
            subtitle="Project Engineer"
            avatar="images/prem.jpg"
            />
            <CardText>
            <ReactMarkdown source={this.context.response.content}>
            </ReactMarkdown>
            </CardText>
            </Card>
            </Col>
            </Row>
            </div>
            );
    }
}