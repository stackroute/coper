var request = require("request");
/*
 * API to add user story
 */
var options = {
    method: 'POST',
    url: 'https://api.taiga.io/api/v1/userstories',
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    },
    formData: {
        project: '187290',
        subject: 'another test project'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});

/*
 * API to list user stories
 */
var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/userstories',
    qs: {
        project: '187290'
    },
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});
