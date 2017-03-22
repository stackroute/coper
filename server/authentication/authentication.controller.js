const passport = require('passport');
const googleStrategy= require('./strategy/googleStrategy');
const users= require('../users/users.entity');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const superSecret = require('./config/configJwt');
const googleCallback = function (user){
  const token = jwt.sign(user, superSecret.secret);

  const decoded = jwtDecode(token);
  console.log(decoded);
  return token;
}

const authenticatePage = function(token){
  const user = jwtDecode(token);
  console.log(user._doc);
  const promise= new Promise(function(resolve , reject){
    users.findOne({username: user._doc.username},function(err,user){
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
