'use strict';

angular.module('projects').factory('Lists', ['$resource',
  function ($resource) {
    return $resource('/api/projects/:projectId/list/:listId', {
      projectId:'@projectId',
      listId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
