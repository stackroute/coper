const passport = require('passport');
const googleStrategy= require('./strategy/googleStrategy');
const users= require('../users/users.entity');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const superSecret = require('./config/configJwt');
const googleCallback = function (user){
  const token = jwt.sign(user, superSecret.secret);
  // console.log(token);
  // const decoded = jwtDecode(token);
  return token;
}

const authenticatePage = function(token){
  const user = jwtDecode(token);
  const promise= new Promise(function(reject,resolve){
    users.findOne({username: user.username},function(err,user){
      if(err)
      {
        reject(err);
      }
      if(!user)
      {
        reject({error: ''})
      }
      resolve(user);
    })
  })
  return promise;
}

module.exports = {
  googleCallback : googleCallback,
  authenticatePage : authenticatePage
}
