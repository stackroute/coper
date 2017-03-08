import React from 'react'
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory,Link  } from 'react-router';

const styles={
  headerStyle:{
    color: '#999',
    textAlign: 'left'
  },
  paperStyle:{
    height: 'auto',
    width: 'auto',
    padding: '20px',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '5px',
    textAlign: 'center',
  },
  divStyle1:{
    textAlign: 'center',
  },
  divStyle2:{
    textAlign: 'center',
    height: window.innerHeight+'px',
    backgroundColor: '#eee',
  },
  signUpButtonStyle: {
    width: '300px',
  },
  flatButtonStyle:{
    padding: '10px',
    height: '50px',
    fontSize: '20px',
  },
  buttonStyle:{
    padding: '10px',
    width: '50%',
    backgroundColor:'#F57C00',
    borderRadius: '4px',
  },
  buttonLabelStyle:{
    color: '#fff',
  },
}
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateOfBirth: {},
      email: '',
      username: '',
      password: '',
      repassword: '',
      errorname: '',
      errordateOfBirth: '',
      erroremail:'',
      errorusername: '',
      errorpassword: '',
      errorrepassword: '',
      open: false,
      message: '',

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleDateChange(event,date) {
    this.setState({
      dateOfBirth: date
    });
  }
  handleKeyPress(target){
    if(target.charCode == 13)
    {
      this.handleSubmit();
    }
  }
  handleSubmit(event) {
    let errorname = (this.state.name ==='')? 'Required' : '';
    let errordateOfBirth = (this.state.dateOfBirth ==='')? 'Required' : '';
    let erroremail = (this.state.email ==='')? 'Required' : '';
    let errorusername = (this.state.username ==='')? 'Required' : '';
    let errorpassword = (this.state.password ==='')? 'Required' : '';
    let errorrepassword = (this.state.repassword ==='')? 'Required' : '';
    errorrepassword = (errorpassword !== 'Required' && errorpassword !== 'Required' && this.state.repassword !== this.state.password)? 'Password did not match' : '';
    this.setState({errorname,errordateOfBirth,erroremail,errorusername,errorpassword,errorrepassword});
    let x=errorname+errordateOfBirth+erroremail+errorusername+errorpassword+errorrepassword;
    if(x === '')
    {
      let that=this;
      axios.get('/credentials?username='+that.state.username)
      .then(function (response) {
        if(response.data.length === 0)
        {
          that.props.handleRegister(that.state);
        }
        else {
          errorusername = 'Choose another username';
          that.setState({errorusername})
        }

      })
    }

  }
  handleFocus(event)
  {
    const target = event.target;
    const name= 'error'+target.name;
    this.setState({
      [name]: ''
    });
  }
  render() {
    return (
      <MuiThemeProvider>
      <div className='row'>
      <div className='col-md-2'>
      </div>
      <div className='col-sm-12 col-md-4' style={styles.divStyle1}>
      <h2 style={styles.headerStyle}>Sign Up</h2>
      <TextField hintText='Your Name' name='name' type='text' value={this.state.name} onFocus={this.handleFocus.bind(this)}
      onKeyPress={this.handleKeyPress.bind(this)}
      onChange={this.handleInputChange}  floatingLabelText='Name' errorText={this.state.errorname} fullWidth={true}/><br/>

      <DatePicker hintText='DD-MM-YYYY' name='dateOfBirth' mode='landscape' value={this.state.dateOfBirth} onFocus={this.handleFocus.bind(this)}
      onChange={this.handleDateChange.bind(this)} autoOk={true} floatingLabelText='Date Of Birth' errorText={this.state.errordateOfBirth}
      fullWidth={true} onKeyPress={this.handleKeyPress.bind(this)}/><br/>

      <TextField hintText='abc@abc.com' name='email' type='email' value={this.state.email} onFocus={this.handleFocus.bind(this)}
      onKeyPress={this.handleKeyPress.bind(this)}
      onChange={this.handleInputChange} floatingLabelText='Email' errorText={this.state.erroremail} fullWidth={true}/><br/>

      <TextField hintText='User Name'  name='username'  type='text'  value={this.state.username} onFocus={this.handleFocus.bind(this)}
      onKeyPress={this.handleKeyPress.bind(this)}
      onChange={this.handleInputChange} floatingLabelText='Username' errorText={this.state.errorusername} fullWidth={true}/><br/>

      <TextField  hintText='Password' name='password' type='password' value={this.state.password} onFocus={this.handleFocus.bind(this)}
      onKeyPress={this.handleKeyPress.bind(this)}
      onChange={this.handleInputChange}  floatingLabelText='Password' errorText={this.state.errorpassword} fullWidth={true}/><br/>

      <TextField  hintText='Re-password' name='repassword' type='password' value={this.state.repassword} onFocus={this.handleFocus.bind(this)}
      onKeyPress={this.handleKeyPress.bind(this)}
      onChange={this.handleInputChange}  floatingLabelText='Re-Enter Password' errorText={this.state.errorrepassword} fullWidth={true}/><br/><br/>

      <RaisedButton label='Register'  style={styles.buttonStyle} labelStyle={styles.buttonLabelStyle} backgroundColor='#F57C00'
      onClick={this.handleSubmit.bind(this)} fullWidth={true}/>
      <br/>
      <br/>
      <Link to='/Login'><FlatButton onTouchTap={this.props.onTouchTap} primary={true} style={styles.flatButtonStyle}><span>Already have an account!</span></FlatButton></Link>
      <Snackbar
      open={this.state.open}
      message={this.state.message}
      autoHideDuration={3000}
      />
      </div>
      <div className='col-sm-12 col-md-6' style={styles.divStyle2}>
      <br/>
      <br/>
      <span>{'or'}</span>
      <Divider />
      <RaisedButton label='Sign up with Facebook' onClick={this.handleSubmit}  className='logInButtonStyle' style={styles.signUpButtonStyle}/><br/>
      <RaisedButton label='Sign up with Gmail' onClick={this.handleSubmit}  className='logInButtonStyle' style={styles.signUpButtonStyle}/><br/>
      <RaisedButton icon={<FontIcon className='muidocs-icon-custom-github' />}
      label='Sign up with Github'  onClick={this.handleSubmit} className='logInButtonStyle' style={styles.signUpButtonStyle}/><br/>
      <RaisedButton label='Sign up with Linked In' onClick={this.handleSubmit} className='logInButtonStyle' style={styles.signUpButtonStyle}/><br/>
      </div>
      </div>
      </MuiThemeProvider>
      );
}
}
export default Register;
