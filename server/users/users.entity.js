var mongoose = require('mongoose');

// defining template (mongoose schema) for storing user credentials in our database
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema, 'users');
// 'users' is the name of our collection in database 'lucy'
