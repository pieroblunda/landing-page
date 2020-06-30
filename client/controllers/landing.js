'use strict';
angular.module('App').controller('landingController', [
  '$scope',
  'Landing',
  function($scope, Landing) {

    $scope.Landing = Landing;

    $scope.planSize = 1;

    $scope.calc = function(){
      var unitPrice = Math.round(936/5);
      switch ($scope.planSize) {
        case 1: $scope.slots = 4; $scope.price = Math.round(unitPrice * 4 * 1); break;
        case 2: $scope.slots = 8; $scope.price = Math.round(unitPrice * 8 * 0.95); break;
        case 3: $scope.slots = 16; $scope.price = Math.round(unitPrice * 16 * 0.9); break;
        case 4: $scope.slots = 32; $scope.price = Math.round(unitPrice * 32 * 0.8); break;
        case 5: $scope.slots = 48; $scope.price = Math.round(unitPrice * 48 * 0.7); break;
        case 6: $scope.slots = 72; $scope.price = Math.round(unitPrice * 72 * 0.6); break;
        case 7: $scope.slots = 96; $scope.price = Math.round(unitPrice * 96 * 0.55); break;
        case 8: $scope.slots = 128; $scope.price = Math.round(unitPrice * 128 * 0.5); break;
        case 9: $scope.slots = '∞'; $scope.price = Math.round(unitPrice * 0.3); break;
      };
      $scope.unitPrice = Math.round($scope.price/$scope.slots);
      $scope.translationData = { slots: $scope.slots };
    };

    $scope.questionOption = null;
    $scope.questionWrapperStatus = null;

    $scope.setQuestionWrapperStatus = function(status){
      $scope.questionWrapperStatus = status;
    }

    $scope.setQuestionOption = function(status){
      $scope.questionOption = status;
    }

    $scope.calc();

  }
]);
