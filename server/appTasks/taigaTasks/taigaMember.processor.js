const request = require("request");
const configTaiga = require('../../../config/config.js');
/*
 * API to add members
 */
const addMember = function(projectId, userName) {
    var options = {
        method: 'POST',
        url: configTaiga.TAIGA.apiUrlMember,
        headers: {
            authorization: configTaiga.TAIGA.token
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
            var json = JSON.parse(body);
            var filterAddMember = {
                "projectName": "",
                "projectDescription": "",
                "projectId": "",
                "memberEmail": ""
            }
            filterAddMember.projectName = json.project_name;
            filterAddMember.projectDescription = json.project_slug;
            filterAddMember.projectId = json.project;
            filterAddMember.memberEmail = json.email;
            resolve(filterAddMember);
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
        url: configTaiga.TAIGA.apiUrlMember,
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
        url: configTaiga.TAIGA.apiUrlMember + '/' + memberId,
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
 * API to delete members
 */
const deleteMember = function(memberId) {
    var options = {
        method: 'DELETE',
        url: configTaiga.TAIGA.apiUrlMember + '/' + memberId,
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
    addMember: addMember,
    listMembers: listMembers,
    listMemberById: listMemberById,
    deleteMember: deleteMember
};
