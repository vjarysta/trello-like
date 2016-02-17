'use strict';

angular.module('projects').factory('Projects', ['$resource',
  function ($resource) {
    return $resource('/api/projects/:projectId', {
      projectId:'@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);