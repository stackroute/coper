import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

//import ActionAndroid from 'material-ui/svg-icons/communication/email';

import {Container, Grid, Row, Col, ScreenClassRender} from 'react-grid-system';

class Introduction extends React.Component
{
    constructor() {
        super();
        this.state = {
            height: '',
            width: ''
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    updateDimensions()
    {
        this.setState({height: window.innerHeight, width: window.innerWidth});
    }
    componentDidMount()
    {
        window.addEventListener('resize', this.updateDimensions);
    }
    

    render()
    {
        const styleFunction = (screenClass) => {
            if (screenClass === 'xl')
                return {fontSize: '20px', backgroundImage: `url(${ '../images/intro-back.jpg'})`, backgroundSize: 'cover',height:'85vh'};
            if (screenClass === 'lg')
                return {fontSize: '20px', backgroundImage: `url(${ '../images/intro-back.jpg'})`, backgroundSize: 'cover',height:'85vh'};
            if (screenClass === 'md')
                return {fontSize: '18px', backgroundImage: `url(${ '../images/intro-back.jpg'})`, backgroundSize: 'cover',height:'85vh'};
            if (screenClass === 'sm')
                return {fontSize: '15px', backgroundImage: `url(${ '../images/intro-back.jpg'})`, backgroundSize: 'cover',height:'85vh'};
            return {fontSize: '10px', backgroundImage: `url(${ '../images/intro-back.jpg'})`, backgroundSize: 'cover',height:'85vh'};
        };
         
        var style = {
            minWidth: '200px',
            width: '100%',
            textAlign: 'left',
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.0)',
            display: 'inline-block',
            color: 'white',
            paddingTop: '10%'
        };
        const labelStyle = {
            color: 'white',
            fontWeight: '400px',
            fontSize: '20px'
        };
        const buttonStyle = {
            padding: '8px',
            backgroundColor: '#2a7561',
            borderRadius: '4px'
        };

        var styles = {
            divRowStyle: {
                backgroundImage: `url(${ '../images/intro-back.jpg'})`,
                backgroundSize: 'cover'
            },
            styleRow: {
                paddingTop: '40px',
                paddingBottom: '40px',
                paddingLeft: '8%',
                paddingRight: '8%',
                textAlign: 'center'
            },
            styleRowFooter: {
                paddingTop: '10px',
                paddingBottom: '10px',
                // paddingLeft: '60px',
                // paddingRight: '60px',
                textAlign: 'justify',
                backgroundColor: '#444444',
                color: 'white',
                // float: 'right'
            },
            imgAdjusment: {
                maxWidth: '400px',
                width: '100%'
            },
            txtUnderIcons: {
                textAlign: 'center'
            },
            h4marginSet: {
                margin: '4px'
            },
             signInButtonStyle: {
        margin: '2px',
        border: '0px',
        height: '46px'
    },
    signInButtonLabelStyle: {
        color: 'white',
        fontWeight: 400
    },

        };
        return (
            <Container fluid style={{paddingLeft: '0px',paddingRight: '0px',    marginTop: '-4px'}}>
                <ScreenClassRender style={styleFunction}>
                    <Row style={{
                        width: '100%',
                    }}>
                        <Col md={3} lg={3}></Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Paper style={style} zDepth={0}>
                                <h1>Conversational User Experience Platform.<br/>
                                    Now we are talking.</h1><br/>
                                <h3>Build brand-unique, natural language interactions<br/>
                                    for bots, applications, services, and devices.<br/><br/><br/></h3>
                             <a href='/auth/google'><RaisedButton label="SIGN IN WITH GOOGLE" icon={<img src="../images/google_login.png" style={{height:'36px',width:'36px'}}/>} labelStyle={labelStyle} backgroundColor='#2a7561'
                                 style={buttonStyle}/></a>
                            </Paper>
                        </Col>
                    </Row>
                </ScreenClassRender>


                <Row style={styles.styleRowFooter}>
                    <Col xs={12} sm={12} md={3} lg={3}>
                        <span>© 2017 Lucy</span>
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={9}>
                        <span style={{float: 'right'}}>Third-party and open-source licenses | Terms of Use and Privacy Policy</span>
                    </Col>
                </Row>
            </Container>

        );
    }


}
export default Introduction;
