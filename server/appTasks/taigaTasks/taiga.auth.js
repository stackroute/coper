var request = require("request");
const configTaiga = require('../config/config.js');

const taigaAuth = function() {
  var options = {
      method: 'POST',
      url: configTaiga.TAIGA.apiUrlAuth,
      formData: {
          username: configTaiga.TAIGA.userName,
          password: configTaiga.TAIGA.password,
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
