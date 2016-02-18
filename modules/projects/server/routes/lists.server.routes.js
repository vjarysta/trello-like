'use strict';

var projects = require('../controllers/projects.server.controller.js'),
  lists = require('../controllers/lists.server.controller.js');

module.exports = function(app) {
  app.route('/api/projects/:projectId/list')
    .get(lists.list)
    .post(lists.create);
    
  // app.route('/api/projects/:projectId/list/:listId')
  //   .get(lists.read)
  //   .put(lists.update)
  //   .delete(lists.delete);
    
};
