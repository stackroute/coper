import React from 'react';
import {hashHistory} from 'react-router';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Introduction, Navbar} from '../home/index.js';
import CustomMenu from '../home/menu.js';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            operPopover: false,
            openSnackbar: false,
            drawerMenu: [],
            numberOfNotifications: -1,
            userImage: "",
            loggedin: false,
            message: "",
            openLogin: 'none',
            width: ''
        };
        this.localUserAuthentication = this.localUserAuthentication.bind(this);
    }
    componentDidMount() {
        this.localUserAuthentication();
    }
    localUserAuthentication() {
        var that = this;
        var userDetails = JSON.parse(localStorage.getItem('cognitiveUser')) || {
            user: {},
            loggedin: false
        };
        if (userDetails.loggedin === true) {
            axios.get('/credentials?username=' + userDetails.user.username).then(function(response) {
                if (response.data.length !== 0) {
                    if (userDetails.user.password === response.data[0].password) {
                        that.setState({loggedin: true});
                        hashHistory.push('/UserHome');

                    } else {
                        hashHistory.push('/Home');
                    }
                } else {
                    hashHistory.push('/Home');
                }
            })
        } else {
            hashHistory.push('/Home');
        }
    }
    handleLogoutUser() {
        localStorage.setItem('cognitiveUser', JSON.stringify({user: {}, loggedin: false}));
        localStorage.removeItem('cognitiveUserToken');
        this.setState({loggedin: false, openPopover: false, openDrawer: false});
        hashHistory.push('/Home');
    }
    render() {
        var drawerMenu = [];
        var rightIcon = {};
        var numberOfNotifications = -1;
        var image = "";
        var mainComponent = {};
        var that = this;
        return (
            <MuiThemeProvider>
                <div>
                    <div>
                        <Navbar loggedin={this.state.loggedin} handleLogoutUser={this.handleLogoutUser.bind(this)}/>
                        <div id="fake"></div>
                        <Snackbar open={this.state.openSnackbar} message={this.state.message} autoHideDuration={2000}/>
                    </div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}
export default AppHeader;
