var request = require("request");
/*
 * API to add members
 */
const addMember = function(projectId, userName) {
    var options = {
        method: 'POST',
        url: 'https://api.taiga.io/api/v1/memberships',
        headers: {
            authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
        },
        formData: {
            project: projectId,
            role: '1141578', // ROLES: Front - 1141575, UX - 1141573, Back - 1141576, Design - 1141574, Stakeholder - 1141578, ProductOwner - 1141577
            username: userName + '@lucy-stackroute.com'
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
 * API to list members
 */
const listMembers = function(projectId) {
    var options = {
        method: 'GET',
        url: 'https://api.taiga.io/api/v1/memberships',
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
 * API to list member by ID
 */
const listMemberById = function(memberId) {
    var options = {
        method: 'GET',
        url: 'https://api.taiga.io/api/v1/memberships/' + memberId, //member id to be listed
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
 * API to delete members
 */
const deleteMember = function(memberId) {
    var options = {
        method: 'DELETE',
        url: 'https://api.taiga.io/api/v1/memberships/' + memberId, //member id to be deleted
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
    addMember: addMember,
    listMembers: listMembers,
    listMemberById: listMemberById,
    deleteMember: deleteMember
};
