'use strict';

var projects = require('../controllers/projects.server.controller.js');

module.exports = function(app) {
  
  app.route('/api/projects')
    .get(projects.list)
    .post(projects.create);
  
  app.route('/api/projects/:projectId')
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);
    
  // Finish by binding the project middleware
  app.param('projectId', projects.ProjectByID);
};
