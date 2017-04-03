const request = require("request");
const configTaiga = require('../config/taiga.js');
/*
 * API to add user story
 */
const addUserStory = function(projectId, userStorySubject) {
    var options = {
        method: 'POST',
        url: configTaiga.apiUrlUserStories,
        headers: {
            authorization: configTaiga.token
        },
        formData: {
            project: projectId,
            subject: userStorySubject
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterAddUserStory = {
                "projectId": "",
                "userStorySubject": "",
                "userStoryId": ""
            }
            filterAddUserStory.projectId = json.project;
            filterAddUserStory.userStorySubject = json.subject;
            filterAddUserStory.userStoryId = json.id;
            resolve(filterAddUserStory);
        });
    });
    return promise;
};

/*
 * API to list user stories
 */
const listUserStories = function(projectId) {
    var options = {
        method: 'GET',
        url: configTaiga.apiUrlUserStories,
        qs: {
            project: projectId
        },
        headers: {
            authorization: configTaiga.token
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterListUserStories = {
                "projectId": "",
                "userStorySubject": ""
            }
            filterListUserStories.projectId = json[0].project;
            filterListUserStories.userStorySubject = json[0].subject;
            resolve(filterListUserStories);
        });
    });
    return promise;
};

module.exports = {
    addUserStory: addUserStory,
    listUserStories: listUserStories
};
