var mongoose = require('mongoose');
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
