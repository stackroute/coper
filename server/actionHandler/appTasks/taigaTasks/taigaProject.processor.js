const request = require("request");
const configTaiga = require('../config/taiga.js');
/*
* API to create project
*/
const createProject = function(projectName) {
    var options = {
        method: 'POST',
        url: configTaiga.apiUrlProject,
        headers: {
            authorization: configTaiga.token
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
        url: configTaiga.apiUrlProject + '/' + projectId,
        headers: {
            authorization: configTaiga.token
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
        url: configTaiga.apiUrlProject + '/by_slug',
        qs: {
            slug: projectSlug //'lucywave16-my-project'
        },
        headers: {
            authorization: configTaiga.token
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
