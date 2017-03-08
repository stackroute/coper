import React from 'react';
import { Link,browserHistory  } from 'react-router';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import {Menu,MenuItem} from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import {List,ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {Wall} from './components/UserHome/index.js'
import {Introduction,Navbar} from '../home/index.js';
import CustomMenu from '../home/menu.js';


var styles={
  signInButtonStyle:{
    margin:'10px',
    border: '0px solid black',
  },
  signUpButtonStyle:{
    margin: '10px',
  },
  signUpButtonLabelStyle:{
    color: 'white',
    fontWeight: 400,
  },
  signInButtonLabelStyle:{
    color: 'white',
    fontWeight: 400,
  },
  iconButtonStyle:{
    padding:'0px',
    height: 'auto',
    width: 'auto',
    marginRight:'20px'
  },
  drawerStyle:{
    backgroundColor:'#fff',
    borderRight: "5px solid #555",
    overflow: "hidden",
  },
  iconStyles : {
  marginRight: 24,
  },
  listItemStyle: {
    display:'inline-block',
    width: '100%',
    backgroundColor: '#ddd',
    borderBottom: '2px solid #555',
    fontSize: '20px',
    fontWeight: 600,
    borderRadius: '4px',
  },
  drawerAppbarTitleStyle:{
    marginTop: "0px",
    color: '#FFF',
  },
  drawerAppbarStyle:{
    backgroundColor: '#000',
  },
  appbarStyle:{
    backgroundColor: '#000',
    position: 'fixed',
    width: '100%',
  },
  linkStyle:{
    textDecoration: 'none',
    color: '#fff'
  }
}

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
      width: '',
      height: '',
    };
    this.localUserAuthentication=this.localUserAuthentication.bind(this);
    this.updateDimensions=this.updateDimensions.bind(this);
  }
  componentDidMount(){
    this.localUserAuthentication();
    window.addEventListener("resize", this.updateDimensions);
  }

  localUserAuthentication(){
    var that=this;
    var userDetails=JSON.parse(localStorage.getItem('cognitiveUser')) || {user:{},loggedin: false};
    if(userDetails.loggedin === true)
    {
      axios.get('/credentials?username='+userDetails.user.username)
      .then(function (response){
        if(response.data.length!==0)
        {
          if(userDetails.user.password === response.data[0].password)
          {
            that.setState({loggedin: true});
            browserHistory.push('/UserHome');

          }
            else
            {
            browserHistory.push('/Home');
            }
        }
            else
            {
            browserHistory.push('/Home');
            }
      })
    }
    else{
      browserHistory.push('/Home');
    }
  }


  handleLogin(credentials){
    var that=this;
    axios({
      method: 'post',
      url: '/login/',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    .then(function (response){
      if(response.status === 200)
      {
        console.log(response);
       that.setState({loggedin: true,message: "Successfully signed in!",openSnackbar: true});
        setTimeout(() => {
            that.setState({
            openSnackbar: false
          })
        }, 2000);
        localStorage.setItem('cognitiveUser', JSON.stringify({user: {username:credentials.username,password:credentials.password},loggedin: true}));
        localStorage.setItem('cognitiveUserToken', JSON.stringify({token:response.data.token}));
        browserHistory.push('/UserHome');
      }
      else{
        that.setState({message: "Invalid Username or Password",openSnackbar: true});
        setTimeout(() => {
            that.setState({
            openSnackbar: false
          })
        }, 2000);
      }
    })
  }
  handleRegister(userDetails)
  {
     console.log('enter');
    var that=this;
    var profile={
      name: userDetails.name,
      dateOfBirth: userDetails.dateOfBirth,
      email: userDetails.email,
      username: userDetails.username
    }
    axios.post('/profiles', profile)
    .then(function (response) {
      browserHistory.push('/Login')
    })
    var credentials={
      username: userDetails.username,
      password: userDetails.password,
    }
    axios.post('/credentials', credentials)
    .then(function (response) {

      that.setState({open:true,message:"Successfully signed up!",openLogin:true});
      setTimeout(() => {
          that.setState({
          openSnackbar: false
        })
      }, 2000);

    })
    axios.post('/menus', {username: credentials.username,menu: []})
    .then(function (response) {
    })
    axios.post('/notifications', {id:credentials.username,notifications:[]})
    .then(function (response) {
  })
  }
  handleLogoutUser(){
     localStorage.setItem('cognitiveUser', JSON.stringify({user: {},loggedin: false}));
     localStorage.removeItem('cognitiveUserToken');
     this.setState({loggedin: false,openPopover: false,openDrawer: false});
     browserHistory.push('/Home');
     //this.fetchMenu();
   }
/*  toggleSign(){
    var openLogin=this.state.openLogin;
    if(openLogin === 'none')
    {
      openLogin = 'Login';
    }
    else if(openLogin === 'Login')
    {
      openLogin = 'Register';
    }
    else if(openLogin === 'Register'   {
      openLogin = 'Login';
    }
    this. at
  showLogin()
  {
    this.setState({openLogin:'Login'});
  }
  showRegister()
  {
    this.setState({openLogin:'Register'});
  }*/
  updateDimensions()
  {
    this.setState({height: window.innerHeight,width: window.innerWidth});
  }

  render() {
    var drawerMenu=[];
    var rightIcon={};
    var numberOfNotifications=-1;
    var image="";
    var mainComponent={};
    var that=this;

    var children = React.Children.map(this.props.children, function (child) {
    if(that.props.children!=null &&that.props.children.props.route.path === '/Home')
    {
      return React.cloneElement(child, {
      handleLogin: that.handleLogin.bind(that),
      handleRegister: that.handleRegister.bind(that),
      openLogin: that.state.openLogin,

      })
    }
    else if(that.props.children!=null &&that.props.children.props.route.path === '/Login')
    {
      return React.cloneElement(child, {
      handleLogin: that.handleLogin.bind(that)
      })
    }
    else if(that.props.children!=null &&that.props.children.props.route.path === '/Register')
    {
      return React.cloneElement(child, {
      handleRegister: that.handleRegister.bind(that)
      })
    }
    return child;
    })

    return (
      <MuiThemeProvider>
      <div>

        <div >
        <Navbar loggedin={this.state.loggedin} handleLogoutUser={this.handleLogoutUser.bind(this)} />

        <div id="fake"></div>

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.message}
          autoHideDuration={2000}
        />
        </div>
        {children}
        </div>
      </MuiThemeProvider>
    )
  }
}
export default AppHeader;
