const request = require("request");
const configTaiga = require('../../../config/config.js');
/*
 * API to add user story
 */
const addUserStory = function(projectId, userStorySubject, sprintId) {
    var options = {
        method: 'POST',
        url: configTaiga.TAIGA.apiUrlUserStories,
        headers: {
            authorization: configTaiga.TAIGA.token
        },
        formData: {
            project: projectId,
            subject: userStorySubject,
            milestone: sprintId
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
        url: configTaiga.TAIGA.apiUrlUserStories,
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
            var filterListUserStories = {
                "projectId": "",
                "userStorySubject": "",
                "userStoryId": ""
            }
            filterListUserStories.projectId = json[0].project;
            filterListUserStories.userStorySubject = json[0].subject;
            filterListUserStories.userStoryId = json[0].id;
            resolve(filterListUserStories);
        });
    });
    return promise;
};

module.exports = {
    addUserStory: addUserStory,
    listUserStories: listUserStories
};
