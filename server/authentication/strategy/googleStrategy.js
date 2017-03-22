const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('./../../users/users.entity');
const configAuth= require('./../config/googleConfig').googleConfig;
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
}, function(token, refreshToken, profile, done) {
    console.log(profile);
    process.nextTick(function() {
        users.findOne({
            username: profile.id
        }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            }
            var newUser = new users();
            newUser.username = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.profilePic = profile.photos[0].value;
            console.log(token);
            newUser.save(function(err) {
                if (err)
                    return done(err);
                return done(null, newUser);
            });

            return done(null, false);
        });
    });
}));

module.exports = passport
