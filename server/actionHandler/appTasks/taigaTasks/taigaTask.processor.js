var request = require("request");
/*
 * API to add task
 */
const addTask = function(projectId, taskSubject, userStoryId) {
    var options = {
        method: 'POST',
        url: 'https://api.taiga.io/api/v1/tasks',
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
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
            resolve(body);
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
        url: 'https://api.taiga.io/api/v1/tasks',
        qs: {
            project: projectId
        },
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
 * API to list task by ID
 */
const listTaskById = function(taskId) {
    var options = {
        method: 'GET',
        url: 'https://api.taiga.io/api/v1/tasks/' + taskId,
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
    addTask: addTask,
    listTask: listTask,
    listTaskById: listTaskById
};
