var request = require("request");
const configTaiga = require('../config/taiga.js');

const taigaAuth = function() {
  var options = {
      method: 'POST',
      url: configTaiga.apiUrlAuth,
      formData: {
          username: configTaiga.userName,
          password: configTaiga.password,
          type: 'normal'
      }
  };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            resolve(body);
        });
    });
    return promise;
};

module.exports = taigaAuth;
