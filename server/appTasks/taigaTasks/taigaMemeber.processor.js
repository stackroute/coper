var request = require("request");
/*
 * API to add members
 */
var options = {
    method: 'POST',
    url: 'https://api.taiga.io/api/v1/memberships',
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    },
    formData: {
        project: '187290', //project id
        role: '1141575', // ROLES: Front - 1141575, UX - 1141573, Back - 1141576, Design - 1141574, Stakeholder - 1141578, ProductOwner - 1141577
        username: 'inder@xyz.com'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});

/*
 * API to list members
 */
var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/memberships',
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

/*
 * API to list members by ID
 */
var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/memberships/495537', //member id to be listed
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
 * API to delete members
 */
var options = {
    method: 'DELETE',
    url: 'https://api.taiga.io/api/v1/memberships/495532', //member id to be deleted
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});
