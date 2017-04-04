const chai = require('chai');
// we are using the "expect" style of Chai
const expect = chai.expect;
const userController = require('./users.controller');
const user = {
  username: 'abcd1234567',
  token: 'grs45w253dsrds654w5',
  email: 'asdasd@sdf.com',
  name: 'Sourav Dutta',
  profilePic: 'www.google.com/abcd1234567/10'
}

describe('userController.user', function() {
  it('findUser() should return null', function(done) {
    expect(userController.findUser('123123213').then(function(err) {
      return null
    }, function(user) {
      return null
    })).to.equal(null);
  });
});
};
