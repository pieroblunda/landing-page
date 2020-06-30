'use strict';
angular.module('App').controller('wizardController', [
  '$scope',
  '$sce',
  '$window',
  '$http',
  'Templates',
  function($scope, $sce, $window, $http, Templates) {

    $http.get('/api/gallery/getAll').then(function(result){
      $scope.gallery = result.data;
    });

    $scope.wizard = [
      'categories',
      'templates',
      'date',
      'host',
      'dresscode',
      'pictures',
      'location',
      'done'
    ];

    $scope.currentTabConfig = $scope.wizard[0];
    $scope.eventOptions = {};
    $scope.imageTab = 'gift';
    $scope.templateType = null;
    $scope.currentURL = new URL(document.location.href);
    $scope.imgProperties = null;
    $scope.imgModel = null;

    $scope.setTemplate = function(template){
      $scope.eventOptions = template;
      $scope.save();
    };

    $scope.setCategory = function(category){
      $scope.category = category;
      $scope.save();
    };

    $scope.setDressCode = function(code){
      $scope.eventOptions.dressCode = code;
    };

    $scope.setImageTab = function(tab){
      $scope.imageTab = tab;
    };

    $scope.setImage = function(imageTab, path){
      switch (imageTab) {
        case 'gift': $scope.eventOptions.imgPathGift = path; break;
        case 'church': $scope.eventOptions.imgPathChurh = path; break;
        case 'party': $scope.eventOptions.imgPathParty = path; break;
        case 'legal': $scope.eventOptions.imgPathLegal = path; break;
      }
      $scope.save();
    };

    $scope.setCurrentTabConfig = function(tab){
      switch (tab) {
        case 'prev': $scope.currentTabConfig--; break;
        case 'next': $scope.currentTabConfig++; break;
        default:
          $scope.currentTabConfig = tab;
      }
      $scope.save();
    };

    $scope.goBack = function(){
      $scope.currentTabConfig = $scope.wizard[$scope.wizard.indexOf($scope.currentTabConfig) - 1];
    };

    $scope.goNext = function(){
      $scope.currentTabConfig = $scope.wizard[$scope.wizard.indexOf($scope.currentTabConfig) + 1];
    };

    $scope.save = function(){
      $http.post('/api/sites/save', $scope.eventOptions).then(function(result){
        console.log(result.data);
        $scope.eventOptions = result.data;
        $scope.eventOptions.date = new Date(result.data.date);
        document.querySelector('iframe').setAttribute('src', null);
        document.querySelector('iframe').setAttribute('src', $sce.trustAsResourceUrl(`/sites/${result.data.name}`));
        //$scope.previewURL = $sce.trustAsResourceUrl(`/sites/${result.data.name}`);
      });
    };

    $scope.getEncodeURL = function(socialNetwork){
      var encodedURLVanilla = `https://localhost:4000/sites/${$scope.eventOptions.name}`;
      switch (socialNetwork) {
        case 'telegram': return `https://t.me/share/url?url=${encodedURLVanilla}&text=Hola%20mundo`; break;
      }
    };

    $scope.preview = function(){
      console.log('preview');
    };

    Templates.getAllTemplates().then(function(templates){
      $scope.allTemplates = templates;
    });

  }
]);
