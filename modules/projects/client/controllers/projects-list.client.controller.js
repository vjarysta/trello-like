'use strict';

angular.module('projects').controller('ProjectsController', ['$scope', 'Authentication', 'Admin',
  function ($scope, Authentication, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
    });
    $scope.selectedMembers = [Authentication.user];

    $scope.create = function(isValid) {
      console.log($scope.newProject);
    };
  }
]);
