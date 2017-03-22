const express = require('express')
const router = express.Router();
const passport = require('./strategy/googleStrategy');
const authController = require('./authentication.controller');
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/#/Home',
    session: false
}), function(req, res) {
    try {
        const token = authController.googleCallback(req.user);
        res.redirect('/#/UserHome?token=' + token);
    } catch (e) {
        console.log(e);
        res.redirect('/#/errorpage');
    }
});

router.post('/:token', function(req, res) {
    try {
        authController.authenticatePage(req.params.token).then(function(user) {
            res.status(200).send({username: user.username});
        }, function(err) {
            res.status(500).send({error: 'Failed to complete operation...!'});
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).send({error: 'Internal server error!'});
    }

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/Home');
});
module.exports = router;
