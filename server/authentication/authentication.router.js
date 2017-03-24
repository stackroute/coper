const express = require('express');
const router = express.Router();
const passport = require('./strategy/googleStrategy');
const authController = require('./authentication.controller');

/*
 * What this API do: When user wants to login to app, this API is invoked by client, which is then redirected to Signin with Google page
 * This is done by passport google strategy
 * Eg: HTTP GET /auth/google
 */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

/*
 * What this API do: When user enter his google details, and click on allow button, this API is invoked
 *                   in order to redirect the user to appropriate page
 * This is done by passport google strategy
 * Eg: HTTP GET /auth/google/callback
 */
router.get('/google/callback', passport.authenticate('google', {
  // in case of invalid credantials it'll redirect the user to Home page
    failureRedirect: '/#/Home',
    session: false
}), function(req, res) {
  // in case of valid credantials it'll pass the JWT token via URL
    try {
        const token = authController.googleCallback(req.user);
        res.redirect('/#/UserHome?token=' + token);
    } catch (e) {
        res.redirect('/#/errorpage');
    }
});

/*
 * What this API do: Whenever user perform any action, this API is invoked, which will pass the token as parameter for validation
 *                   and perform the required actions
 * This is done by decoding JWT and matching the content with originally stored token
 */
router.post('/:token', function(req, res) {
    try {
        authController.authenticatePage(req.params.token).then(function(user) {
            res.status(200).send({username: user.username});
        }, function(err) {
            res.status(500).send({error: 'Failed to complete operation...!'});
        });
    } catch (ex) {
        res.status(500).send({error: 'Internal server error!'});
    }
 });

 /*
  * What this API do: When user click on logout, this API is invoked, which will redirect the user to Home page and clear the local storage
  */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/Home');
});

module.exports = router;
