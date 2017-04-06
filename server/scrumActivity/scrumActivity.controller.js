const recastConfig = require('../../config/config.js');
const superAgent = require('superagent');

const analyzeAction = function(result) {
   requestTask(utteranceText, function(err, res) {
    console.log('scrum data ', JSON.stringify(actions));
    let errors = [];
    if (err) {
      errors.push(err);
    };

    let result = {
      "result": "create project",
    }

    callback(err, result);
  });
}
