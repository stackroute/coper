const express = require('express')
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#/UserHome',
    failureRedirect: '/#/Home'
}));
// gmail authentication end
// get user avatar
router.get('/Authenticate', function(req, res) {
  res.status(200).send();
});

module.exports = router;
