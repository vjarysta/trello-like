'use strict';

angular.module('projects').controller('ProjectsController', ['$scope', 'Authentication', 'Admin', 'Projects',
  function ($scope, Authentication, Admin, Projects) {
    Admin.query(function (data) {
      $scope.users = data;
    });

    $scope.create = function(isValid) {
      Projects.save($scope.newProject)
        .$promise.then(function(res, err) {
          if (err) {
            console.log(err);
            swal("Oops...", "Something went wrong!", "error");
          } else {
            console.log(res);
            swal("Project created !");
          }
        });
    };
  }
]);
