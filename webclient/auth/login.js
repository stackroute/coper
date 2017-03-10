import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory,Link  } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorusername: '',
      errorpassword: '',
      message: '',
      open: false,
      height: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDimensions=this.updateDimensions.bind(this);
  }
  componentDidMount()
  {
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions()
  {
    this.setState({height: window.innerHeight});
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    var errorusername = (this.state.username ==='')? "Required" : "";
    var errorpassword = (this.state.password ==='')? "Required" : "";
    this.setState({errorusername,errorpassword})
    var that=this;
    if(errorusername+errorpassword ===""){
      this.props.handleLogin({username:this.state.username,password:this.state.password});
    }
  }
  handleFocus(event)
  {
    const target = event.target;
    const name= "error"+target.name;
    this.setState({
      [name]: ""
    });
  }
  handleKeyPress(target){
    if(target.charCode == 13)
    {
      this.handleSubmit();
    }
  }
  render() {
    var styles={
      headerStyle:{
        color: '#999',
        textAlign: 'left'
      },
      divStyle1:{
        textAlign: 'center',
      },
      divStyle2:{
        textAlign: 'center',
        height: window.innerHeight+'px',
        backgroundColor: '#eee',
      },
      iconImageStyle:{
        width: 100,
        height: 100,
      },
      buttonStyle:{
        padding: '10px',
        width: '200px',
        backgroundColor:'#F57C00',
        borderRadius: '4px',
      },
      flatButtonStyle:{
        padding: '10px',
        height: '50px',
        fontSize: '20px',
      },
      buttonLabelStyle:{
        color: '#fff',
      },
      signUpButtonStyle: {
        height: '46px',
        width: '191px',
        hover: 'red',
      },
    }
    return (
      <div className='row'>
      <div className='col-md-2'>
      </div>
      <div className="col-sm-12 col-md-4" style={styles.divStyle1}>

      <h2 style={styles.headerStyle}>Sign In</h2>
      <img src="../images/User-info.png" style={styles.iconImageStyle}/>
      <br/>

      <TextField hintText="User Name" name="username" type="text" value={this.state.username} onChange={this.handleInputChange}
      onFocus={this.handleFocus.bind(this)} fullWidth={true}
      errorText={this.state.errorusername}
      floatingLabelText="Username"
      onKeyPress={this.handleKeyPress.bind(this)}
      /><br/>

      <TextField hintText="Password"
      type="password"
      name="password"
      value={this.state.password} fullWidth={true}
      onChange={this.handleInputChange}
      onFocus={this.handleFocus.bind(this)}
      errorText={this.state.errorpassword}
      floatingLabelText="Password"
      onKeyPress={this.handleKeyPress.bind(this)}
      /><br/><br/><br/>
      <RaisedButton label="LogIn" onClick={this.handleSubmit} backgroundColor='#F57C00' fullWidth={true}
      labelStyle={styles.buttonLabelStyle} style={styles.buttonStyle}/><br/>

      <br/>
      <br/>

      <Link to='/Register'><FlatButton style={styles.flatButtonStyle} primary={true}><span>Create Account</span></FlatButton></Link>

      </div>
      <div className='col-sm-12 col-md-6' style={styles.divStyle2}>
      <br/>
      <br/>
      <span>{'or'}</span>
      <Divider />
      <br/>
      <br/>
      <Link to='#'><RaisedButton className='logInButtonStyle' labelColor = 'blue' style={styles.signUpButtonStyle} icon={<img src='../images/fb_login.png' height='46' width='191' alt='facebook' />}/></Link><br/>
      <Link to='#'><RaisedButton onClick={this.handleSubmit}  className='logInButtonStyle' backgroundColor='#ff574f' labelColor = 'red' style={styles.signUpButtonStyle} icon={<img src='../images/google_login.png' height='46' width='191' alt='google' />}/></Link><br/>
      </div>
      </div>
      );
}
}
export default Login;
