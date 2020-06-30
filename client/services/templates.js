'use strict'
angular.module('App').service('Templates', [
  '$http',
  function($http) {

    var self = this;

    self.getAllTemplates = function(){
      return $http.get('/api/templates/getAllTemplates', { cache: true}).then(function(response) {
        return response.data;
      }, function(error){
        console.log(error)
      });
    };

    self.findById = function(id){
      return $http.get('/api/templates/findById/'+ id, {cache: true}).then(function(response) {
        return response.data;
      });
    };

  }
]);
