var request = require("request");

const taigaAuth = function() {
  var options = {
      method: 'POST',
      url: 'https://api.taiga.io/api/v1/auth',
      formData: {
          username: 'lucywave16',
          password: 'lucy@123',
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
