const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const userController = require('./users.controller');
const user={username : 'abcd1234567',token : 'grs45w253dsrds654w5',
  email : 'asdasd@sdf.com',name : 'Sourav Dutta',profilePic : 'www.google.com/abcd1234567/10'}

describe('userController.user', function() {
  it('fetchUser() should return null', function(done) {
    expect(userController.fetchUser('abcd'))
    .to.equal(null);
  });
});

describe('userController.user', function() {
  it('fetchUser() should return user', function(done) {
    expect(userController.fetchUser('abcd1234567')).to.equal(user);
  });
});
