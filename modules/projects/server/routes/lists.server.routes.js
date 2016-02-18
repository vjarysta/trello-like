'use strict';

var projects = require('../controllers/projects.server.controller.js'),
  lists = require('../controllers/lists.server.controller.js');

module.exports = function(app) {
  app.route('/api/projects/:projectId/list')
    .get(lists.list)
    .post(lists.create);
    
  app.route('/api/projects/:projectId/list/:listId')
    .delete(lists.delete);
  //   .get(lists.read)
  //   .put(lists.update)
    
    
  // Finish by binding the project & list middleware
  app.param('projectId', projects.ProjectByID);
  app.param('listId', lists.ListByID);
};
