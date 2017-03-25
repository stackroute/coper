const user = require('./users.entity');

// this function is to find or check for the existence of user details in our database
const findUser = function(username) {
	let promise = new Promise(function(resolve, reject) {
		user.findOne({
			username: username
		}, function(err, user) {
			if (err)
				reject(err);
			if (!user) {
				reject({error: 'No user found in mongo..!'});
			}
			resolve(user);
		});
	});
	return promise;
};
module.exports = {
	findUser: findUser
};
