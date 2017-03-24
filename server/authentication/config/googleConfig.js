/*
 * This module contain all the details and configuration which we are using to invoke google login API
 */

const configAuth = {
    googleAuth: {
        clientID: '212833991044-l102mt5bjeqtmqap3kj976me3km8jr5i.apps.googleusercontent.com',
        clientSecret: 'aHR-3D-AvSDgeU3ne8BjIz6q',
        callbackURL: '/auth/google/callback'
    }
};

module.exports = {
    googleConfig: configAuth
};
