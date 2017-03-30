var request = require("request");

var options = {
    method: 'POST',
    url: 'https://api.taiga.io/api/v1/auth',
    formData: {
        username: 'lucywave16',
        password: 'lucy@123',
        type: 'normal'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});
