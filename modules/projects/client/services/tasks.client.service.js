'use strict';

angular.module('projects').factory('Tasks', ['$resource',
  function ($resource) {
    return $resource('/api/projects/:projectId/list/:listId/task/:taskId', {
      projectId:'@project',
      listId: '@list',
      taskId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        method: 'get',
        isArray:true
      }
    });
  }
]);
