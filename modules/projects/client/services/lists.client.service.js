'use strict';

angular.module('projects').factory('Lists', ['$resource',
  function ($resource) {
    return $resource('/api/projects/:projectId/list/:listId', {
      projectId:'@project',
      listId: '@_id'
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
