const request = require("request");
const configTaiga = require('../../../config/config.js');
/*
* API to create project
*/
const createProject = function(projectName) {
    console.log('Taiga createProject ', projectName);
    var options = {
        method: 'POST',
        url: configTaiga.TAIGA.apiUrlProject,
        headers: {
            authorization: configTaiga.TAIGA.token
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
            var json = JSON.parse(body);
            var filterCreateProject = {
                "projectName": "",
                "projectDescription": "",
                "projectId": "",
                "projectMembers": ""
            }
            filterCreateProject.projectName = json.name;
            filterCreateProject.projectDescription = json.description;
            filterCreateProject.projectId = json.id;
            filterCreateProject.projectMembers = json.members;
            resolve(filterCreateProject);
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
        url: configTaiga.TAIGA.apiUrlProject + '/' + projectId,
        headers: {
            authorization: configTaiga.TAIGA.token
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
        url: configTaiga.TAIGA.apiUrlProject + '/by_slug',
        qs: {
            slug: projectSlug //'lucywave16-my-project'
        },
        headers: {
            authorization: configTaiga.TAIGA.token
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
