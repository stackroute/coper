const request = require("request");
const configTaiga = require('../../../config/config.js');
/*
 * API to add sprint
 */
const addSprint = function(projectId, sprintName) {
    var options = {
        method: 'POST',
        url: configTaiga.TAIGA.apiUrlSprint,
        headers: {
            authorization: configTaiga.TAIGA.token
        },
        formData: {
            project: projectId,
            name: sprintName,
            estimated_start: '2017-04-07',
            estimated_finish: '2017-04-21'
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterAddSprint = {
                "projectId": "",
                "sprintName": "",
                "sprintId": ""
            }
            filterAddSprint.projectId = json.project;
            filterAddSprint.sprintName = json.name;
            filterAddSprint.sprintId = json.id;
            resolve(filterAddSprint);
        });
    });
    return promise;
};

/*
 * API to list sprint
 */
const listSprint = function(projectId) {
    var options = {
        method: 'GET',
        url: configTaiga.TAIGA.apiUrlSprint,
        qs: {
            project: projectId
        },
        headers: {
            authorization: configTaiga.TAIGA.token
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterListSprint = {
                "projectId": "",
                "sprintName": "",
                "sprintId": "",
                "userStoryId": ""
            }
            filterListSprint.projectId = json[0].project;
            filterListSprint.sprintName = json[0].name;
            filterListSprint.sprintId = json[0].id;
            filterListSprint.userStoryId = json[0].user_stories[0].id;
            resolve(filterListSprint);
        });
    });
    return promise;
};

module.exports = {
    addSprint: addSprint,
    listSprint: listSprint
};
