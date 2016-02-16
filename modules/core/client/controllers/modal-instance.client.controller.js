'use strict';

angular.module('core').controller('ModalInstanceCtrlController', ['$scope', '$uibModalInstance',
  function ($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.close();
    };
  }
]);
