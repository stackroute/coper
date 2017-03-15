var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
        avatar: String
    }
});
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
