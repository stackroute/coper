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
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import {Menu,MenuItem} from 'material-ui/Menu';

import CustomMenu from './menu.js';

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
  },
  popoverStyle: {
  	marginTop: '10px',
  }
}

class Navbar extends React.Component {
  constructor()
  {
    super();
    this.state={
    	loggedin: false,
    	openPopover: false,
    	numberOfNotifications: 0,
    }
  }
  componentWillMount()
  {
  	this.setState({loggedin: this.props.loggedin});
  	if(this.props.loggedin === true)
  	{
  		this.fetchNotification();
  		this.fetchProfilePic();
  	}
    this.fetchMenu();
  }
  componentWillReceiveProps(newProps)
  {
  	if(newProps != this.props)
  	{
  		this.setState({loggedin: newProps.loggedin,operPopover: false});
  		if(this.state.loggedin === true)
  		{
  			this.fetchNotification();
  			this.fetchProfilePic();
  		}
      this.fetchMenu();

  	}
  }
  fetchNotification()
  {
    var numberOfNotifications=0;
    var that=this;
    var userDetails=JSON.parse(localStorage.getItem('cognitiveUser'));
    axios.get('http://localhost:3000/notifications/'+userDetails.user.username)
    .then(function (response){
      numberOfNotifications=response.data.notifications.length;
      that.setState({numberOfNotifications});
    })
  }
  fetchProfilePic(){
    var that=this;
    var userImage="";
    var userDetails=JSON.parse(localStorage.getItem('cognitiveUser'));
    axios.get('http://localhost:3000/Profiles?'+userDetails.user.username)
    .then(function (response){
      userImage=response.data[0].image;
      that.setState({userImage});
    })
  }

  fetchMenu(){
    var drawerMenu=[];
    var that=this;
    var userDetails=JSON.parse(localStorage.getItem('cognitiveUserToken')) || null;
    if(userDetails === null)
    {
      drawerMenu.push({text:'Home',link:'/Home',subMenu: [],icon: 'home'});
      drawerMenu.push({text:'About Us',link:'/About',subMenu: []});
      drawerMenu.push({text:'Contact Us',link:'/Contact',subMenu: []});
      this.setState({drawerMenu});

    }
    else{
      axios({
        method: 'post',
        url: 'http://localhost:8080/auth/',
        data: {
          token: userDetails
        }
      }).then(function(response){
        if(response.status === 200)
        {
          axios.get('http://localhost:3000/menus?username='+response.data.user.username)
          .then(function (response){
            drawerMenu.push({text:'Chats',link:'/UserHome',subMenu: []});
            drawerMenu.push({text:'Account Settings',link:'',subMenu: [{text:'Profile',link:'/Profile',subMenu: []},
            {text:'Change Password',link:'/ChangePassword',subMenu: []}]});
            drawerMenu.push({text:'Voice Settings',link:'',subMenu: [{text:'Us-English',link:'/Language',subMenu: []}
            ]});
            drawerMenu.push({text:'Assistance Settings',link:'/About',subMenu: [
              {text:'Services',link:'',subMenu: response.data[0].menu}
            ]});
            drawerMenu.push({text:'About Us',link:'/About',subMenu: []});
            drawerMenu.push({text:'Contact Us',link:'/Contact',subMenu: []});
            that.setState({drawerMenu});
          })
        }
        else{
          drawerMenu.push({text:'Home',link:'/Home',subMenu: [],icon: 'home'});
          drawerMenu.push({text:'About Us',link:'/About',subMenu: []});
          drawerMenu.push({text:'Contact Us',link:'/Contact',subMenu: []});
          this.setState({drawerMenu});
        }
      })
    }



  }
  createRightIcon(numberOfNotifications,image)
  {
    return(
      <div>
      <div className="header">

          <Link to={`/Notification`} >
          <IconButton style={styles.iconButtonStyle}>
          <Badge badgeContent={numberOfNotifications}  >
            <NotificationsIcon color={'white'}/>
            </Badge>
          </IconButton>
          </Link>

      </div>
      <div className="header">
          <IconButton style={styles.iconButtonStyle} onTouchTap={this.handlePopover.bind(this)}>
            <Avatar src={image} />
          </IconButton>
        <Popover style={styles.popoverStyle}
          open={this.state.openPopover}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{"horizontal":"right","vertical":"bottom"}}
          targetOrigin={{"horizontal":"right","vertical":"top"}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" onTouchTap={this.props.handleLogoutUser.bind(this)}/>
          </Menu>
        </Popover>
      </div>
      </div>
    );
   }
   toggleNav(){
    this.setState({openDrawer:!this.state.openDrawer})
  }
   handleRequestClose(){
   this.setState({
     openPopover: false,
   });
 }
   handlePopover(event){
    event.preventDefault();
    this.setState({openPopover:!this.state.openPopover,anchorEl: event.currentTarget})
  }
 render() {
 	var rightIcon={};
 	if(this.state.loggedin === true)
 	{
 		rightIcon=this.createRightIcon(this.state.numberOfNotifications,this.state.userImage);
 	}
 	else
 	{
 		rightIcon=(
        <div>
          <div className="header">
          <Link to='/Login'>
            <FlatButton label="LogIn" backgroundColor='#000'
            labelStyle={styles.signInButtonLabelStyle}
            style={styles.signInButtonStyle}
            /></Link>
          </div>
          <div className="header">

          <Link to='/Register'>  <RaisedButton label="Sign up free"
            backgroundColor='#21254F' labelStyle={styles.signUpButtonLabelStyle}
            style={styles.signUpButtonStyle}/></Link>
          </div>
        </div>
      );
 	}
   return(
   <div>
    <AppBar style={styles.appbarStyle}
        title={<Link to={(this.state.loggedin === true)?'/UserHome':'/Home'} style={styles.linkStyle}><span style={styles.appbarTitleStyle} >Cognitive Assistant</span></Link>}
            titleStyle={styles.appbarTitleStyle}
        iconElementRight={rightIcon}
        onLeftIconButtonTouchTap={this.toggleNav.bind(this)}
        />

        <Drawer open={this.state.openDrawer} containerStyle={styles.drawerStyle}
        docked={false} onRequestChange={(open) => this.setState({openDrawer:open})}>
          <AppBar style={styles.drawerAppbarStyle} title={<span style={styles.drawerAppbarTitleStyle}>Lucy</span>}
              titleStyle={styles.appbarTitleStyle} onLeftIconButtonTouchTap={this.toggleNav.bind(this)}/>
          <List>
            <CustomMenu menu={this.state.drawerMenu}/>
          </List>
        </Drawer>
        </div>
   );
 }
}
export default Navbar;
