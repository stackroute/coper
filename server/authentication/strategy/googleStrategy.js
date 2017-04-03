const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Users = require('./../../users/users.entity');
const configAuth = require('./../config/googleConfig').googleConfig;

// defining google strategy for passport authentication
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
}, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      // checking for the existence of user details in database
        Users.findOne({
            username: profile.id
        }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            }
            // otherwise creating a new record of user details in database
            var newUser = new Users();
            newUser.username = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.profilePic = profile.photos[0].value;
            newUser.save(function(err) {
                if (err)
                    return done(err);
                return done(null, newUser);
            });
            return done(null, false);
        });
    });
}));

module.exports = passport;