const projectOperations = require('./taigaProject.processor.js');
// const memberOperations = require('./taigaMember.processor.js');
// const sprintOperations = require('./taigaSprint.processor.js');
// const storyOperations = require('./taigaStory.processor.js');
// const taskOperations = require('./taigaTask.processor.js');


const createNewProject = function(projectInputs, callback) {
  console.log('Got request to create a new Taiga Project ', projectInputs);
  let projectName = projectInputs.name;
  let members = projectInputs.members;

  projectOperations.createProject(projectName).then(function(projectObj) {
  	console.log('Got back from create project with taiga ', projectObj);
    callback(null, projectObj);
  }, function(err) {
    callback(err, { error: 'Unable to create project at this time...!' });
  });
}

module.exports = {
  createNewProject: createNewProject
}
