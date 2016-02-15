'use strict';

//Setting up route
angular.module('projects', ['localytics.directives']).config(['$stateProvider',
  function($stateProvider) {
    // Projects state routing
    $stateProvider
      .state('create-project', {
        url: '/projects/create',
        templateUrl: 'modules/projects/client/views/create-project.client.view.html'
      })
      .state('projects-list', {
        url: '/projects',
        templateUrl: 'modules/projects/client/views/projects-list.client.view.html'
      });
  }
]);
