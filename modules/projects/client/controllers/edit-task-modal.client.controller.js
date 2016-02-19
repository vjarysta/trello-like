'use strict';

angular.module('projects').controller('EditTaskModalController', ['$scope', '$uibModalInstance', 'users', 'task', 'Tasks',
  function ($scope, $uibModalInstance, users, task, Tasks) {
    $scope.users = users;
    $scope.task = task;
  
    $scope.ok = function () {
      $uibModalInstance.close($scope.task);
    };
  
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.removeTask = function(task) {
      var taskInstance = new Tasks(task);
      taskInstance.$delete(function(res) {
        $uibModalInstance.dismiss('deleted');
      });
    };

  }
]);
