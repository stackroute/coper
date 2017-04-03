var request = require("request");

/*
* API to create project
*/
const createProject = function(projectName) {
    var options = {
        method: 'POST',
        url: 'https://api.taiga.io/api/v1/projects',
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
        },
        formData: {
            name: projectName,
            description: 'This project is created by Lucy.',
            is_private: 'false'
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

/*
* API to list project
*/
const listProject = function(projectId) {
    var options = {
        method: 'GET',
        url: 'https://api.taiga.io/api/v1/projects/' + projectId,
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
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

/*
* API to list project by slug
*/
const listProjectBySlug = function(projectSlug) {
    var options = {
        method: 'GET',
        url: 'https://api.taiga.io/api/v1/projects/by_slug',
        qs: {
            slug: projectSlug //'lucywave16-my-project'
        }, //this is our search query
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
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

module.exports = {
    createProject: createProject,
    listProject: listProject,
    listProjectBySlug: listProjectBySlug
};
