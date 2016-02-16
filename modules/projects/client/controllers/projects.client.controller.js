'use strict';

angular.module('projects').controller('ProjectsController', ['$scope', 'Authentication', 'Admin', 'Projects', '$http',
  function ($scope, Authentication, Admin, Projects, $http) {
    /*
    ** Runs at controller startup
    */
    var myId = '';
    $scope.newProject = {
      members: []
    };
    Admin.query(function (data) {
      $http.get('/api/users/me')
        .then(function(result) {
          myId = result.data._id;
          $scope.newProject.members.push(myId);
        });
      $scope.users = data;
    });

    /*
    ** Creates a project
    */
    $scope.create = function(isValid) {
      Projects.save($scope.newProject)
        .$promise.then(function(res, err) {
          if (err) {
            console.log(err);
            swal("Oops...", "Something went wrong!", "error");
          } else {
            console.log(res);
            swal("Good job!", "Your project is now created", "success");
          }
        });
    };
    
    /*
    ** Lists projects
    */
    
    $scope.list = function() {
      
      var successCallback = function(res) {
        $scope.projects = res;
        console.log(res);
      };
      
      var errorCallback = function(err) {
        console.log('ERROR');
        console.log(err);
      };
      
      Projects.query()
        .$promise.then(successCallback, errorCallback);
    };
  }
]);
