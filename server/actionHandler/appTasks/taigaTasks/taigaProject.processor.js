var request = require("request");

/*
 * API to create project
 */
var options = {
    method: 'POST',
    url: 'https://api.taiga.io/api/v1/projects',
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    },
    formData: {
        name: 'project 234',
        description: 'test project 234',
        is_private: 'false'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});

/*
 * API to list project
 */
var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/projects/187290', //187290 is our project id
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});

/*
 * API to list project by slug
 */
 var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/projects/by_slug',
    qs: {
        slug: 'lucywave16-my-project'
    }, //this is our search query
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});
