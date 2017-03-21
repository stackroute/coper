const user = require('./users.entity');

const findUser = function(username) {
    console.log(username);
    let promise = new Promise(function(resolve, reject) {
        user.findOne({
            username: username
        }, function(err, user) {
            console.log(user);
            console.log(err);
            if (err)
                reject(err);
            if (!user) {

                reject({error: 'Null domain object created in mongo..!'});
            }
            resolve(user);
        })
    })

    return promise;

}

module.exports = {
    findUser: findUser
}
