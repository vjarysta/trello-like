'use strict';

var projects = require('../controllers/projects.server.controller.js'),
  lists = require('../controllers/lists.server.controller.js'),
  tasks = require('../controllers/tasks.server.controller.js');

module.exports = function(app) {
  app.route('/api/projects/:projectId/list/:listId/task')
    .get(tasks.list)
    .post(tasks.create);
    
  app.route('/api/projects/:projectId/list/:listId/task/:taskId')
    .delete(tasks.delete)
    .put(tasks.update);
  //   .get(lists.read)
    
    
  // Finish by binding the project & list middleware
  app.param('projectId', projects.ProjectByID);
  app.param('listId', lists.ListByID);
  app.param('taskId', tasks.TaskByID);
};
