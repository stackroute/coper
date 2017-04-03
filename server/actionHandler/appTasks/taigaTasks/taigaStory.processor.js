var request = require("request");
/*
 * API to add user story
 */
const addUserStory = function(projectId, userStorySubject) {
    var options = {
        method: 'POST',
        url: 'https://api.taiga.io/api/v1/userstories',
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
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
            resolve(body);
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
        url: 'https://api.taiga.io/api/v1/userstories',
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

module.exports = {
    addUserStory: addUserStory,
    listUserStories: listUserStories
};
