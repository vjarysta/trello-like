'use strict';

var projects = require('../controllers/projects.server.controller.js');

module.exports = function(app) {
  
  app.route('/api/projects')
    .get(projects.list)
    .post(projects.create);
  
};
