var request = require("request");
const configTaiga = require('../config/taiga.js');
/*
 * API to add task
 */
const addTask = function(projectId, taskSubject, userStoryId) {
    var options = {
        method: 'POST',
        url: configTaiga.apiUrlTask,
        headers: {
            authorization: configTaiga.token
        },
        formData: {
            project: projectId,
            subject: taskSubject,
            user_story: userStoryId
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterAddTask = {
                "projectId": "",
                "userStorySubject": "",
                "userStoryId": "",
                "taskId": ""
            }
            filterAddTask.projectId = json.project;
            filterAddTask.userStorySubject = json.subject;
            filterAddTask.userStoryId = json.user_story;
            filterAddTask.taskId = json.id;
            resolve(filterAddTask);
        });
    });
    return promise;
};

/*
 * API to list tasks
 */
const listTask = function(projectId) {
    var options = {
        method: 'GET',
        url: configTaiga.apiUrlTask,
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
            var filterListTask = {
                "projectId": "",
                "taskSubject": "",
                "userStoryId": "",
                "taskId": ""
            }
            filterListTask.projectId = json[0].project;
            filterListTask.taskSubject = json[0].subject;
            filterListTask.userStoryId = json[0].user_story;
            filterListTask.taskId = json[0].id;
            resolve(filterListTask);
        });
    });
    return promise;
};

/*
 * API to list task by ID
 */
const listTaskById = function(taskId) {
    var options = {
        method: 'GET',
        url: configTaiga.apiUrlTask + '/' + taskId,
        headers: {
            authorization: configTaiga.token
        }
    };
    let promise = new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error)
                reject(error);
            var json = JSON.parse(body);
            var filterListTaskById = {
                "projectId": "",
                "taskSubject": "",
                "userStoryId": "",
                "taskId": ""
            }
            filterListTaskById.projectId = json[0].project;
            filterListTaskById.taskSubject = json[0].subject;
            filterListTaskById.userStoryId = json[0].user_story;
            filterListTaskById.taskId = json[0].id;
            resolve(filterListTaskById);
        });
    });
    return promise;
};

module.exports = {
    addTask: addTask,
    listTask: listTask,
    listTaskById: listTaskById
};
