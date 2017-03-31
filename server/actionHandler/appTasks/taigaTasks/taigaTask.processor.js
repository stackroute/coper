var request = require("request");
/*
 * API to add task
 */
var options = { method: 'POST',
  url: 'https://api.taiga.io/api/v1/tasks',
  headers:
   {
     authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE',
   },
  formData:
   { project: '187290',
     subject: 'another test task',
     user_story: '1358782' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(JSON.parse(body));
});

/*
 * API to list tasks
 */
 var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/tasks',
    qs: {
        project: '187290'
    },
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});

/*
 * API to list task by ID
 */
var options = {
    method: 'GET',
    url: 'https://api.taiga.io/api/v1/tasks/1311488',
    headers: {
        authorization: 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyMDg2MTF9:1ctGke:7wLPPqJ6RybMUqnxxqiGlW0_0sE'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);

    console.log(JSON.parse(body));
});
